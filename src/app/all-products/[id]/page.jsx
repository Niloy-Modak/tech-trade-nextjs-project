import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import AddCartButton from '../components/AddCartButton';

const ProductDetailPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:3000/api/product/${id}`, {
        cache: "no-store", // ensure fresh data
    });

    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }

    const singleProduct = await res.json();

    // console.log(singleProduct);

    return (
        <div className="max-w-7xl mx-auto p-4 py-32 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={singleProduct.imageUrl}
                        alt="HP Laptop"
                        className="rounded-lg shadow-lg max-h-[400px] object-contain"
                    />
                </div>

                {/* Right Side - Product Details */}
                <div className="flex flex-col justify-center">
                    {/* Product name*/}
                    <h1 className="text-2xl font-bold text-gray-800">
                        {singleProduct.product_name}
                    </h1>


                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-green-700 text-2xl font-bold"> $ {singleProduct.price}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className='p-2'>
                            {singleProduct.shortDescription}
                        </p>
                    </div>

                    {/* Condition & Warranty */}
                    <div className="mt-6 space-y-3">
                        {/* Condition */}
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-700">Condition:</p>
                            <span
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${singleProduct.condition === "Brand New"
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                    }`}
                            >
                                {singleProduct.condition}
                            </span>
                        </div>

                        {/* Warranty */}
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-700">Warranty:</p>
                            <span
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${singleProduct.warranty > 0 ? "bg-blue-500" : "bg-red-500"
                                    }`}
                            >
                                {singleProduct.warranty > 0
                                    ? `${singleProduct.warranty} Month Warranty`
                                    : "No Warranty"}
                            </span>
                        </div>

                        {/* Seller Info */}
                        <div className="mt-8 p-4 border rounded-lg shadow-sm bg-gray-50">
                            <h2 className=" font-semibold text-gray-800 mb-2">Seller Information :</h2>

                            <div>
                                <p className="font-medium text-gray-800">
                                    {singleProduct.seller_name || "Unknown Seller"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Email: {singleProduct.seller_email || "N/A"}
                                </p>
                            </div>
                        </div>


                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <AddCartButton product={singleProduct}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;