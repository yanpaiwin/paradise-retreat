<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            // Restaurant Tables
            ['table_number' => 'R01', 'capacity' => 2, 'location' => 'Restaurant - Window Side'],
            ['table_number' => 'R02', 'capacity' => 2, 'location' => 'Restaurant - Window Side'],
            ['table_number' => 'R03', 'capacity' => 4, 'location' => 'Restaurant - Center'],
            ['table_number' => 'R04', 'capacity' => 4, 'location' => 'Restaurant - Center'],
            ['table_number' => 'R05', 'capacity' => 6, 'location' => 'Restaurant - Private Corner'],
            ['table_number' => 'R06', 'capacity' => 8, 'location' => 'Restaurant - Private Room'],

            // Bar Tables
            ['table_number' => 'B01', 'capacity' => 2, 'location' => 'Bar - Counter'],
            ['table_number' => 'B02', 'capacity' => 2, 'location' => 'Bar - Counter'],
            ['table_number' => 'B03', 'capacity' => 4, 'location' => 'Bar - Lounge'],
            ['table_number' => 'B04', 'capacity' => 4, 'location' => 'Bar - Lounge'],

            // Terrace Tables
            ['table_number' => 'T01', 'capacity' => 2, 'location' => 'Terrace - Garden View'],
            ['table_number' => 'T02', 'capacity' => 2, 'location' => 'Terrace - Garden View'],
            ['table_number' => 'T03', 'capacity' => 4, 'location' => 'Terrace - Pool Side'],
            ['table_number' => 'T04', 'capacity' => 6, 'location' => 'Terrace - Pool Side'],
        ];

        foreach ($tables as $table) {
            Table::create(array_merge($table, [
                'status' => 'available',
                'is_active' => true,
            ]));
        }
    }
}
