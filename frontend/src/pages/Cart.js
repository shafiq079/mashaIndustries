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
    if (loading === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [loading, dispatch]);

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: { "content-type": 'application/json' },
      body: JSON.stringify({ cartItems: data })
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
      headers: { "content-type": 'application/json' },
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
      headers: { "content-type": 'application/json' },
      body: JSON.stringify({ _id: id })
    });
    const responseData = await response.json();
    if (responseData.success) {
      dispatch(fetchCartItems());
      toast.success("Item removed from cart.");
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + (curr.quantity || 0), 0);

  // Custom items = fixed quoted price (not multiplied by qty)
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
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && loading !== 'loading' && (
          <p className="bg-white py-5">Your Cart is Empty</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading === 'loading' ? (
            loadingCart.map((_, index) => (
              <div
                key={"loading-" + index}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              />
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

              const lineTotal = product?.isCustom ? price : price * (product?.quantity || 0);

              return (
                <div
                  key={product?._id}
                  className="relative w-full bg-white my-2 border border-slate-200 rounded-lg p-2"
                >
                  {/* Delete */}
                  <button
                    aria-label="Remove from cart"
                    onClick={() => deleteCartProduct(product?._id)}
                    className="absolute top-2 right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white transition"
                  >
                    <MdDelete />
                  </button>

                  <div className="grid grid-cols-[88px,1fr] sm:grid-cols-[128px,1fr] gap-3">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 rounded overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="pr-10 sm:pr-2">
                      <h2 className="text-base sm:text-lg font-medium text-slate-900 line-clamp-2">
                        {name}
                      </h2>
                      <p className="capitalize text-slate-500 text-xs sm:text-sm">
                        {category}
                      </p>

                      {/* Prices: stack on mobile, row on sm+ */}
                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <p className="text-red-600 font-semibold text-base sm:text-lg">
                          {displayINRCurrency(price)}
                        </p>
                        <p className="text-slate-700 font-semibold text-base sm:text-lg">
                          {displayINRCurrency(lineTotal)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="mt-2">
                        {product?.isCustom ? (
                          <p className="text-xs sm:text-sm">
                            Qty: <span className="font-semibold">{product?.quantity}</span>
                          </p>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-7 h-7 sm:w-6 sm:h-6 flex justify-center items-center rounded"
                              onClick={() => updateCartItem(product?._id, (product?.quantity || 1) - 1)}
                            >
                              −
                            </button>
                            <span className="text-sm sm:text-base">
                              {product?.quantity}
                            </span>
                            <button
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-7 h-7 sm:w-6 sm:h-6 flex justify-center items-center rounded"
                              onClick={() => updateCartItem(product?._id, (product?.quantity || 0) + 1)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {data.length > 0 && (
          <aside className="mt-5 lg:mt-0 w-full max-w-sm">
            <div className="h-auto bg-white rounded-lg border border-slate-200 overflow-hidden">
              <h2 className="text-white bg-red-600 px-4 py-2">Summary</h2>
              <div className="px-4 py-3 flex items-center justify-between gap-2 font-medium text-base text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="px-4 pb-3 flex items-center justify-between gap-2 font-medium text-base text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button
                className="bg-blue-600 p-2 text-white w-full hover:bg-blue-700 transition"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Cart;
