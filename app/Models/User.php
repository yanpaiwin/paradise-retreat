<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'user_type',
        'role_id',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function waiterOrders()
    {
        return $this->hasMany(Order::class, 'waiter_id');
    }

    public function chefOrders()
    {
        return $this->hasMany(Order::class, 'chef_id');
    }

    public function isAdmin()
    {
        return $this->role && $this->role->name === 'admin';
    }

    public function isEmployee()
    {
        return $this->user_type === 'employee';
    }

    public function isGuest()
    {
        return $this->user_type === 'guest';
    }

    public function hasRole($roleName)
    {
        return $this->role && $this->role->name === $roleName;
    }
}
