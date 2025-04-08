// routes.js
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassowrd from '../pages/ForgotPassowrd';
import SignUp from '../pages/SignUp';
import VerifyEmail from '../pages/VerifyEmail';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';
import Custom from '../pages/custom';
import VirtualTryOn from '../pages/VirtualTryOn';
import Ai from '../pages/ai';
import SummaryApi from '../common';

// ProtectedRoute with Redux and async fallback
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user); // Correct path based on your slice
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (!user) { // Only check API if Redux state is not set
      const verifyAuth = async () => {
        try {
          const response = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: 'include',
          });
          const data = await response.json();
          setIsAuthenticated(data.success);
        } catch (error) {
          setIsAuthenticated(false);
        }
      };
      verifyAuth();
    } else {
      setIsAuthenticated(true); // Trust Redux state if user exists
    }
  }, [user]);

  if (isAuthenticated === null && !user) return <div>Loading...</div>;
  return user || isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'custom',
        element: <ProtectedRoute><Custom /></ProtectedRoute>,
      },
      {
        path: 'virtual-try-on',
        element: <ProtectedRoute><VirtualTryOn /></ProtectedRoute>,
      },
      {
        path: 'ai',
        element: <ProtectedRoute><Ai /></ProtectedRoute>,
      },
      {
        path: 'order',
        element: <ProtectedRoute><OrderPage /></ProtectedRoute>,
      },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassowrd /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'verify-email', element: <VerifyEmail /> },
      { path: 'product-category', element: <CategoryProduct /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'success', element: <Success /> },
      { path: 'cancel', element: <Cancel /> },
      { path: 'search', element: <SearchProduct /> },
      {
        path: 'admin-panel',
        element: <AdminPanel />,
        children: [
          { path: 'all-users', element: <AllUsers /> },
          { path: 'all-products', element: <AllProducts /> },
        ],
      },
    ],
  },
]);

export default router;