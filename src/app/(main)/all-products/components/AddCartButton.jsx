"use client";
import { useSession, signIn } from 'next-auth/react';
import React from 'react';
import Swal from 'sweetalert2';

const AddCartButton = ({ product }) => {
    const { data: session } = useSession();

    const handleAddToCart = async () => {
        if (!session?.user?.email) {
            return signIn(); // Redirect to login
        }

        const result = await Swal.fire({
            title: "Add to Cart?",
            text: `Do you want to add "${product.product_name}" to your cart?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, add it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch("/api/add-cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    buyer_email: session.user.email,
                    productId: product._id,
                    product_name: product.product_name,
                    category: product.category,
                    price: product.price,
                    quantity: 1,
                    image: product.imageUrl,
                    condition: product.condition,
                    warranty: product.warranty,
                    seller: product.seller_name,
                    seller_email: product.seller_email
                }),
            });

            if (!res.ok) throw new Error("Failed to add to cart");

            const data = await res.json();
            // console.log("Cart Updated:", data);

            Swal.fire({
                title: "Added!",
                text: `"${product.product_name}" has been added to your cart.`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            // console.error(err);
            Swal.fire("Error", "Could not add to cart. Please try again.", "error");
        }
    };

    const isSeller = session?.user?.email === product.seller_email;
    const isLoggedIn = !!session?.user?.email;

    return (
        <div>
            <button
                onClick={handleAddToCart}
                disabled={isSeller}
                className={`px-6 py-3 rounded-md font-semibold text-white ${isSeller
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700"
                    }`}
            >
                {isSeller
                    ? "You are the seller"
                    : !isLoggedIn
                        ? "Sign in for Add to Cart "
                        : "Add to Cart"}
            </button>
        </div>
    );
};

export default AddCartButton;
