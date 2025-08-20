import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AddressModal = ({ onClose, address }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (address) {
            setFormData(address);
        } else {
            setFormData({
                fullName: '',
                streetAddress: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                phoneNumber: ''
            });
        }
    }, [address]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (address) {
                // Update existing address
                response = await axios.post(SummaryApi.updateAddress.url, { addressId: address._id, ...formData }, { withCredentials: true });
            } else {
                // Add new address
                response = await axios.post(SummaryApi.addAddress.url, formData, { withCredentials: true });
            }

            if (response.data.success) {
                toast.success(response.data.message);
                onClose(); // Close modal and trigger refresh in parent
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error saving address.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{address ? 'Edit Address' : 'Add New Address'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
