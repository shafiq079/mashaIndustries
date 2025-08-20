import './App.css';
import 'react-quill/dist/quill.snow.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { fetchCartItems } from './store/cartSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        dispatch(setUserDetails(null));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      dispatch(setUserDetails(null));
    }
  };

  useEffect(() => {
    fetchUserDetails();
    if (user?._id) {
        dispatch(fetchCartItems());
    }
  }, [user?._id, dispatch]);

  const cartProductCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const isAdminPanel = location.pathname.startsWith('/admin-panel');
  const isLoginPage = location.pathname.startsWith('/login');
  const isRegisterPage = location.pathname.startsWith('/sign-up');

  return (
    <>
      <Context.Provider
        value={{
          cartProductCount,
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