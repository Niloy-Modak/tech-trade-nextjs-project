'use client'
import Link from 'next/link';
import React from 'react';
import { signIn } from "next-auth/react";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import GoogleButton from '@/app/(auth)/components/GoogleButton';

const SignInFrom = () => {
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        Swal.fire({
            title: "Submitting...",
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // prevent auto redirect
            });

            if (result?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.error || "Invalid email or password!",
                });
                return;
            }

            // Wait a small delay to ensure session updates
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "Signed in successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    router.push('/all-products'); // go to home
                    router.refresh(); // refresh UI/server components
                });
            }, 300); // small delay

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong, please try again.",
            });
        }
    }

    return (
        <div className="hero min-h-[calc(100vh-334px)] px-4">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className='text-center pt-6 text-2xl font-bold'>Sign In</h1>
                <div className="card-body">
                    <form onSubmit={handleSignIn} className="fieldset">

                        <label className="label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="input focus:outline-0" 
                            placeholder="Email" 
                            required 
                        />

                        <label className="label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="input focus:outline-0" 
                            placeholder="Password" 
                            required 
                        />

                        <button className="btn btn-neutral mt-4">Login</button>

                        <p className='pt-2'>
                            New here?{" "}
                            <Link href={"/sign-up"}>
                                <span className='font-bold text-primary text-[14px] px-2'>Sign-up</span>
                            </Link>
                        </p>
                    </form>

                    <p className='py-2 text-center'>--- or ---</p>
                    <GoogleButton />
                </div>
            </div>
        </div>
    );
};

export default SignInFrom;
