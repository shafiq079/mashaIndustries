import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ImageLightbox from '../components/ImageLightbox';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Custom Order Requests</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <OrderCard key={order._id} order={order} onSetPrice={handleSetPrice} />
                ))}
            </div>
        </div>
    );
};

const OrderCard = ({ order, onSetPrice }) => {
    const [price, setPrice] = useState(order.adminPrice || '');
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

    const handleSubmitQuote = () => {
        if (!price || price <= 0) {
            toast.error('Please enter a valid price.');
            return;
        }
        onSetPrice(order._id, price);
    };

    const statusColor = {
        pending: 'text-yellow-500',
        quoted: 'text-blue-500',
        approved: 'text-green-500',
        rejected: 'text-red-500'
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h2 className="font-bold">Order ID:</h2>
                        <p className="text-sm text-gray-600">{order._id}</p>
                        <h2 className="font-bold mt-2">User ID:</h2>
                        <p className="text-sm text-gray-600">{order.userId}</p>
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
                            {order.adminPrice && <li>Admin Price: ${order.adminPrice}</li>}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold mb-2">Design Images</h2>
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
                {order.status === 'pending' && (
                    <div className="mt-4 flex items-center gap-4">
                        <input 
                            type="number" 
                            placeholder="Set Price" 
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="p-2 border rounded-md w-32"
                        />
                        <button onClick={handleSubmitQuote} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Quote</button>
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

export default AdminCustomOrders;
