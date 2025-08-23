'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const CartTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://tech-trade-psi.vercel.app/api/cart");
                const d = await res.json();
                setData(d);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProducts();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://tech-trade-psi.vercel.app/api/cart/${id}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (data.success || data.deletedCount > 0) {
                    setData(prevData => prevData.filter(product => product._id !== id));
                    Swal.fire({
                        icon: "success",
                        title: "Successfully Deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting.');
            }
        }
    };

    // Loading indicator
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center">
               <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className='px-4'>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left hidden sm:table-cell">Category</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left hidden md:table-cell">Seller Email</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((product) => (
                                <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <Link href={`all-products/${product.productId}`}>
                                            <img
                                                src={product.image}
                                                alt={product.product_name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">{product.product_name}</td>
                                    <td className="px-4 py-2 hidden sm:table-cell">{product.category}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2 hidden md:table-cell">{product.seller_email}</td>
                                    <td className="px-4 py-2 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 hover:text-red-700 btn rounded-xl"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartTable;
