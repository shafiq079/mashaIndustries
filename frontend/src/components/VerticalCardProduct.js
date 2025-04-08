import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scroll-smooth scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading ? (
          loadingList.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[240px] lg:max-w-[240px] bg-white rounded-md shadow-sm"
              >
                <div className="bg-slate-200 h-36 md:h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-3 grid gap-2">
                  <h2 className="font-medium text-sm text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-2">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-xs text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        ) : (
          data.map((product) => {
            return (
              <Link
                key={product._id}
                to={'product/' + product._id}
                className="w-full min-w-[180px] max-w-[180px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[240px] lg:max-w-[240px] bg-white rounded-md shadow-md transform transition-all hover:scale-105"
              >
                <div className="bg-slate-200 overflow-hidden h-full flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="h-36 md:h-48 object-cover transition-all hover:scale-110"
                  />
                </div>
                <div className="p-3 grid gap-2">
                  <h2 className="font-medium text-sm text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500 text-xs">{product?.category}</p>
                  <div className="flex gap-2">
                    <p className="text-red-600 font-medium text-sm">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through text-sm">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;