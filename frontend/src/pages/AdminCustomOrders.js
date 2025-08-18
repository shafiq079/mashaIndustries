import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AdminCustomOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCustomOrders = async () => {
        try {
            const response = await axios.get(SummaryApi.allCustomOrders.url, { withCredentials: true });
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch custom orders.');
            toast.error('Failed to fetch custom orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomOrders();
    }, []);

    const handleReview = async (orderId, status, price) => {
        try {
            const response = await axios.post(SummaryApi.reviewCustomOrder.url, {
                orderId,
                status,
                adminPrice: price
            }, { withCredentials: true });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCustomOrders(); // Refresh the list
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('An error occurred while reviewing the order.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Custom Order Requests</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <OrderCard key={order._id} order={order} onReview={handleReview} />
                ))}
            </div>
        </div>
    );
};

const OrderCard = ({ order, onReview }) => {
    const [price, setPrice] = useState('');

    const handleApprove = () => {
        if (!price || price <= 0) {
            toast.error('Please enter a valid price.');
            return;
        }
        onReview(order._id, 'approved', price);
    };

    const handleReject = () => {
        onReview(order._id, 'rejected', null);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h2 className="font-bold">Order ID:</h2>
                    <p className="text-sm text-gray-600">{order._id}</p>
                    <h2 className="font-bold mt-2">User ID:</h2>
                    <p className="text-sm text-gray-600">{order.userId}</p>
                    <h2 className="font-bold mt-2">Status:</h2>
                    <p className={`text-sm font-semibold ${order.status === 'pending' ? 'text-yellow-500' : order.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.status.toUpperCase()}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold">Details:</h2>
                    <ul className="text-sm list-disc list-inside">
                        <li>Type: {order.productType}</li>
                        <li>Size: {order.productsize}</li>
                        <li>Material: {order.material}</li>
                        <li>Quantity: {order.quantity}</li>
                        <li>User Price Estimate: ${order.totalPrice}</li>
                        {order.adminPrice && <li>Admin Price: ${order.adminPrice}</li>}
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold mb-2">Design</h2>
                    <img src={order.filePath} alt={order.originalName} className="w-32 h-32 object-contain border rounded-md" />
                </div>
            </div>
            {order.status === 'pending' && (
                <div className="mt-4 flex items-center gap-4">
                    <input 
                        type="number" 
                        placeholder="Set Price" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="p-2 border rounded-md w-32"
                    />
                    <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Approve</button>
                    <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Reject</button>
                </div>
            )}
        </div>
    );
};

export default AdminCustomOrders;
