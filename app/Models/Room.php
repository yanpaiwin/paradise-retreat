<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    protected $fillable = [
        'room_number',
        'room_type',
        'price_per_night',
        'capacity',
        'description',
        'amenities',
        'status',
        'floor',
        'is_active',
    ];

    protected $casts = [
        'amenities' => 'array',
        'price_per_night' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function isAvailable($checkIn, $checkOut)
    {
        return $this->status === 'available' &&
               $this->is_active &&
               !$this->bookings()
                    ->where('status', '!=', 'cancelled')
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                              ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                              ->orWhere(function ($q) use ($checkIn, $checkOut) {
                                  $q->where('check_in_date', '<=', $checkIn)
                                    ->where('check_out_date', '>=', $checkOut);
                              });
                    })->exists();
    }
}
