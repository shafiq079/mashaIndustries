import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';

const MyCustomOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserOrders = async () => {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Custom Order Requests</h1>
            {orders.length === 0 ? (
                <p>You have not made any custom order requests yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

const OrderCard = ({ order }) => {
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (customOrderId) => {
        try {
            const response = await axios.post(SummaryApi.addCustomToCart.url, { customOrderId }, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUserAddToCart();
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('An error occurred while adding to cart.');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h2 className="font-bold">Order ID:</h2>
                    <p className="text-sm text-gray-600">{order._id}</p>
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
                        {order.description && <li>Description: {order.description}</li>}
                        {order.budget && <li>User Budget: ${order.budget}</li>}
                        {order.adminPrice && <li className="font-bold">Final Price: ${order.adminPrice}</li>}
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold mb-2">My Design</h2>
                    <img src={order.filePath} alt={order.originalName} className="w-32 h-32 object-contain border rounded-md" />
                </div>
            </div>
            {order.status === 'approved' && (
                <div className="mt-4 flex justify-end">
                    <button onClick={() => handleAddToCart(order._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyCustomOrders;
