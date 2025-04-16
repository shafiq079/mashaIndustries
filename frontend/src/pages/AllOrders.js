import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import AdminOrderCard from '../components/AdminOrderCard';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(SummaryApi.allOrder.url, {
          method: SummaryApi.allOrder.method,
          credentials: 'include',
        });
        const data = await response.json();
        setAllOrders(data?.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-md">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-2 text-center">#</th>
              <th className="p-2 text-center">Order ID</th>
              <th className="p-2 text-center">User</th>
              <th className="p-2 text-center">Items</th>
              <th className="p-2 text-center">Amount</th>
              <th className="p-2 text-center">Date</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <AdminOrderCard key={order._id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
