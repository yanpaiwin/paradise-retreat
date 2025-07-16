<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Get today's public events
    $todayEvents = \App\Models\Event::today()->public()->take(3)->get();

    // Get available rooms for showcase
    $featuredRooms = \App\Models\Room::where('is_active', true)
        ->where('status', 'available')
        ->take(3)
        ->get();

    // Get sample menu items
    $featuredMenus = \App\Models\Menu::available()
        ->whereIn('category', ['main', 'dessert'])
        ->take(4)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'todayEvents' => $todayEvents,
        'featuredRooms' => $featuredRooms,
        'featuredMenus' => $featuredMenus,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    // Redirect to appropriate dashboard based on user role
    if ($user->isAdmin() || $user->hasRole('manager')) {
        return app(\App\Http\Controllers\AdminDashboardController::class)->index();
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Dashboard
    Route::get('/admin/dashboard', [\App\Http\Controllers\AdminDashboardController::class, 'index'])
        ->name('admin.dashboard')
        ->middleware('can:admin');

    // Bookings Management
    Route::resource('bookings', \App\Http\Controllers\BookingController::class);

    // Room Management
    Route::resource('rooms', \App\Http\Controllers\RoomController::class);

    // Table Management (for waiters)
    Route::resource('tables', \App\Http\Controllers\TableController::class);

    // Order Management
    Route::resource('orders', \App\Http\Controllers\OrderController::class);
    Route::get('/kitchen', [\App\Http\Controllers\OrderController::class, 'kitchen'])
        ->name('orders.kitchen')
        ->middleware('can:chef');

    // Menu Management (for chefs)
    Route::resource('menus', \App\Http\Controllers\MenuController::class);

    // Events Management
    Route::resource('events', \App\Http\Controllers\EventController::class);
    Route::get('/events-today', [\App\Http\Controllers\EventController::class, 'today'])
        ->name('events.today');

    // Role Management (admin only)
    Route::resource('roles', \App\Http\Controllers\RoleController::class)
        ->middleware('can:admin');
});

require __DIR__.'/auth.php';
