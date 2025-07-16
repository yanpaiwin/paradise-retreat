import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { ChefHat, Clock, Users, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
    id: number;
    name: string;
    preparation_time: number;
}

interface OrderItem {
    id: number;
    menu: MenuItem;
    quantity: number;
    special_instructions?: string;
    status: string;
}

interface Table {
    id: number;
    table_number: string;
}

interface Waiter {
    id: number;
    name: string;
}

interface Order {
    id: number;
    order_number: string;
    table: Table;
    waiter: Waiter;
    status: string;
    created_at: string;
    order_items: OrderItem[];
}

interface Props {
    orders: Order[];
}

export default function Kitchen({ orders }: Props) {
    const [processingOrders, setProcessingOrders] = useState<Set<number>>(new Set());

    const updateOrderStatus = (orderId: number, status: string) => {
        setProcessingOrders(prev => new Set(prev).add(orderId));

        router.patch(`/orders/${orderId}`, { status }, {
            onFinish: () => {
                setProcessingOrders(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(orderId);
                    return newSet;
                });
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-red-100 text-red-800';
            case 'preparing': return 'bg-yellow-100 text-yellow-800';
            case 'ready': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getOrderPriority = (createdAt: string) => {
        const orderTime = new Date(createdAt);
        const now = new Date();
        const minutesAgo = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));

        if (minutesAgo > 30) return 'high';
        if (minutesAgo > 15) return 'medium';
        return 'low';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'border-red-500 bg-red-50';
            case 'medium': return 'border-yellow-500 bg-yellow-50';
            default: return 'border-gray-200';
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeSinceOrder = (createdAt: string) => {
        const orderTime = new Date(createdAt);
        const now = new Date();
        const minutesAgo = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
        return minutesAgo;
    };

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const preparingOrders = orders.filter(order => order.status === 'preparing');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <ChefHat className="w-6 h-6" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Kitchen Dashboard</h2>
                    <Badge className="ml-2 bg-red-100 text-red-800">
                        {pendingOrders.length} Pending
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">
                        {preparingOrders.length} Preparing
                    </Badge>
                </div>
            }
        >
            <Head title="Kitchen Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {orders.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <ChefHat className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders in queue</h3>
                                <p className="text-gray-600">All caught up! New orders will appear here.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {orders.map((order) => {
                                const priority = getOrderPriority(order.created_at);
                                const minutesAgo = getTimeSinceOrder(order.created_at);
                                const isProcessing = processingOrders.has(order.id);

                                return (
                                    <Card
                                        key={order.id}
                                        className={`${getPriorityColor(priority)} ${
                                            priority === 'high' ? 'shadow-lg' : ''
                                        }`}
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="flex items-center gap-2">
                                                        {priority === 'high' && (
                                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                                        )}
                                                        {order.order_number}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Table {order.table.table_number} • Waiter: {order.waiter.name}
                                                    </CardDescription>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status}
                                                    </Badge>
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                 <span>{minutesAgo}m ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {order.order_items.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-start p-3 bg-white rounded border">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">{item.quantity}x</span>
                                                                <span>{item.menu.name}</span>
                                                                {item.menu.preparation_time && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {item.menu.preparation_time}min
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            {item.special_instructions && (
                                                                <p className="text-sm text-orange-600 mt-1 italic">
                                                                    Note: {item.special_instructions}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <Badge className={getStatusColor(item.status)}>
                                                            {item.status}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                                {order.status === 'pending' && (
                                                    <Button
                                                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                        disabled={isProcessing}
                                                        className="flex-1"
                                                    >
                                                        {isProcessing ? 'Starting...' : 'Start Preparing'}
                                                    </Button>
                                                )}
                                                {order.status === 'preparing' && (
                                                    <Button
                                                        onClick={() => updateOrderStatus(order.id, 'ready')}
                                                        disabled={isProcessing}
                                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                                    >
                                                        {isProcessing ? 'Finishing...' : 'Mark as Ready'}
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-2 text-center">
                                                Ordered at {formatTime(order.created_at)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
