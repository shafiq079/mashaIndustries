import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import CustomOrderDetailsModal from '../components/CustomOrderDetailsModal';
import { MdOutlineVisibility } from "react-icons/md";

const AdminCustomOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchCustomOrders = async () => {
        setLoading(true);
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

    const handleSetPrice = async (orderId, price) => {
        try {
            const response = await axios.post(SummaryApi.reviewCustomOrder.url, {
                orderId,
                adminPrice: price
            }, { withCredentials: true });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCustomOrders(); // Refresh the list
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('An error occurred while setting the price.');
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Custom Order Requests</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-md">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Order ID</th>
                            <th className="p-2 text-left">User ID</th>
                            <th className="p-2 text-left">Product Type</th>
                            <th className="p-2 text-center">Status</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="border-b hover:bg-gray-100 text-sm">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{order._id.slice(-6)}</td>
                                <td className="p-2">{order.userId?.email}</td>
                                <td className="p-2">{order.productType}</td>
                                <td className="p-2 text-center">{order.status}</td>
                                <td className="p-2 text-center">
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="p-1 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-full"
                                    >
                                        <MdOutlineVisibility size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedOrder && (
                <CustomOrderDetailsModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onSetPrice={handleSetPrice}
                />
            )}
        </div>
    );
};

export default AdminCustomOrders;
