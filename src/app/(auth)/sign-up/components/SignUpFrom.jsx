'use client'
import { signUpUsers } from '@/app/actions/auth/signUpUsers';
import GoogleButton from '@/app/(auth)/components/GoogleButton';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';

const SignUpFrom = () => {
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const email = form.email.value;
        const password = form.password.value;

        Swal.fire({
            title: "Submitting...",
            didOpen: () => Swal.showLoading(),
            showConfirmButton: false,
        });

        try {
            const result = await signUpUsers({ name, image, email, password });

            if (result?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Sign Up Failed",
                    text: result.error || "Something went wrong.",
                });
                return;
            }

            // Auto sign in and redirect to home
            await signIn("credentials", {
                email,
                password,
                redirect: true,       // let NextAuth handle redirect
                callbackUrl: "/",     // redirect after login
            });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="hero min-h-[calc(100vh-334px)] py-8 lg:py-12 px-4">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className='text-center pt-6 text-2xl font-bold'>Sign Up</h1>
                <div className="card-body">
                    <form onSubmit={handleSignUp} className="fieldset">

                        <label className="label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="input focus:outline-0" 
                            placeholder="Type Your Name" 
                            required 
                        />

                        <label className="label">Image</label>
                        <input 
                            type="text" 
                            name='image' 
                            className="input focus:outline-0" 
                            placeholder="Photo URL" 
                            required 
                        />

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

                        <p className='pt-2'>
                            Already have an account?{" "}
                            <Link href={"/sign-in"}>
                                <span className='font-bold text-primary'>Sign in</span>
                            </Link>.
                        </p>

                        <button className="btn btn-neutral mt-4">Sign Up</button>
                    </form>

                    <p className='py-2 text-center'>--- or ---</p>
                    <GoogleButton />
                </div>
            </div>
        </div>
    );
};

export default SignUpFrom;
