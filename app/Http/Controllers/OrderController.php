<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $orders = Order::with(['table', 'waiter', 'chef', 'orderItems.menu']);

        // Filter orders based on user role
        if ($user->hasRole('waiter')) {
            $orders = $orders->where('waiter_id', $user->id);
        } elseif ($user->hasRole('chef')) {
            $orders = $orders->whereIn('status', ['pending', 'preparing']);
        }

        $orders = $orders->latest()->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        // Only waiters can create orders
        if (!auth()->user()->hasRole('waiter')) {
            abort(403);
        }

        $tables = Table::where('is_active', true)->get();
        $menus = Menu::available()->get()->groupBy('category');

        return Inertia::render('Orders/Create', [
            'tables' => $tables,
            'menus' => $menus
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasRole('waiter')) {
            abort(403);
        }

        $request->validate([
            'table_id' => 'required|exists:tables,id',
            'items' => 'required|array|min:1',
            'items.*.menu_id' => 'required|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.special_instructions' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:500',
        ]);

        $order = Order::create([
            'table_id' => $request->table_id,
            'waiter_id' => auth()->id(),
            'status' => 'pending',
            'notes' => $request->notes,
        ]);

        foreach ($request->items as $item) {
            $menu = Menu::findOrFail($item['menu_id']);

            OrderItem::create([
                'order_id' => $order->id,
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $menu->price,
                'special_instructions' => $item['special_instructions'] ?? null,
            ]);
        }

        $order->calculateTotal();

        // Update table status
        Table::find($request->table_id)->update(['status' => 'occupied']);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully!');
    }

    public function show(Order $order)
    {
        $order->load(['table', 'waiter', 'chef', 'orderItems.menu']);

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $user = auth()->user();

        if ($user->hasRole('chef')) {
            // Chefs can update order status and assign themselves
            $request->validate([
                'status' => 'required|in:preparing,ready',
            ]);

            $updateData = [
                'status' => $request->status,
                'chef_id' => $user->id,
            ];

            if ($request->status === 'ready') {
                $updateData['prepared_at'] = now();
            }

            $order->update($updateData);

            return back()->with('success', 'Order status updated successfully!');
        }

        if ($user->hasRole('waiter') && $user->id === $order->waiter_id) {
            // Waiters can mark orders as served
            $request->validate([
                'status' => 'required|in:served',
            ]);

            $order->update([
                'status' => 'served',
                'served_at' => now(),
            ]);

            // Free up the table if order is served
            if ($order->table) {
                $order->table->update(['status' => 'available']);
            }

            return back()->with('success', 'Order marked as served!');
        }

        abort(403);
    }

    public function destroy(Order $order)
    {
        // Only waiters can cancel their own orders or admins
        if (!auth()->user()->hasRole('waiter') || $order->waiter_id !== auth()->id()) {
            if (!auth()->user()->isAdmin()) {
                abort(403);
            }
        }

        if ($order->status !== 'pending') {
            return back()->withErrors(['error' => 'Only pending orders can be cancelled.']);
        }

        $order->update(['status' => 'cancelled']);

        // Free up the table
        if ($order->table) {
            $order->table->update(['status' => 'available']);
        }

        return back()->with('success', 'Order cancelled successfully!');
    }

    public function kitchen()
    {
        // Kitchen view for chefs
        if (!auth()->user()->hasRole('chef')) {
            abort(403);
        }

        $orders = Order::with(['table', 'waiter', 'orderItems.menu'])
            ->whereIn('status', ['pending', 'preparing'])
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Orders/Kitchen', [
            'orders' => $orders
        ]);
    }
}
