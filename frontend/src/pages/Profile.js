import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import uploadImage from '../helpers/uploadImage';
import { setUserDetails } from '../store/userSlice';
import { FaRegCircleUser } from "react-icons/fa6";
import AddressModal from '../components/AddressModal';

const Profile = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [profilePic, setProfilePic] = useState(user?.profilePic || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

    // Address Book States
    const [addresses, setAddresses] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null); // For editing

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setProfilePic(user.profilePic);
        }
    }, [user, navigate]);

    // Fetch Addresses
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(SummaryApi.getAddresses.url, { withCredentials: true });
            if (response.data.success) {
                setAddresses(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch addresses.');
        }
    };

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    // Handle Profile Update
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadResponse = await uploadImage(file);
                if (uploadResponse.secure_url) {
                    setProfilePic(uploadResponse.secure_url);
                    toast.success('Profile picture uploaded. Click Update Profile to save.');
                } else {
                    toast.error('Failed to upload image.');
                }
            } catch (error) {
                toast.error('Error uploading image.');
            }
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);
        try {
            const response = await axios.post(SummaryApi.updateMyProfile.url, { name, profilePic }, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUserDetails(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error updating profile.');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    // Handle Password Change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error('New password and confirm password do not match.');
            return;
        }
        setIsChangingPassword(true);
        try {
            const response = await axios.post(SummaryApi.changePassword.url, { oldPassword, newPassword }, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setShowChangePasswordForm(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error changing password.');
        } finally {
            setIsChangingPassword(false);
        }
    };

    // Address Book Handlers
    const handleAddAddress = () => {
        setCurrentAddress(null);
        setIsAddressModalOpen(true);
    };

    const handleEditAddress = (address) => {
        setCurrentAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                const response = await axios.post(SummaryApi.deleteAddress.url, { addressId }, { withCredentials: true });
                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchAddresses();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('Error deleting address.');
            }
        }
    };

    const handleAddressModalClose = () => {
        setIsAddressModalOpen(false);
        setCurrentAddress(null);
        fetchAddresses(); // Refresh addresses after modal closes
    };

    if (!user) return null; // Or a loading spinner

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-120px)]">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

            {/* Profile Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl cursor-pointer relative flex justify-center">
                            {profilePic ? (
                                <img src={profilePic} className="w-20 h-20 rounded-full object-cover" alt="Profile" />
                            ) : (
                                <FaRegCircleUser className="w-20 h-20 text-gray-400" />
                            )}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProfilePicChange} />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={isUpdatingProfile}
                    >
                        {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Password</h3>
                    {!showChangePasswordForm ? (
                        <button
                            onClick={() => setShowChangePasswordForm(true)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Change Password
                        </button>
                    ) : (
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                    disabled={isChangingPassword}
                                >
                                    {isChangingPassword ? 'Changing...' : 'Save Password'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowChangePasswordForm(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Order History Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/order" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center">
                        View All Orders
                    </Link>
                    <Link to="/my-custom-orders" className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-center">
                        View Custom Order Requests
                    </Link>
                </div>
            </div>

            {/* Address Book Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Address Book</h2>
                {addresses.length === 0 ? (
                    <p className="text-gray-500 mb-4">No addresses saved yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {addresses.map(address => (
                            <div key={address._id} className="border p-4 rounded-md bg-gray-50">
                                <p className="font-semibold">{address.fullName}</p>
                                <p>{address.streetAddress}</p>
                                <p>{address.city}, {address.state} {address.postalCode}</p>
                                <p>{address.country}</p>
                                <p>Phone: {address.phoneNumber}</p>
                                <div className="mt-2 flex gap-2">
                                    <button 
                                        onClick={() => handleEditAddress(address)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteAddress(address._id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleAddAddress}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add New Address
                </button>
            </div>

            {isAddressModalOpen && (
                <AddressModal 
                    onClose={handleAddressModalClose} 
                    address={currentAddress} 
                />
            )}
        </div>
    );
};

export default Profile;
