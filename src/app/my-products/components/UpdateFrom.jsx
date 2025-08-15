"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UpdateFrom = ({ closeModal, product: pID }) => {
    const [condition, setCondition] = useState("Brand New");
    const [warranty, setWarranty] = useState("");
    const [productData, setProductData] = useState(null);

    //single product data fetch
    useEffect(() => {
        if (!pID) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/my-product/${pID}`); // Your API endpoint
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProductData(data);

            } catch (err) {
                // console.error(err);
            }
        };

        fetchProduct();
    }, [pID]);

    const handleConditionChange = (e) => {
        const value = e.target.value;
        setCondition(value);
        if (value === "Used") {
            setWarranty(0); // Auto set to 0 if used
        } else {
            setWarranty(""); // Reset for brand new
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            product_name: e.target.name.value,
            shortDescription: e.target.shortDescription.value,
            imageUrl: e.target.imageUrl.value,
            category: e.target.category.value,
            condition,
            warranty,
            price: e.target.price.value,
        };

        // console.log(formData);

        try {
            const res = await fetch(`http://localhost:3000/api/my-product/${pID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", // important
                },
                body: JSON.stringify(formData),
            });

            const updatedData = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Product has been updated successfully.",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    closeModal();           // close the modal
                    window.location.reload(); // reload the page to show updated data
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    showConfirmButton: false,
                    text: updatedData.message || "Something went wrong!",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to update product.",
                showConfirmButton: false,
            });
        }
    };


    if (!productData) return <div className='flex justify-center h-12'><span className="loading loading-spinner loading-xl"></span></div>;
    return (
        <div>
            <form
                onSubmit={handleUpdateSubmit}
                className="max-w-3xl mx-auto p-6 space-y-6 bg-white border border-gray-200 rounded-xl shadow-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Update Product</h2>

                {/* Row 1: Name & Short Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            defaultValue={productData?.product_name}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Short Description</label>
                        <input
                            type="text"
                            name="shortDescription"
                            placeholder="Short description"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            defaultValue={productData?.shortDescription}
                            required
                        />
                    </div>
                </div>

                {/* Row 2: Image URL & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="Enter Image URL"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            defaultValue={productData?.imageUrl}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                        <select
                            name="category"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="phone">Phone</option>
                            <option value="laptop">Laptop</option>
                            <option value="tv">TV</option>
                            <option value="headphone">Headphone</option>
                            <option value="ac">AC</option>
                            <option value="fridge">Fridge</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>

                {/* Row 3: Condition & Warranty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Condition</label>
                        <select
                            name="condition"
                            value={condition}
                            onChange={handleConditionChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        >
                            <option value="Brand New">Brand New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Warranty (Months)</label>
                        {condition === "Brand New" ? (
                            <input
                                type="number"
                                name="warranty"
                                placeholder="Warranty period"
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                min="0"
                            />
                        ) : (
                            <input
                                type="number"
                                name="warranty"
                                value={0}
                                readOnly
                                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-500"
                            />
                        )}
                    </div>
                </div>

                {/* Row 4: Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            min="0"
                            defaultValue={productData?.price}
                            required
                        />
                    </div>

                </div>

                {/* Update Submit */}
                <div className='space-x-4'>
                    <button
                        type="submit"
                        className="btn bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Update Product
                    </button>
                    <button onClick={closeModal} className='btn btn-error text-white font-bold rounded-lg'>Close</button>
                </div>

            </form>
        </div>
    );
};

export default UpdateFrom;