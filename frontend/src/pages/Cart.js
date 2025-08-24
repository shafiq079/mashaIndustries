import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../store/cartSlice';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: data, status: loading } = useSelector((state) => state.cart);
  const loadingCart = new Array(4).fill(null);

  useEffect(() => {
    // Fetch cart items only if they haven't been fetched yet
    if (loading === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [loading, dispatch]);

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        cartItems: data
      })
    });
    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  const updateCartItem = async (id, quantity) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({ _id: id, quantity })
    });
    const responseData = await response.json();
    if (responseData.success) {
      dispatch(fetchCartItems());
      toast.success("Cart updated!");
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({ _id: id })
    });
    const responseData = await response.json();
    if (responseData.success) {
      dispatch(fetchCartItems());
      toast.success("Item removed from cart.");
    }
  };

  // Quantity summary stays the same (show actual qty for info)
  const totalQty = data.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity || 0), 0);

  // >>> FIX: custom items contribute their fixed quoted price ONCE (no qty multiplication)
  const totalPrice = data.reduce((sum, item) => {
    if (item?.isCustom) {
      const fixed = Number(item?.customDetails?.price) || 0;
      return sum + fixed;
    }
    const unit = Number(item?.productId?.sellingPrice) || 0;
    const qty = Number(item?.quantity) || 0;
    return sum + unit * qty;
  }, 0);

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && loading !== 'loading' && (
          <p className='bg-white py-5'>Your Cart is Empty</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        <div className='w-full max-w-3xl'>
          {loading === 'loading' ? (
            loadingCart?.map((el, index) => (
              <div key={"loading-" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
            ))
          ) : (
            data.map((product) => {
              const price = product?.isCustom
                ? Number(product?.customDetails?.price) || 0
                : Number(product?.productId?.sellingPrice) || 0;

              const name = product?.isCustom
                ? product?.customDetails?.designName
                : product?.productId?.productName;

              const category = product?.isCustom
                ? product?.customDetails?.productType
                : product?.productId?.category;

              const image = product?.isCustom
                ? product?.customDetails?.image
                : product?.productId?.productImage?.[0];

              // >>> FIX: per-line total — custom stays fixed, regular = price * qty
              const lineTotal = product?.isCustom ? price : price * (product?.quantity || 0);

              return (
                <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={image} alt={name} className='w-full h-full object-scale-down mix-blend-multiply' />
                  </div>
                  <div className='px-4 py-2 relative'>
                    <div
                      className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{name}</h2>
                    <p className='capitalize text-slate-500'>{category}</p>

                    <div className='flex items-center justify-between'>
                      {/* Left: unit/fixed price display (unchanged) */}
                      <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(price)}</p>

                      {/* Right: line total — fixed for custom */}
                      <p className='text-slate-600 font-semibold text-lg'>
                        {displayINRCurrency(lineTotal)}
                      </p>
                    </div>

                    <div className='flex items-center gap-3 mt-1'>
                      {product?.isCustom ? (
                        // Custom qty is fixed — just show it, no +/- controls
                        <p className='text-sm'>
                          Qty: <span className='font-semibold'>{product?.quantity}</span>
                        </p>
                      ) : (
                        <div className='flex items-center gap-3'>
                          <button
                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                            onClick={() => updateCartItem(product?._id, (product?.quantity || 1) - 1)}
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                            onClick={() => updateCartItem(product?._id, (product?.quantity || 0) + 1)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {data.length > 0 && (
          <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            <div className='h-auto bg-white'>
              <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;
