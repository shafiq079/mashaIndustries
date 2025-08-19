import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ImageLightbox from './ImageLightbox';
import displayUSDCurrency from '../helpers/displayCurrency';

const CustomOrderDetailsModal = ({ order, onClose, onSetPrice }) => {
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
        onClose();
    };

    const statusColor = {
        pending: 'text-yellow-500',
        quoted: 'text-blue-500',
        approved: 'text-green-500',
        rejected: 'text-red-500'
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-md w-full max-w-3xl shadow-lg max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Custom Order Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Details */}
                        <div>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>User Email:</strong> {order.userId?.email}</p>
                            <p><strong>Status:</strong> <span className={`font-semibold uppercase ${statusColor[order.status]}`}>{order.status}</span></p>
                            <hr className="my-3"/>
                            <p><strong>Product Type:</strong> {order.productType}</p>
                            <p><strong>Size:</strong> {order.productsize}</p>
                            <p><strong>Material:</strong> {order.material}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            {order.budget && <p><strong>User Budget:</strong> {displayUSDCurrency(order.budget)}</p>}
                            {order.description && <p className="mt-2"><strong>Description:</strong> {order.description}</p>}
                        </div>

                        {/* Right Column: Images */}
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold mb-2">Design Images</h3>
                            <div 
                                className="relative group cursor-pointer"
                                onClick={() => openLightbox(0)}
                            >
                                <img 
                                    src={order.imageUrls[0]} 
                                    alt={`${order.originalNames[0]} preview`} 
                                    className="w-48 h-48 object-contain border rounded-md"
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

                    <hr className="my-4"/>

                    {/* Action Section */}
                    {order.status === 'pending' ? (
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                placeholder="Set Price" 
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="p-2 border rounded-md w-40"
                            />
                            <button onClick={handleSubmitQuote} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit Quote</button>
                        </div>
                    ) : (
                        <p><strong>Admin Quote:</strong> {displayUSDCurrency(order.adminPrice)}</p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                            Close
                        </button>
                    </div>
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

export default CustomOrderDetailsModal;
