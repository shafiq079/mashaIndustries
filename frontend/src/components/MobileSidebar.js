import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ROLE from '../common/role';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';

const MobileSidebar = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (path) => {
        if (user?._id) {
            navigate(path);
            onClose();
        } else {
            toast.error('Please login!');
        }
    };

    const handleLogout = async () => {
        onClose();
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include',
        });
        const data = await fetchData.json();
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate('/');
        }
        if (data.error) {
            toast.error(data.message);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <nav className="flex flex-col gap-2">
                        {user?.role === ROLE.ADMIN && (
                            <Link to={'/admin-panel/all-products'} onClick={onClose} className="px-2 py-1 hover:bg-gray-100 rounded">Admin Panel</Link>
                        )}
                        
                        <h3 className="font-medium mt-2">Orders</h3>
                        <button onClick={() => handleNavigate('/order')} className="px-2 py-1 hover:bg-gray-100 rounded text-left">See Orders</button>
                        <button onClick={() => handleNavigate('/custom')} className="px-2 py-1 hover:bg-gray-100 rounded text-left">New Custom Order</button>
                        <button onClick={() => handleNavigate('/my-custom-orders')} className="px-2 py-1 hover:bg-gray-100 rounded text-left">My Custom Orders</button>

                        <h3 className="font-medium mt-2">AI Features</h3>
                        <button onClick={() => handleNavigate('/ai')} className="px-2 py-1 hover:bg-gray-100 rounded text-left">AI Image Gen</button>
                        <button onClick={() => handleNavigate('/virtual-try-on')} className="px-2 py-1 hover:bg-gray-100 rounded text-left">Virtual Try-On</button>

                        <hr className='my-3'/>

                        {user?._id ? (
                            <button onClick={handleLogout} className='text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded'>Logout</button>
                        ) : (
                            <Link to={'/login'} onClick={onClose} className="px-2 py-1 hover:bg-gray-100 rounded">Login</Link>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;
