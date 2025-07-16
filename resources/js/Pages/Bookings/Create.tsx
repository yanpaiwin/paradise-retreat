import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Badge } from "@/Components/ui/badge";
import { MapPin, Users, Wifi, Car, Coffee, Tv } from "lucide-react";
import { FormEventHandler } from "react";

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

interface Props {
    rooms: Room[];
}

export default function CreateBooking({ rooms }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        room_id: "",
        check_in_date: "",
        check_out_date: "",
        guests_count: 1,
        special_requests: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("bookings.store"));
    };

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

    const calculateTotal = () => {
        if (!data.room_id || !data.check_in_date || !data.check_out_date)
            return 0;

        const room = rooms.find((r) => r.id.toString() === data.room_id);
        if (!room) return 0;

        const checkIn = new Date(data.check_in_date);
        const checkOut = new Date(data.check_out_date);
        const nights = Math.ceil(
            (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        return nights * room.price_per_night;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create New Booking
                </h2>
            }
        >
            <Head title="Create Booking" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Booking Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Details</CardTitle>
                                <CardDescription>
                                    Select your dates and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="check_in_date">
                                            Check-in Date
                                        </Label>
                                        <Input
                                            id="check_in_date"
                                            type="date"
                                            value={data.check_in_date}
                                            onChange={(e) =>
                                                setData(
                                                    "check_in_date",
                                                    e.target.value
                                                )
                                            }
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            required
                                        />
                                        {errors.check_in_date && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.check_in_date}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="check_out_date">
                                            Check-out Date
                                        </Label>
                                        <Input
                                            id="check_out_date"
                                            type="date"
                                            value={data.check_out_date}
                                            onChange={(e) =>
                                                setData(
                                                    "check_out_date",
                                                    e.target.value
                                                )
                                            }
                                            min={
                                                data.check_in_date ||
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            required
                                        />
                                        {errors.check_out_date && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.check_out_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="guests_count">
                                        Number of Guests
                                    </Label>
                                    <Input
                                        id="guests_count"
                                        type="number"
                                        min="1"
                                        value={data.guests_count}
                                        onChange={(e) =>
                                            setData(
                                                "guests_count",
                                                parseInt(e.target.value)
                                            )
                                        }
                                        required
                                    />
                                    {errors.guests_count && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.guests_count}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Room Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Room</CardTitle>
                                <CardDescription>
                                    Choose from our available rooms
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {rooms.map((room) => (
                                        <div
                                            key={room.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                                data.room_id ===
                                                room.id.toString()
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() =>
                                                setData(
                                                    "room_id",
                                                    room.id.toString()
                                                )
                                            }
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        Room {room.room_number}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {room.room_type}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">
                                                        ${room.price_per_night}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        per night
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">
                                                {room.description}
                                            </p>

                                            <div className="flex items-center gap-2 mb-3">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">
                                                    Up to {room.capacity} guests
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    • {room.floor}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {room.amenities.map(
                                                    (amenity) => (
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
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.room_id && (
                                    <p className="text-sm text-red-600 mt-2">
                                        {errors.room_id}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Special Requests */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Special Requests</CardTitle>
                                <CardDescription>
                                    Any additional requests or preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="e.g., Late check-in, extra pillows, room on higher floor..."
                                    value={data.special_requests}
                                    onChange={(e) =>
                                        setData(
                                            "special_requests",
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                />
                                {errors.special_requests && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.special_requests}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Booking Summary */}
                        {data.room_id &&
                            data.check_in_date &&
                            data.check_out_date && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Booking Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Room:</span>
                                                <span>
                                                    {
                                                        rooms.find(
                                                            (r) =>
                                                                r.id.toString() ===
                                                                data.room_id
                                                        )?.room_type
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Dates:</span>
                                                <span>
                                                    {data.check_in_date} to{" "}
                                                    {data.check_out_date}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Guests:</span>
                                                <span>{data.guests_count}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                                <span>Total:</span>
                                                <span>${calculateTotal()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Creating..." : "Create Booking"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
