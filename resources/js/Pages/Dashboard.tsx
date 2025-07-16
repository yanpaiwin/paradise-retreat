import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Calendar, MapPin, Users, ChefHat, Coffee, Clock } from "lucide-react";
import { PageProps } from "@/types";

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const getQuickActions = () => {
        if (user.user_type === "employee") {
            switch (user.role?.name) {
                case "admin":
                case "manager":
                    return [
                        {
                            title: "Admin Dashboard",
                            href: "/admin/dashboard",
                            icon: Users,
                            description: "View system overview and analytics",
                        },
                        {
                            title: "Manage Bookings",
                            href: "/bookings",
                            icon: Calendar,
                            description: "Handle guest reservations",
                        },
                        {
                            title: "Manage Events",
                            href: "/events",
                            icon: MapPin,
                            description: "Create and manage hotel events",
                        },
                    ];
                case "receptionist":
                    return [
                        {
                            title: "Manage Bookings",
                            href: "/bookings",
                            icon: Calendar,
                            description: "Handle guest reservations",
                        },
                        {
                            title: "View Rooms",
                            href: "/rooms",
                            icon: MapPin,
                            description: "Check room availability",
                        },
                    ];
                case "waiter":
                    return [
                        {
                            title: "Take Orders",
                            href: "/orders/create",
                            icon: Coffee,
                            description: "Create new table orders",
                        },
                        {
                            title: "My Orders",
                            href: "/orders",
                            icon: Clock,
                            description: "View and manage orders",
                        },
                        {
                            title: "Tables",
                            href: "/tables",
                            icon: Users,
                            description: "Manage table assignments",
                        },
                    ];
                case "chef":
                    return [
                        {
                            title: "Kitchen Dashboard",
                            href: "/kitchen",
                            icon: ChefHat,
                            description: "View and manage orders",
                        },
                        {
                            title: "Manage Menu",
                            href: "/menus",
                            icon: Coffee,
                            description: "Update menu items",
                        },
                    ];
                default:
                    return [];
            }
        } else {
            // Guest actions
            return [
                {
                    title: "Make a Booking",
                    href: "/bookings/create",
                    icon: Calendar,
                    description: "Reserve your perfect room",
                },
                {
                    title: "My Bookings",
                    href: "/bookings",
                    icon: MapPin,
                    description: "View your reservations",
                },
                {
                    title: "Today's Events",
                    href: "/events-today",
                    icon: Users,
                    description: "See what's happening today",
                },
            ];
        }
    };

    const quickActions = getQuickActions();

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {getWelcomeMessage()}, {user.name}!
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Welcome to Paradise Retreat
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {user.user_type === "employee"
                                    ? `You're logged in as ${
                                          user.role?.display_name || "Employee"
                                      }`
                                    : "We're delighted to have you as our guest"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400">
                                {user.user_type === "employee"
                                    ? "Use the quick actions below to access your work tools and manage your responsibilities."
                                    : "Explore our services, make bookings, and stay updated with today's events and activities."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    {quickActions.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    {user.user_type === "employee"
                                        ? "Access your work tools and responsibilities"
                                        : "Everything you need for your stay"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quickActions.map((action, index) => (
                                        <Link key={index} href={action.href}>
                                            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <action.icon className="w-6 h-6 text-blue-600" />
                                                        <h3 className="font-semibold">
                                                            {action.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {action.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Guest Information */}
                    {user.user_type === "guest" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        Hotel Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Check-in:</span>
                                        <span className="font-medium">
                                            3:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Check-out:</span>
                                        <span className="font-medium">
                                            11:00 AM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Restaurant Hours:</span>
                                        <span className="font-medium">
                                            7:00 AM - 10:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Room Service:</span>
                                        <span className="font-medium">
                                            24/7
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        Contact & Services
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Reception:</span>
                                        <span className="font-medium">
                                            Ext. 0
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Room Service:</span>
                                        <span className="font-medium">
                                            Ext. 100
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Concierge:</span>
                                        <span className="font-medium">
                                            Ext. 200
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Emergency:</span>
                                        <span className="font-medium">
                                            Ext. 911
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
