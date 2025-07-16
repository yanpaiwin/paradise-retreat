<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $today = Carbon::today();
        $tomorrow = Carbon::tomorrow();

        $events = [
            // Today's Events
            [
                'title' => 'Welcome Reception',
                'description' => 'Welcome drinks and networking for all hotel guests',
                'start_time' => $today->copy()->setTime(18, 0),
                'end_time' => $today->copy()->setTime(20, 0),
                'location' => 'Main Lobby',
                'event_type' => 'reception',
                'price' => null,
                'max_attendees' => 50,
                'is_public' => true,
            ],
            [
                'title' => 'Live Jazz Performance',
                'description' => 'Enjoy smooth jazz music while dining',
                'start_time' => $today->copy()->setTime(19, 30),
                'end_time' => $today->copy()->setTime(22, 0),
                'location' => 'Restaurant Bar',
                'event_type' => 'entertainment',
                'price' => null,
                'max_attendees' => 30,
                'is_public' => true,
            ],
            [
                'title' => 'Yoga Session',
                'description' => 'Morning yoga session by the pool',
                'start_time' => $today->copy()->setTime(7, 0),
                'end_time' => $today->copy()->setTime(8, 0),
                'location' => 'Pool Deck',
                'event_type' => 'wellness',
                'price' => 15.00,
                'max_attendees' => 20,
                'is_public' => true,
            ],

            // Tomorrow's Events
            [
                'title' => 'Cooking Class',
                'description' => 'Learn to cook local specialties with our head chef',
                'start_time' => $tomorrow->copy()->setTime(10, 0),
                'end_time' => $tomorrow->copy()->setTime(12, 0),
                'location' => 'Main Kitchen',
                'event_type' => 'workshop',
                'price' => 45.00,
                'max_attendees' => 12,
                'is_public' => true,
            ],
            [
                'title' => 'Wine Tasting',
                'description' => 'Sample our finest selection of local wines',
                'start_time' => $tomorrow->copy()->setTime(17, 0),
                'end_time' => $tomorrow->copy()->setTime(19, 0),
                'location' => 'Wine Cellar',
                'event_type' => 'tasting',
                'price' => 35.00,
                'max_attendees' => 15,
                'is_public' => true,
            ],
            [
                'title' => 'Business Conference',
                'description' => 'Private business meeting for corporate guests',
                'start_time' => $tomorrow->copy()->setTime(9, 0),
                'end_time' => $tomorrow->copy()->setTime(17, 0),
                'location' => 'Conference Room A',
                'event_type' => 'conference',
                'price' => null,
                'max_attendees' => 25,
                'is_public' => false,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
