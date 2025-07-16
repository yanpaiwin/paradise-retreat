<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Room;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_rooms' => Room::count(),
            'available_rooms' => Room::where('status', 'available')->count(),
            'occupied_rooms' => Room::where('status', 'occupied')->count(),
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'preparing_orders' => Order::where('status', 'preparing')->count(),
            'total_tables' => Table::count(),
            'available_tables' => Table::where('status', 'available')->count(),
            'occupied_tables' => Table::where('status', 'occupied')->count(),
            'total_users' => User::count(),
            'total_employees' => User::where('user_type', 'employee')->count(),
            'total_guests' => User::where('user_type', 'guest')->count(),
            'today_events' => Event::today()->count(),
        ];

        $recentBookings = Booking::with(['user', 'room'])
            ->latest()
            ->take(5)
            ->get();

        $recentOrders = Order::with(['table', 'waiter', 'orderItems.menu'])
            ->latest()
            ->take(5)
            ->get();

        $todayEvents = Event::today()
            ->orderBy('start_time')
            ->get();

        $monthlyRevenue = Booking::where('status', 'confirmed')
            ->whereMonth('created_at', now()->month)
            ->sum('total_amount');

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'recentOrders' => $recentOrders,
            'todayEvents' => $todayEvents,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}
