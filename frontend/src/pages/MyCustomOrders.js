import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import CustomOrderCard from '../components/CustomOrderCard';

const MyCustomOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(SummaryApi.myCustomOrders.url, { withCredentials: true });
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch your custom orders.');
            toast.error('Failed to fetch your custom orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, []);

    if (loading) return <p className="text-center">Loading your orders...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="w-full min-h-screen p-4 md:px-40 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Custom Order Requests</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">You have not made any custom order requests yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <CustomOrderCard key={order._id} order={order} onOrderUpdate={fetchUserOrders} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCustomOrders;
