<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            // Standard Rooms
            ['room_number' => '101', 'room_type' => 'Standard Single', 'price_per_night' => 80.00, 'capacity' => 1, 'floor' => '1st Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar']],
            ['room_number' => '102', 'room_type' => 'Standard Single', 'price_per_night' => 80.00, 'capacity' => 1, 'floor' => '1st Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar']],
            ['room_number' => '103', 'room_type' => 'Standard Double', 'price_per_night' => 120.00, 'capacity' => 2, 'floor' => '1st Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony']],
            ['room_number' => '104', 'room_type' => 'Standard Double', 'price_per_night' => 120.00, 'capacity' => 2, 'floor' => '1st Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony']],

            // Deluxe Rooms
            ['room_number' => '201', 'room_type' => 'Deluxe Double', 'price_per_night' => 180.00, 'capacity' => 2, 'floor' => '2nd Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony', 'jacuzzi']],
            ['room_number' => '202', 'room_type' => 'Deluxe Double', 'price_per_night' => 180.00, 'capacity' => 2, 'floor' => '2nd Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony', 'jacuzzi']],
            ['room_number' => '203', 'room_type' => 'Family Room', 'price_per_night' => 250.00, 'capacity' => 4, 'floor' => '2nd Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony', 'kitchenette']],

            // Suites
            ['room_number' => '301', 'room_type' => 'Junior Suite', 'price_per_night' => 350.00, 'capacity' => 2, 'floor' => '3rd Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony', 'jacuzzi', 'living_room']],
            ['room_number' => '302', 'room_type' => 'Presidential Suite', 'price_per_night' => 500.00, 'capacity' => 4, 'floor' => '3rd Floor', 'amenities' => ['wifi', 'ac', 'tv', 'minibar', 'balcony', 'jacuzzi', 'living_room', 'kitchen', 'dining_room']],
        ];

        foreach ($rooms as $room) {
            Room::create(array_merge($room, [
                'description' => "Comfortable {$room['room_type']} with modern amenities",
                'status' => 'available',
                'is_active' => true,
            ]));
        }
    }
}
