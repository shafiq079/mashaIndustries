import React, { useContext, useState, useEffect, useRef } from 'react';
import Logo from './masha_industries';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const timeoutRef = useRef(null);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll('q');
  const [search, setSearch] = useState(searchQuery);
  const menuRef = useRef(null);

  const handleLogout = async () => {
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

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : '/search');
  };

  const handleProfileClick = () => {
    setMenuDisplay((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuDisplay && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDisplay]);

  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 300);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={'/'}>
            <Logo w={90} h={60} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            {user?.role === ROLE.ADMIN && (
              <Link
                to={'/admin-panel/all-products'}
                className="hover:text-red-600 transition"
              >
                Admin Panel
              </Link>
            )}

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('orders')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-red-600 transition flex items-center gap-1">
                Orders <FiChevronDown className="text-sm" />
              </button>
              {hoveredMenu === 'orders' && (
                <div className="absolute bg-white font-normal shadow-md rounded mt-2 z-50">
                  <button
                    onClick={() => {
                      if (user?._id) {
                        navigate('/order');
                      } else {
                        toast.error('Please login!');
                      }
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap text-left w-full"
                  >
                    See Orders
                  </button>

                  <button
                    onClick={() => {
                      if (user?._id) {
                        navigate('/custom');
                      } else {
                        toast.error('Please login!');
                      }
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap text-left w-full"
                  >
                    Custom Order
                  </button>

                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('ai')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-red-600 transition flex items-center gap-1">
                AI Features <FiChevronDown className="text-sm" />
              </button>
              {hoveredMenu === 'ai' && (
                <div className="absolute bg-white font-normal shadow-md rounded mt-2 z-50">
                  <button
                    onClick={() => {
                      if (user?._id) {
                        navigate('/ai');
                      } else {
                        toast.error('Please login!');
                      }
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap text-left w-full"
                  >
                    AI Image Gen
                  </button>
                  <button
                    onClick={() => {
                      if (user?._id) {
                        navigate('/virtual-try-on');
                      } else {
                        toast.error('Please login!');
                      }
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    Virtual Try-On
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="relative flex justify-center" ref={menuRef}>
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center items-center"
                onClick={handleProfileClick}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded w-52 z-50">
                <nav className="flex flex-col gap-2">
                  <p className="px-2 py-1 text-gray-700 font-medium">Profile</p>

                  {/* Mobile-only menus */}
                  <div className="flex flex-col md:hidden">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={'/admin-panel/all-products'}
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link to="/order" className="px-2 py-1 hover:bg-gray-100 rounded">
                      See Orders
                    </Link>
                    <Link to="/custom" className="px-2 py-1 hover:bg-gray-100 rounded">
                      Custom Order
                    </Link>
                    <Link to="/ai" className="px-2 py-1 hover:bg-gray-100 rounded">
                      AI Image Gen
                    </Link>
                    <Link to="/virtual-try-on" className="px-2 py-1 hover:bg-gray-100 rounded">
                      Virtual Try-On
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={'/cart'} className="text-2xl relative">
              <FaShoppingCart />
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={'/login'}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
