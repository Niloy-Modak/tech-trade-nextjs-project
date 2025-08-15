"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddFrom = () => {
    const { data: session } = useSession()

    const [condition, setCondition] = useState("Brand New");
    const [warranty, setWarranty] = useState("");

    const handleConditionChange = (e) => {
        const value = e.target.value;
        setCondition(value);
        if (value === "Used") {
            setWarranty(0); // Auto set to 0 if used
        } else {
            setWarranty(""); // Reset for brand new
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            seller_name: e.target.seller_name.value,
            seller_email: e.target.seller_email.value,
            product_name: e.target.name.value,
            shortDescription: e.target.shortDescription.value,
            imageUrl: e.target.imageUrl.value,
            category: e.target.category.value,
            condition,
            warranty,
            price: e.target.price.value,
        };
        console.log(formData);


        const res = await fetch("http://localhost:3000/api/product", {
            method: "POST",
            body: JSON.stringify(formData)
        })

        const postedResponse = await res.json()
        console.log(postedResponse);

        if (postedResponse.acknowledged && postedResponse.insertedId) {
            Swal.fire({
                title: "Success!",
                text: "Product successfully added!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            e.target.reset(); // Clear form after success
        } else {
            Swal.fire({
                title: "Error",
                text: "Something went wrong, please try again.",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto p-6 space-y-6 bg-white border border-gray-200 rounded-xl shadow-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Product</h2>

                {/* Row 1: Name & Short Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
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
                            required
                        />
                    </div>
                    <div className='hidden'>
                        <div>
                            <input
                                type="email"
                                name="seller_email"
                                defaultValue={session?.user?.email || ""}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="seller_name"
                                defaultValue={session?.user?.name || ""}
                                className="border p-2 rounded"
                            />
                        </div>

                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Submit Product
                </button>
            </form>


        </div>
    );
};

export default AddFrom;