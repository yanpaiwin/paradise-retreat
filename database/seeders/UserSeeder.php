<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $managerRole = Role::where('name', 'manager')->first();
        $receptionistRole = Role::where('name', 'receptionist')->first();
        $waiterRole = Role::where('name', 'waiter')->first();
        $chefRole = Role::where('name', 'chef')->first();

        $users = [
            // Admin
            [
                'name' => 'Admin User',
                'email' => 'admin@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $adminRole->id,
                'phone' => '+1234567890',
            ],

            // Manager
            [
                'name' => 'Hotel Manager',
                'email' => 'manager@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $managerRole->id,
                'phone' => '+1234567891',
            ],

            // Receptionist
            [
                'name' => 'Sarah Johnson',
                'email' => 'receptionist@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $receptionistRole->id,
                'phone' => '+1234567892',
            ],

            // Waiters
            [
                'name' => 'Mike Wilson',
                'email' => 'waiter1@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $waiterRole->id,
                'phone' => '+1234567893',
            ],
            [
                'name' => 'Emma Davis',
                'email' => 'waiter2@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $waiterRole->id,
                'phone' => '+1234567894',
            ],

            // Chefs
            [
                'name' => 'Chef Antonio',
                'email' => 'chef1@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $chefRole->id,
                'phone' => '+1234567895',
            ],
            [
                'name' => 'Chef Maria',
                'email' => 'chef2@paradise-retreat.com',
                'password' => Hash::make('password'),
                'user_type' => 'employee',
                'role_id' => $chefRole->id,
                'phone' => '+1234567896',
            ],

            // Sample Guest
            [
                'name' => 'John Guest',
                'email' => 'guest@example.com',
                'password' => Hash::make('password'),
                'user_type' => 'guest',
                'role_id' => null,
                'phone' => '+1234567897',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
