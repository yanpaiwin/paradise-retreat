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
import { Checkbox } from "@/Components/ui/checkbox";
import { Badge } from "@/Components/ui/badge";
import { Hotel, Mail, Lock, Eye, EyeOff, Star } from "lucide-react";
import { useState } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Sign In - Paradise Retreat" />

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
                                Welcome back to your gateway to luxury and
                                comfort
                            </p>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Why Choose Paradise Retreat?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Hotel className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Luxury Accommodations
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Premium rooms with world-class
                                            amenities
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Star className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            5-Star Service
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Exceptional hospitality and
                                            personalized care
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Easy Booking
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Seamless reservation and management
                                            system
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
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
                                    Welcome Back
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Sign in to your account to continue your
                                    journey
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {status && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-800">
                                            {status}
                                        </p>
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-4">
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
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
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

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) =>
                                                    setData(
                                                        "remember",
                                                        !!checked
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-sm text-gray-600"
                                            >
                                                Remember me
                                            </Label>
                                        </div>
                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                    >
                                        {processing
                                            ? "Signing in..."
                                            : "Sign In"}
                                    </Button>
                                </form>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{" "}
                                        <Link
                                            href={route("register")}
                                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                        >
                                            Create Account
                                        </Link>
                                    </p>
                                </div>

                                {/* Demo Credentials */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Demo Credentials:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <Badge
                                            variant="outline"
                                            className="justify-center"
                                        >
                                            Admin: admin@paradise-retreat.com
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="justify-center"
                                        >
                                            Guest: guest@example.com
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center">
                                        Password: password
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
