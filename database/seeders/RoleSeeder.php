<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access and management',
                'permissions' => ['manage_users', 'manage_rooms', 'manage_bookings', 'manage_orders', 'manage_events', 'view_reports']
            ],
            [
                'name' => 'manager',
                'display_name' => 'Manager',
                'description' => 'Hotel operations management',
                'permissions' => ['manage_bookings', 'manage_rooms', 'view_reports', 'manage_events']
            ],
            [
                'name' => 'receptionist',
                'display_name' => 'Receptionist',
                'description' => 'Handle bookings and guest services',
                'permissions' => ['manage_bookings', 'view_rooms']
            ],
            [
                'name' => 'waiter',
                'display_name' => 'Waiter',
                'description' => 'Manage table orders and service',
                'permissions' => ['manage_orders', 'view_tables', 'view_menu']
            ],
            [
                'name' => 'chef',
                'display_name' => 'Chef',
                'description' => 'Manage kitchen operations and menu',
                'permissions' => ['manage_menu', 'view_orders', 'update_order_status']
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
