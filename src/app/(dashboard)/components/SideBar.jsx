'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiPlusCircle, FiList, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const SideBar = () => {
    const { data: userData, status } = useSession()
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 4, to: '/My-Dashboard', label: 'My Dashboard', icon: <FiUser /> },               // user profile
        { id: 1, to: '/dashboard-add-products', label: 'Add Products', icon: <FiPlusCircle /> }, // + for adding
        { id: 2, to: '/dashboard-my-products', label: 'My Products', icon: <FiList /> },         // list of products
        { id: 3, to: '/dashboard-my-cart', label: 'My Cart', icon: <FiShoppingCart /> },        // cart icon
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-md z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center  gap-3">
                    <img src={userData?.user?.image} alt="user-image" className='w-11 h-11 rounded-full object-cover' />
                    <h2 className="text-xl font-bold text-gray-700">{userData?.user?.name}</h2>
                </div>

                {/* Navigation */}
                <nav className="p-4 text-sm space-y-6">

                    <div>
                        <h3 className="text-xs uppercase font-bold text-gray-400 mb-2 px-2">My dashboard</h3>
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.to}
                                        className={"flex text-base items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100"}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link href={"/"} className='btn btn-primary rounded-full'>
                        <span>Back to Home</span>
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default SideBar;