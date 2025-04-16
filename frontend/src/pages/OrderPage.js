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
    console.log("Order Fetch Response:", responseData)
    setData(responseData.data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className="w-full min-h-screen p-4 md:px-40 bg-gray-100">
      {!data.length ? (
        <p className="text-center text-gray-500">No Order for this user</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={item.userId + index} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex flex-col gap-4">
                
                {/* Product Details Section */}
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-md flex items-center justify-center">
                    <img
                      src={item.productDetails[0].image[0]}
                      className="w-24 h-24 bg-slate-200 object-scale-down rounded-md"
                      alt={item.productDetails[0].name}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 break-words">{item.productDetails[0].name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <span>Price</span>
                      <span className=" text-red-500 px-2 py-1 rounded-full">{displayUSDCurrency(item.productDetails[0].price)}</span>
                      <span>Qty.</span>
                      <span className=" text-blue-700 px-2 py-1 rounded-full">
                        {item.productDetails[0].quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Details Section */}
                <div className="flex flex-col gap-2 text-gray-600 text-sm mt-2">
                  <h4 className="font-semibold">Payment Details:</h4>

                  {/* Method row */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Method:</span>
                    {item.paymentDetails?.payment_method_type?.[0] ? (
                      <span className="text-blue-700 font-semibold uppercase">
                        {item.paymentDetails.payment_method_type[0]}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>

                  {/* Status row */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    {item.paymentDetails?.payment_status ? (
                      <span
                        className={`font-semibold uppercase ${
                          item.paymentDetails.payment_status === "paid"
                            ? "text-green-700"
                            : item.paymentDetails.payment_status === "pending"
                            ? "text-yellow-800"
                            : "text-red-700"
                        }`}
                      >
                        {item.paymentDetails.payment_status}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center mt-2 font-semibold text-lg bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-900">{displayUSDCurrency(item.totalAmount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderPage
