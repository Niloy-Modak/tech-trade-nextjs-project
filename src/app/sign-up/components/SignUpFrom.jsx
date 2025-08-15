'use client'
import { signUpUsers } from '@/app/actions/auth/signUpUsers';
import GoogleButton from '@/app/components/GoogleButton';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';


const SignUpFrom = () => {
    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const email = form.email.value;
        const password = form.password.value;

        Swal.fire({
            title: "Submitting...",
            showConfirmButton: false,
            timer: 1500,
        });

        try {
            const result = await signUpUsers({ name, image, email, password });

            if (result?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Sign Up Failed",
                    text: result.error || "Something went wrong.",
                });
            } else {
                // Auto sign in the user after signup
                const signInResult = await signIn("credentials", {
                    redirect: false, // false so you can control navigation
                    email,
                    password,
                });

                if (signInResult?.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: signInResult.error,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Account Created & Logged In!",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        router.push('/'); // or dashboard
                    });
                }
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="hero  min-h-[calc(100vh-334px)] py-8 lg:py-12 px-4">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className='text-center pt-6 text-2xl font-bold'>Sign UP</h1>
                <div className="card-body">
                    <form onSubmit={handleSignUp} className="fieldset">
                        <label className="label" >Name</label>
                        <input type="text" name="name" className="input focus:outline-0 " placeholder="Type Your Name" required />

                        <label className="label ">Image</label>
                        <input type="text" name='image' className="input focus:outline-0 " placeholder="Photo URL" required />

                        <label className="label">Email</label>
                        <input type="email" name="email" className="input focus:outline-0 " placeholder="Email" required />

                        <label className="label">Password</label>
                        <input type="password" name="password" className="input focus:outline-0 " placeholder="Password" required />

                        <p>If you have an account all ready? <Link href={"/sign-in"}><span className='font-bold text-primary'>Sign-in</span></Link> </p>

                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                    
                    <p className='py-2 text-center'>--- or ---</p>
                        <GoogleButton />
                </div>
            </div>
        </div>
    );
};

export default SignUpFrom;