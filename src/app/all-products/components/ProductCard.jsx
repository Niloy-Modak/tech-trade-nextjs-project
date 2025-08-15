
import Link from 'next/link';
import React from 'react';

const ProductCard = ({product}) => {
    // console.log(product);
    return (
        <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col ">

            {/* Image */}
            <div className="h-[240px] w-full p-2">
                <img
                    src={product.imageUrl}
                    alt={"image"}
                    className="w-full h-full object-cover shadow-2xs rounded-lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold line-clamp-2">
                        {product.product_name}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-1 text-base font-medium">
                        <p className="text-gray-700">Category: <span className='text-black'>{product.category}</span></p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-gray-600">
                     <p>Price: <span>{product.price} $</span></p>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-4">
                    <Link
                        href={`/all-products/${product._id}`}
                        className="block w-full bg-gray-800 text-white py-2 rounded-full text-center font-medium hover:bg-gray-700 transition-colors"
                    >
                        View details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;