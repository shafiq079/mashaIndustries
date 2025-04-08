import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayUSDCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })
    const responseData = await response.json()
    setData(responseData.data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className="w-full h-screen">
      {!data.length ? (
        <p className="text-center text-gray-500">No Order for this user</p>
      ) : null}

      {data.map((item, index) => (
        <div key={item.userId + index} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-medium text-lg mb-2">{moment(item.createdAt).format('LL')}</p>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Details Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <div className="grid gap-3">
                {item?.productDetails?.map((product, index) => (
                  <div key={product.productId + index} className="flex gap-3 bg-slate-100 p-2 rounded-md">
                    <img
                      src={product.image[0]}
                      className="w-24 h-24 bg-slate-200 object-scale-down p-2 rounded-md"
                      alt={product.name}
                    />
                    <div className="flex flex-col justify-between">
                      <div className="font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-5 mt-1 text-sm">
                        <div className="text-red-500 font-semibold">{displayUSDCurrency(product.price)}</div>
                        <p>Qty: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment and Shipping Details Section */}
            <div className="flex-1 md:pt-10">
              {/* Payment Details */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <p className="text-sm font-medium">Method: {item.paymentDetails?.payment_method_type?.[0]}</p>
                <p className="text-sm font-medium">Status: {item.paymentDetails?.payment_status}</p>
              </div>

              {/* Shipping Details */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Shipping Details</h3>
                {item?.shipping_options?.length > 0 ? (
                  item.shipping_options.map((shipping, index) => (
                    <p key={index} className="text-sm font-medium">
                      Shipping Amount: {displayUSDCurrency(shipping.shipping_amount)}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No shipping details available</p>
                )}
              </div>

              {/* Total Amount */}
              <div className="font-semibold text-lg mt-2">
                Total: {displayUSDCurrency(item.totalAmount)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderPage
