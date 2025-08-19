import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';
import ImageLightbox from './ImageLightbox';
import displayUSDCurrency from '../helpers/displayCurrency';

const CustomOrderCard = ({ order, onOrderUpdate }) => {
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
                onOrderUpdate();
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
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div 
                            className="w-24 h-24 bg-slate-200 rounded-md flex items-center justify-center relative group cursor-pointer"
                            onClick={() => openLightbox(0)}
                        >
                            <img 
                                src={order.imageUrls[0]} 
                                alt={`${order.originalNames[0]} preview`} 
                                className="w-full h-full object-contain rounded-md"
                            />
                            {order.imageUrls.length > 1 && (
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
                                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        + {order.imageUrls.length - 1}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{`Custom ${order.productType}`}</h3>
                            <p className={`font-semibold uppercase ${statusColor[order.status]}`}>{order.status}</p>
                            <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-semibold">Size:</span> {order.productsize}</p>
                        <p><span className="font-semibold">Material:</span> {order.material}</p>
                        {order.budget && <p><span className="font-semibold">Budget:</span> {displayUSDCurrency(order.budget)}</p>}
                        {order.description && <p><span className="font-semibold">Description:</span> {order.description}</p>}
                    </div>
                </div>

                <div className="mt-4">
                    {order.status === 'quoted' && (
                        <div className="bg-blue-100 p-3 rounded-lg text-center">
                            <p className="font-semibold">Admin has quoted a price:</p>
                            <p className="text-2xl font-bold text-blue-900">{displayUSDCurrency(order.adminPrice)}</p>
                            <div className="mt-3 flex justify-center gap-4">
                                <button onClick={() => handleUserReview('approved')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Approve</button>
                                <button onClick={() => handleUserReview('rejected')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Reject</button>
                            </div>
                        </div>
                    )}
                    {order.status === 'approved' && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="font-semibold text-green-600">You approved this quote at {displayUSDCurrency(order.adminPrice)}</p>
                            <button onClick={() => handleAddToCart(order._id)} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
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

export default CustomOrderCard;
