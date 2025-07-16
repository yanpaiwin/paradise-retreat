<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['user', 'room'])
            ->when(auth()->user()->isGuest(), function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }

    public function create()
    {
        $availableRooms = Room::where('status', 'available')
            ->where('is_active', true)
            ->get();

        return Inertia::render('Bookings/Create', [
            'rooms' => $availableRooms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_count' => 'required|integer|min:1',
            'special_requests' => 'nullable|string|max:500',
        ]);

        $room = Room::findOrFail($request->room_id);

        // Check room availability
        if (!$room->isAvailable($request->check_in_date, $request->check_out_date)) {
            return back()->withErrors(['room_id' => 'Room is not available for selected dates.']);
        }

        $checkIn = \Carbon\Carbon::parse($request->check_in_date);
        $checkOut = \Carbon\Carbon::parse($request->check_out_date);
        $nights = $checkIn->diffInDays($checkOut);
        $totalAmount = $nights * $room->price_per_night;

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'room_id' => $request->room_id,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'guests_count' => $request->guests_count,
            'total_amount' => $totalAmount,
            'special_requests' => $request->special_requests,
            'status' => 'pending',
        ]);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking created successfully!');
    }

    public function show(Booking $booking)
    {
        $booking->load(['user', 'room']);

        // Guests can only view their own bookings
        if (auth()->user()->isGuest() && $booking->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Bookings/Show', [
            'booking' => $booking
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        // Only employees can update booking status
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,confirmed,checked_in,checked_out,cancelled',
        ]);

        $booking->update([
            'status' => $request->status,
            'confirmed_at' => $request->status === 'confirmed' ? now() : $booking->confirmed_at,
            'cancelled_at' => $request->status === 'cancelled' ? now() : $booking->cancelled_at,
        ]);

        // Update room status based on booking status
        if ($request->status === 'checked_in') {
            $booking->room->update(['status' => 'occupied']);
        } elseif ($request->status === 'checked_out') {
            $booking->room->update(['status' => 'cleaning']);
        }

        return back()->with('success', 'Booking status updated successfully!');
    }

    public function destroy(Booking $booking)
    {
        // Guests can cancel their own pending bookings
        if (auth()->user()->isGuest() && $booking->user_id === auth()->id() && $booking->canBeCancelled()) {
            $booking->update(['status' => 'cancelled', 'cancelled_at' => now()]);
            return back()->with('success', 'Booking cancelled successfully!');
        }

        // Employees can delete any booking
        if (auth()->user()->isEmployee()) {
            $booking->delete();
            return redirect()->route('bookings.index')->with('success', 'Booking deleted successfully!');
        }

        abort(403);
    }
}
