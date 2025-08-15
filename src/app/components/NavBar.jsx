'use client'

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';

const NavBar = () => {
    const { data: userData, status } = useSession()

    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be signed out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, sign me out",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    const navLinks = [{ name: "Home", to: "/" }, { name: "All Products", to: "/all-products" }, { name: "Add product", to: "/add-product" }, { name: "My Products", to: "/my-products" }, { name: "Contact Us", to: "/" }];

    return (
        <>
            <nav className="bg-white shadow-md w-full fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold text-gray-800">TechTrade</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                            <ul className="flex space-x-8">
                                {navLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.to}
                                            className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Login Button - Desktop */}
                        <div className="hidden md:block">

                            {
                                status == 'authenticated' ?
                                    (<div className='flex gap-3'>
                                        <img src={userData?.user?.image} alt="user-image" className='w-11 h-11 rounded-full object-cover' />
                                        <button
                                            onClick={handleSignOut}
                                            className='bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md  text-sm font-medium'>
                                            Sign Out
                                        </button>
                                    </div>) :
                                    (<>

                                        <Link href={"/sign-up"} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                                            Sign Up
                                        </Link></>)
                            }

                        </div>

                        {/* Mobile Toggle Button */}
                        <div className="md:hidden flex gap-2 items-center">
                            {status === 'authenticated' ? (
                                <img
                                    src={userData?.user?.image}
                                    alt="user-image"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <Link href={"/sign-up"} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                                    Sign Up
                                </Link>
                            )}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-800 hover:text-blue-600 focus:outline-none"
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu"
                            >
                                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Menu - Right Side */}
                <div
                    ref={menuRef}
                    id="mobile-menu"
                    className={`md:hidden bg-white shadow-lg fixed top-16 right-0 w-56 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        } z-50 overflow-y-auto`}
                >
                    <div className="p-4 space-y-2 flex flex-col items-end text-right">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.to}
                                onClick={closeMenu}
                                className="text-gray-800 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {
                            status == 'authenticated' ?
                                (<button
                                    onClick={handleSignOut}
                                    className='bg-red-400 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md  text-sm font-medium'>
                                    Sign Out
                                </button>) :
                                (<></>)
                        }

                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
