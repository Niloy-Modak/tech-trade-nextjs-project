'use client'
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Modal from './Modal';
import UpdateFrom from './UpdateFrom';

const ProductTable = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
   

    useEffect(() => {
        const fetchMyProducts = async () => {
            const res = await fetch("https://tech-trade-psi.vercel.app/api/product");
            const d = await res.json();
            setData(d);
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
                const res = await fetch(`https://tech-trade-psi.vercel.app/api/product/${id}`, {
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

    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-[80%] mx-auto border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <img src={product.imageUrl} alt={product.product_name} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">{product.product_name}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleUpdateClick(product._id)}
                                        className="btn rounded-xl text-blue-500 hover:text-blue-700"
                                    >
                                        <FiEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn rounded-xl text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                {selectedProduct && <UpdateFrom product={selectedProduct} closeModal={closeModal}/>}
            </Modal>
        </>
    );
};

export default ProductTable;
