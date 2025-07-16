import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    location?: string;
    event_type: string;
    price?: number;
    max_attendees?: number;
    image_url?: string;
}

interface Props {
    events: Event[];
}

export default function TodayEvents({ events }: Props) {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getEventTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'conference': return 'bg-blue-100 text-blue-800';
            case 'wedding': return 'bg-pink-100 text-pink-800';
            case 'party': return 'bg-purple-100 text-purple-800';
            case 'meeting': return 'bg-gray-100 text-gray-800';
            case 'workshop': return 'bg-green-100 text-green-800';
            default: return 'bg-orange-100 text-orange-800';
        }
    };

    const isEventNow = (startTime: string, endTime: string) => {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);
        return now >= start && now <= end;
    };

    const isEventUpcoming = (startTime: string) => {
        const now = new Date();
        const start = new Date(startTime);
        return start > now;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Today's Events - {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h2>
                </div>
            }
        >
            <Head title="Today's Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {events.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No events today</h3>
                                <p className="text-gray-600">Check back tomorrow for upcoming events</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {events.map((event) => (
                                <Card key={event.id} className={`${
                                    isEventNow(event.start_time, event.end_time)
                                        ? 'ring-2 ring-green-500 bg-green-50'
                                        : ''
                                }`}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CardTitle className="text-xl">{event.title}</CardTitle>
                                                    {isEventNow(event.start_time, event.end_time) && (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            Live Now
                                                        </Badge>
                                                    )}
                                                    {isEventUpcoming(event.start_time) && (
                                                        <Badge className="bg-blue-100 text-blue-800">
                                                            Upcoming
                                                        </Badge>
                                                    )}
                                                </div>
                                                {event.description && (
                                                    <CardDescription className="text-base">
                                                        {event.description}
                                                    </CardDescription>
                                                )}
                                            </div>
                                            <Badge className={getEventTypeColor(event.event_type)}>
                                                {event.event_type}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium">Time</p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                                    </p>
                                                </div>
                                            </div>

                                            {event.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm font-medium">Location</p>
                                                        <p className="text-sm text-gray-600">{event.location}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {event.max_attendees && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm font-medium">Capacity</p>
                                                        <p className="text-sm text-gray-600">
                                                            Up to {event.max_attendees} attendees
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {event.price && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 text-gray-500 font-bold">$</div>
                                                    <div>
                                                        <p className="text-sm font-medium">Price</p>
                                                        <p className="text-sm text-gray-600">${event.price}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {event.image_url && (
                                            <div className="mt-4">
                                                <img
                                                    src={event.image_url}
                                                    alt={event.title}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
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
