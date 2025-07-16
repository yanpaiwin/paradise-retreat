import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
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
import { Badge } from "@/Components/ui/badge";
import {
    Hotel,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    Star,
    Phone,
} from "lucide-react";
import { useState } from "react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Create Account - Paradise Retreat" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block space-y-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Hotel className="w-12 h-12 text-blue-600" />
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900">
                                        Paradise Retreat
                                    </h1>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">
                                            Luxury Hotel
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xl text-gray-600 mb-8">
                                Join thousands of satisfied guests who trust
                                Paradise Retreat
                            </p>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Your Benefits
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Hotel className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Easy Booking
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Book rooms instantly with our
                                            streamlined system
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Star className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Exclusive Events
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Access to special events and
                                            activities
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Personal Dashboard
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Manage your bookings and preferences
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            24/7 Support
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Round-the-clock assistance for all
                                            your needs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full max-w-md mx-auto">
                        <Card className="shadow-2xl border-0">
                            <CardHeader className="text-center pb-6">
                                <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                                    <Hotel className="w-8 h-8 text-blue-600" />
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Paradise Retreat
                                    </h1>
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Create Account
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Join Paradise Retreat and start your luxury
                                    journey
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Full Name
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10 h-12"
                                                placeholder="Enter your full name"
                                                autoComplete="name"
                                                required
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10 h-12"
                                                placeholder="Enter your email"
                                                autoComplete="username"
                                                required
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Phone Number{" "}
                                            <span className="text-gray-400">
                                                (Optional)
                                            </span>
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10 h-12"
                                                placeholder="Enter your phone number"
                                                autoComplete="tel"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-sm text-red-600">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10 pr-10 h-12"
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="password_confirmation"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10 pr-10 h-12"
                                                placeholder="Confirm your password"
                                                autoComplete="new-password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-red-600">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                    >
                                        {processing
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </Button>
                                </form>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{" "}
                                        <Link
                                            href={route("login")}
                                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                </div>

                                {/* Terms Notice */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 text-center">
                                        By creating an account, you agree to our{" "}
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center mt-6">
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                            >
                                ← Back to Paradise Retreat
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
