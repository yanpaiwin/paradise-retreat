<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menus = [
            // Appetizers
            ['name' => 'Caesar Salad', 'category' => 'appetizer', 'price' => 12.50, 'preparation_time' => 10, 'is_vegetarian' => true],
            ['name' => 'Bruschetta', 'category' => 'appetizer', 'price' => 9.00, 'preparation_time' => 8, 'is_vegetarian' => true, 'is_vegan' => true],
            ['name' => 'Chicken Wings', 'category' => 'appetizer', 'price' => 14.00, 'preparation_time' => 15],
            ['name' => 'Shrimp Cocktail', 'category' => 'appetizer', 'price' => 16.00, 'preparation_time' => 5],

            // Main Courses
            ['name' => 'Grilled Salmon', 'category' => 'main', 'price' => 28.00, 'preparation_time' => 25, 'ingredients' => ['salmon', 'herbs', 'lemon']],
            ['name' => 'Beef Steak', 'category' => 'main', 'price' => 35.00, 'preparation_time' => 20, 'ingredients' => ['beef', 'garlic', 'rosemary']],
            ['name' => 'Chicken Parmesan', 'category' => 'main', 'price' => 22.00, 'preparation_time' => 30, 'ingredients' => ['chicken', 'parmesan', 'tomato sauce']],
            ['name' => 'Vegetarian Pasta', 'category' => 'main', 'price' => 18.00, 'preparation_time' => 15, 'is_vegetarian' => true, 'ingredients' => ['pasta', 'vegetables', 'olive oil']],
            ['name' => 'Vegan Buddha Bowl', 'category' => 'main', 'price' => 16.00, 'preparation_time' => 12, 'is_vegetarian' => true, 'is_vegan' => true],

            // Desserts
            ['name' => 'Chocolate Cake', 'category' => 'dessert', 'price' => 8.00, 'preparation_time' => 5, 'is_vegetarian' => true],
            ['name' => 'Tiramisu', 'category' => 'dessert', 'price' => 9.00, 'preparation_time' => 5, 'is_vegetarian' => true],
            ['name' => 'Fresh Fruit Salad', 'category' => 'dessert', 'price' => 6.00, 'preparation_time' => 8, 'is_vegetarian' => true, 'is_vegan' => true],

            // Beverages
            ['name' => 'Coffee', 'category' => 'beverage', 'price' => 3.50, 'preparation_time' => 3, 'is_vegetarian' => true, 'is_vegan' => true],
            ['name' => 'Fresh Orange Juice', 'category' => 'beverage', 'price' => 4.00, 'preparation_time' => 2, 'is_vegetarian' => true, 'is_vegan' => true],
            ['name' => 'Wine (Glass)', 'category' => 'beverage', 'price' => 8.00, 'preparation_time' => 1, 'is_vegetarian' => true, 'is_vegan' => true],
            ['name' => 'Craft Beer', 'category' => 'beverage', 'price' => 6.00, 'preparation_time' => 1, 'is_vegetarian' => true, 'is_vegan' => true],
        ];

        foreach ($menus as $menu) {
            Menu::create(array_merge($menu, [
                'description' => "Delicious {$menu['name']} prepared with fresh ingredients",
                'is_available' => true,
            ]));
        }
    }
}
