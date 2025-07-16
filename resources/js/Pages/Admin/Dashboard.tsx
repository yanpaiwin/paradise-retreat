import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface Stats {
    total_rooms: number;
    available_rooms: number;
    occupied_rooms: number;
    total_bookings: number;
    pending_bookings: number;
    confirmed_bookings: number;
    total_orders: number;
    pending_orders: number;
    preparing_orders: number;
    total_tables: number;
    available_tables: number;
    occupied_tables: number;
    total_users: number;
    total_employees: number;
    total_guests: number;
    today_events: number;
}

interface Booking {
    id: number;
    user: { name: string; email: string };
    room: { room_number: string; room_type: string };
    check_in_date: string;
    check_out_date: string;
    status: string;
    total_amount: number;
}

interface Order {
    id: number;
    order_number: string;
    table: { table_number: string };
    waiter: { name: string };
    status: string;
    total_amount: number;
    created_at: string;
}

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
    event_type: string;
}

interface Props {
    stats: Stats;
    recentBookings: Booking[];
    recentOrders: Order[];
    todayEvents: Event[];
    monthlyRevenue: number;
}

export default function AdminDashboard({ stats, recentBookings, recentOrders, todayEvents, monthlyRevenue }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'occupied': return 'bg-blue-100 text-blue-800';
            case 'preparing': return 'bg-orange-100 text-orange-800';
            case 'ready': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_rooms}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.available_rooms} available, {stats.occupied_rooms} occupied
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_bookings}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.pending_bookings} pending, {stats.confirmed_bookings} confirmed
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_orders}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.pending_orders} pending, {stats.preparing_orders} preparing
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</div>
                                <p className="text-xs text-muted-foreground">
                                    From confirmed bookings
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Bookings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Bookings</CardTitle>
                                <CardDescription>Latest booking requests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentBookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{booking.user.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {booking.room.room_number} - {booking.room.room_type}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {booking.check_in_date} to {booking.check_out_date}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {booking.status}
                                                </Badge>
                                                <p className="text-sm font-medium mt-1">
                                                    ${booking.total_amount}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>Latest restaurant orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{order.order_number}</p>
                                                <p className="text-sm text-gray-600">
                                                    Table {order.table.table_number}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Waiter: {order.waiter.name}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <Badge className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </Badge>
                                                <p className="text-sm font-medium mt-1">
                                                    ${order.total_amount}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Today's Events */}
                    {todayEvents.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Today's Events</CardTitle>
                                <CardDescription>Events scheduled for today</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {todayEvents.map((event) => (
                                        <div key={event.id} className="p-4 border rounded-lg">
                                            <h4 className="font-medium">{event.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {new Date(event.start_time).toLocaleTimeString()} -
                                                {new Date(event.end_time).toLocaleTimeString()}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {event.location} • {event.event_type}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
