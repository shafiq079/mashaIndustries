import React, { useState } from 'react';
import { MdOutlineVisibility } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency';

const AdminOrderCard = ({ order, index }) => {
  const [viewOrder, setViewOrder] = useState(false);
  console.log("Order Details in admin panel:", order);

  const getPaymentStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded text-white text-xs";
    if (status === "paid") return <span className={`${baseClass} bg-green-600`}>Paid</span>;
    if (status === "pending") return <span className={`${baseClass} bg-yellow-500`}>Pending</span>;
    return <span className={`${baseClass} bg-red-600`}>Failed</span>;
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-100 text-sm">
        <td className="p-2 text-center">{index + 1}</td>
        <td className="p-2 text-center">{order._id.slice(-6)}</td>
        <td className="p-2 text-center">{order.email || "N/A"}</td>
        <td className="p-2 text-center">{order.productDetails.length}</td>
        <td className="p-2 text-center">{displayINRCurrency(order.totalAmount)}</td>
        <td className="p-2 text-center">{new Date(order.createdAt).toLocaleString()}</td>
        <td className="p-2 text-center">
          <button
            onClick={() => setViewOrder(true)}
            className="p-1 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-full"
          >
            <MdOutlineVisibility size={20} />
          </button>
        </td>
      </tr>

      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-3xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.email}</p>
            <p><strong>Total Amount:</strong> {displayINRCurrency(order.totalAmount)}</p>
            <p><strong>Payment Status:</strong> {getPaymentStatusBadge(order.paymentDetails?.payment_status || "pending")}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Products:</h3>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border">Product Name</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.productDetails.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border">{item.name}</td>
                        <td className="px-4 py-2 border">{item.quantity}</td>
                        <td className="px-4 py-2 border">{displayINRCurrency(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewOrder(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderCard;
