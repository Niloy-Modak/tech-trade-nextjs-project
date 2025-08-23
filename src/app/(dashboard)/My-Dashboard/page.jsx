'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const MyDashBoardPage = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, cartRes] = await Promise.all([
          fetch('https://tech-trade-psi.vercel.app/api/product'),
          fetch('https://tech-trade-psi.vercel.app/api/cart')
        ]);

        const productData = await productRes.json();
        const cartData = await cartRes.json();

        setProducts(productData);
        setCartItems(cartData);
      } catch (err) {
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (status === 'loading' || loading) {
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-xl"></span></div>;
  }

  const chartData = [
    { name: 'Products', total: products.length },
    { name: 'Cart Items', total: cartItems.length }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* User Info */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-md mb-6">
        <img
          src={session?.user?.image || '/default-avatar.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2">Total Added Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2">Total Products in Cart</h3>
          <p className="text-3xl font-bold">{cartItems.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Products vs Cart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyDashBoardPage;
