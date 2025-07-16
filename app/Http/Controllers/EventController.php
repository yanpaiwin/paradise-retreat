<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::when(request('date'), function ($query, $date) {
                return $query->whereDate('start_time', $date);
            })
            ->when(request('type'), function ($query, $type) {
                return $query->where('event_type', $type);
            })
            ->when(auth()->user()->isGuest(), function ($query) {
                return $query->public();
            })
            ->orderBy('start_time')
            ->paginate(10);

        $todayEvents = Event::today()->public()->get();
        $upcomingEvents = Event::upcoming()->public()->take(5)->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'todayEvents' => $todayEvents,
            'upcomingEvents' => $upcomingEvents,
            'filters' => request()->only(['date', 'type'])
        ]);
    }

    public function create()
    {
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'location' => 'nullable|string|max:255',
            'event_type' => 'required|string|max:100',
            'price' => 'nullable|numeric|min:0',
            'max_attendees' => 'nullable|integer|min:1',
            'is_public' => 'boolean',
            'image_url' => 'nullable|url',
        ]);

        $event = Event::create($request->all());

        return redirect()->route('events.show', $event)
            ->with('success', 'Event created successfully!');
    }

    public function show(Event $event)
    {
        // Guests can only view public events
        if (auth()->user()->isGuest() && !$event->is_public) {
            abort(403);
        }

        return Inertia::render('Events/Show', [
            'event' => $event
        ]);
    }

    public function edit(Event $event)
    {
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        return Inertia::render('Events/Edit', [
            'event' => $event
        ]);
    }

    public function update(Request $request, Event $event)
    {
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'nullable|string|max:255',
            'event_type' => 'required|string|max:100',
            'price' => 'nullable|numeric|min:0',
            'max_attendees' => 'nullable|integer|min:1',
            'is_public' => 'boolean',
            'image_url' => 'nullable|url',
        ]);

        $event->update($request->all());

        return redirect()->route('events.show', $event)
            ->with('success', 'Event updated successfully!');
    }

    public function destroy(Event $event)
    {
        if (!auth()->user()->isEmployee()) {
            abort(403);
        }

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully!');
    }

    public function today()
    {
        $events = Event::today()->public()->orderBy('start_time')->get();

        return Inertia::render('Events/Today', [
            'events' => $events
        ]);
    }
}
