import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';

interface Room {
    id: number;
    room_number: string;
    room_type: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Booking {
    id: number;
    user: User;
    room: Room;
    check_in_date: string;
    check_out_date: string;
    guests_count: number;
    total_amount: number;
    status: string;
    special_requests?: string;
    created_at: string;
}

interface Props {
    bookings: {
        data: Booking[];
        links: any[];
        meta: any;
    };
}

export default function BookingsIndex({ bookings }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'checked_in': return 'bg-blue-100 text-blue-800';
            case 'checked_out': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bookings</h2>
                    <Link href="/bookings/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Booking
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Bookings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {bookings.data.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-600 mb-4">Start by creating your first booking</p>
                                <Link href="/bookings/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Booking
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {bookings.data.map((booking) => (
                                <Card key={booking.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    Room {booking.room.room_number}
                                                </CardTitle>
                                                <CardDescription>
                                                    {booking.room.room_type}
                                                </CardDescription>
                                            </div>
                                            <Badge className={getStatusColor(booking.status)}>
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium">Check-in</p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(booking.check_in_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium">Check-out</p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(booking.check_out_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium">Guests</p>
                                                    <p className="text-sm text-gray-600">
                                                        {booking.guests_count} {booking.guests_count === 1 ? 'guest' : 'guests'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {booking.special_requests && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                                                <p className="text-sm text-gray-600 mt-1">{booking.special_requests}</p>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                            <div>
                                                <p className="text-lg font-bold">${booking.total_amount}</p>
                                                <p className="text-xs text-gray-500">
                                                    Booked on {formatDate(booking.created_at)}
                                                </p>
                                            </div>
                                            <Link href={`/bookings/${booking.id}`}>
                                                <Button variant="outline">View Details</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
