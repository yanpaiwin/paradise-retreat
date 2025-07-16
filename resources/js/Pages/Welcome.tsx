import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Calendar,
    MapPin,
    Users,
    Star,
    Wifi,
    Car,
    Coffee,
    Tv,
    Clock,
    Phone,
    Mail,
    ChefHat,
    Utensils,
} from "lucide-react";

interface Event {
    id: number;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    location?: string;
    event_type: string;
    price?: number;
}

interface Room {
    id: number;
    room_number: string;
    room_type: string;
    price_per_night: number;
    capacity: number;
    description: string;
    amenities: string[];
    floor: string;
}

interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    is_vegetarian: boolean;
    is_vegan: boolean;
}

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    todayEvents: Event[];
    featuredRooms: Room[];
    featuredMenus: Menu[];
}

export default function Welcome({
    canLogin,
    canRegister,
    todayEvents,
    featuredRooms,
    featuredMenus,
}: Props) {
    const getAmenityIcon = (amenity: string) => {
        switch (amenity.toLowerCase()) {
            case "wifi":
                return <Wifi className="w-4 h-4" />;
            case "parking":
                return <Car className="w-4 h-4" />;
            case "coffee":
                return <Coffee className="w-4 h-4" />;
            case "tv":
                return <Tv className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <>
            <Head title="Paradise Retreat - Luxury Hotel Experience" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <h1 className="text-3xl font-bold text-blue-900">
                                    Paradise Retreat
                                </h1>
                                <Badge className="ml-3 bg-gold-100 text-gold-800">
                                    ★★★★★
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-4">
                                {canLogin && (
                                    <Link href="/login">
                                        <Button variant="outline">
                                            Sign In
                                        </Button>
                                    </Link>
                                )}
                                {canRegister && (
                                    <Link href="/register">
                                        <Button>Get Started</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Welcome to Paradise Retreat
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Experience luxury and comfort in our world-class
                            hotel. From elegant rooms to exceptional dining, we
                            provide everything you need for an unforgettable
                            stay.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {canRegister && (
                                <Link href="/register">
                                    <Button size="lg" className="px-8 py-3">
                                        Book Your Stay
                                    </Button>
                                </Link>
                            )}
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-3"
                            >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Us: +1 (555) 123-4567
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Rooms */}
                {featuredRooms.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    Our Luxury Rooms
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Choose from our selection of beautifully
                                    appointed accommodations
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredRooms.map((room) => (
                                    <Card
                                        key={room.id}
                                        className="overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                            <MapPin className="w-12 h-12 text-white" />
                                        </div>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>
                                                        {room.room_type}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Room {room.room_number}{" "}
                                                        • {room.floor}
                                                    </CardDescription>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        ${room.price_per_night}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        per night
                                                    </p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 mb-4">
                                                {room.description}
                                            </p>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">
                                                    Up to {room.capacity} guests
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {room.amenities
                                                    .slice(0, 4)
                                                    .map((amenity) => (
                                                        <Badge
                                                            key={amenity}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {getAmenityIcon(
                                                                amenity
                                                            )}
                                                            <span className="ml-1 capitalize">
                                                                {amenity}
                                                            </span>
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Today's Events */}
                {todayEvents.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    Today's Events
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Join us for these special activities and
                                    experiences
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {todayEvents.map((event) => (
                                    <Card
                                        key={event.id}
                                        className="hover:shadow-lg transition-shadow"
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg">
                                                    {event.title}
                                                </CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 capitalize">
                                                    {event.event_type}
                                                </Badge>
                                            </div>
                                            {event.description && (
                                                <CardDescription>
                                                    {event.description}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {formatTime(
                                                            event.start_time
                                                        )}{" "}
                                                        -{" "}
                                                        {formatTime(
                                                            event.end_time
                                                        )}
                                                    </span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                )}
                                                {event.price && (
                                                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                                                        <span>
                                                            ${event.price}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Menu */}
                {featuredMenus.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    Culinary Excellence
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Taste our chef's signature dishes and
                                    specialties
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredMenus.map((menu) => (
                                    <Card
                                        key={menu.id}
                                        className="hover:shadow-lg transition-shadow"
                                    >
                                        <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                                            <ChefHat className="w-8 h-8 text-white" />
                                        </div>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">
                                                {menu.name}
                                            </CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-green-100 text-green-800 capitalize">
                                                    {menu.category}
                                                </Badge>
                                                {menu.is_vegetarian && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        Vegetarian
                                                    </Badge>
                                                )}
                                                {menu.is_vegan && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        Vegan
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {menu.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-green-600">
                                                    ${menu.price}
                                                </span>
                                                <Utensils className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Services Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Our Services
                            </h3>
                            <p className="text-lg text-gray-600">
                                Everything you need for a perfect stay
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Luxury Rooms
                                </h4>
                                <p className="text-gray-600">
                                    Comfortable and elegant accommodations with
                                    modern amenities
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ChefHat className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Fine Dining
                                </h4>
                                <p className="text-gray-600">
                                    Exquisite cuisine prepared by our
                                    world-class chefs
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8 text-purple-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Events & Activities
                                </h4>
                                <p className="text-gray-600">
                                    Daily events and activities to enhance your
                                    experience
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Concierge Service
                                </h4>
                                <p className="text-gray-600">
                                    24/7 assistance to make your stay memorable
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-3xl font-bold mb-6">
                                    Get in Touch
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" />
                                        <span>info@paradise-retreat.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>
                                            123 Paradise Avenue, Resort City, RC
                                            12345
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-6">
                                    Ready to Book?
                                </h3>
                                <p className="text-blue-100 mb-6">
                                    Join thousands of satisfied guests who have
                                    experienced the luxury of Paradise Retreat.
                                    Book your stay today and create memories
                                    that will last a lifetime.
                                </p>
                                {canRegister && (
                                    <Link href="/register">
                                        <Button
                                            size="lg"
                                            className="bg-white text-blue-900 hover:bg-gray-100"
                                        >
                                            Start Your Journey
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h4 className="text-2xl font-bold mb-2">
                            Paradise Retreat
                        </h4>
                        <p className="text-gray-400 mb-4">
                            Your gateway to luxury and comfort
                        </p>
                        <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
                            <span>
                                © 2025 Paradise Retreat. All rights reserved.
                            </span>
                            <span>•</span>
                            <span>Privacy Policy</span>
                            <span>•</span>
                            <span>Terms of Service</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
