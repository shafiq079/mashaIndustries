import logo from './logo.svg';
import './App.css';
import 'react-quill/dist/quill.snow.css'; // Add this line to apply the default Quill theme
import { Outlet, useLocation } from 'react-router-dom'; // Added useLocation
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const location = useLocation(); // Added to get current route

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart();
  }, []);

  // Check if the current route is under /admin-panel
  const isAdminPanel = location.pathname.startsWith('/admin-panel');
  const isLoginPage = location.pathname.startsWith('/login');
  const isRegisterPage = location.pathname.startsWith('/signup');

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        {!isAdminPanel && !isLoginPage && !isRegisterPage && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;