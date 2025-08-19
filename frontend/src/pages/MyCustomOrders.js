import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';
import ImageLightbox from '../components/ImageLightbox';

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
                        <OrderCard key={order._id} order={order} onOrderUpdate={fetchUserOrders} />
                    ))}
                </div>
            )}
        </div>
    );
};

const OrderCard = ({ order, onOrderUpdate }) => {
    const { fetchUserAddToCart } = useContext(Context);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % order.imageUrls.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + order.imageUrls.length) % order.imageUrls.length);
    };

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

    const handleUserReview = async (status) => {
        try {
            const response = await axios.post(SummaryApi.userReviewCustomOrder.url, { orderId: order._id, status }, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
                onOrderUpdate(); // Refresh the list
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('An error occurred while responding to the quote.');
        }
    };

    const statusColor = {
        pending: 'text-yellow-500',
        quoted: 'text-blue-500',
        approved: 'text-green-500',
        rejected: 'text-red-500'
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h2 className="font-bold">Order ID:</h2>
                        <p className="text-sm text-gray-600">{order._id}</p>
                        <h2 className="font-bold mt-2">Status:</h2>
                        <p className={`text-sm font-semibold ${statusColor[order.status]}`}>
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
                            {order.adminPrice && <li className="font-bold">Admin Quote: ${order.adminPrice}</li>}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold mb-2">My Design</h2>
                        <div 
                            className="relative group cursor-pointer"
                            onClick={() => openLightbox(0)}
                        >
                            <img 
                                src={order.imageUrls[0]} 
                                alt={`${order.originalNames[0]} preview`} 
                                className="w-32 h-32 object-contain border rounded-md"
                            />
                            {order.imageUrls.length > 1 && (
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
                                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        + {order.imageUrls.length - 1} more
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {order.status === 'quoted' && (
                    <div className="mt-4 flex justify-end gap-4">
                        <button onClick={() => handleUserReview('approved')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Approve Quote</button>
                        <button onClick={() => handleUserReview('rejected')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Reject Quote</button>
                    </div>
                )}
                {order.status === 'approved' && (
                    <div className="mt-4 flex justify-end">
                        <button onClick={() => handleAddToCart(order._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>

            {lightboxOpen && (
                <ImageLightbox 
                    imageUrl={order.imageUrls[selectedImageIndex]}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                    hasNext={selectedImageIndex < order.imageUrls.length - 1}
                    hasPrev={selectedImageIndex > 0}
                />
            )}
        </>
    );
};

export default MyCustomOrders;
