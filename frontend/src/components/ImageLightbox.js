import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from "react-icons/io";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageLightbox = ({ imageUrl, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    if (!imageUrl) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
                <IoMdClose />
            </button>

            {hasPrev && (
                <button onClick={onPrev} className="absolute left-4 text-white text-4xl">
                    <FiChevronLeft />
                </button>
            )}

            <div className="max-w-4xl max-h-4/5">
                <img src={imageUrl} alt="Full screen view" className="max-w-full max-h-full" />
            </div>

            {hasNext && (
                <button onClick={onNext} className="absolute right-4 text-white text-4xl">
                    <FiChevronRight />
                </button>
            )}
        </div>,
        document.getElementById('lightbox-root')
    );
};

export default ImageLightbox;
