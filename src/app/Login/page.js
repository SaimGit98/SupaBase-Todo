"use client";
import React, { useState } from "react";
import Image from "next/image";
import Preloader from "@/components/Preloader/Preloader";
import Link from "next/link";
import googleplay from "@/assest/images/googleplay.png";
import microsoft from "@/assest/images/microsoft.png";
import profile from '@/assest/images/profile.png'
import Input from "@/components/input.jsx";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { supabase } from "@/client";



const Page = () => {
    const router = useRouter()

    const [islogIn, setIsLogIn] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log(data)
        if (data.password && data.email) {
            setIsLogIn(true);
            
            supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error during sign in:", error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                    });
                } else {
                    console.log("Sign-up successful:", data);
                    localStorage.setItem("token", data.session.access_token)
                    Swal.fire("You're Welcome!");
                    router.push("/Dashboard"); 
                }
            })
            .catch((error) => {
                console.error("Error during sign in:", error); 
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login failed! Please check your credentials and try again.',
                });
            })
            .finally(() => {
                setIsLogIn(false);
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'All fields are required!',
                text: 'Please fill out all the fields.',
            });
        }
    };
    
    return (
        <>
            <div className="w-full h-full mt-5 mr-0 mb-10 ml-0 pt-20 pr-0 md:m-0">
                <div className=" h-auto md:border-2 md:w-80 md:h-72 md:m-auto md:py-8 lg:items-end">
                    <div className=" w-full h-14 flex justify-center  ">
                        <Image src={profile} alt="logo" className="w-14" />
                    </div>

                    <div className=" mt-16 h-20 flex flex-col justify-center items-center">
                        <Input
                            type="text"
                            name="email"
                            value={data.email}
                            className="bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2   "
                            placeholder="email"
                            onChange={handleChange}
                        />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2   "
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-cyan-500 w-60 h-9  text-md px-2 py-1 rounded-md text-white  active:bg-cyan-800"
                        >
                            Log in
                        </button>
                    </div>
                    <br />

                </div>

                <div className="mt-10 flex justify-center items-center gap-1 md:border-2 md:w-80 md:h-4 md:m-auto md:mt-5 md:py-5 ">
                    <p className="text-sm md:text-base"> {"Don't have an account ?"}</p>
                    <Link
                        href="/Signup"
                        className="text-sm font-semibold text-cyan-500  md:text-base"
                    >
                        Sign Up
                    </Link>
                </div>

                <div className=" mt-8 flex justify-center">
                    <p className="text-sm md:text-base "> Get the app .</p>
                </div>

                <div className="flex justify-center items-center mt-5 gap-2">
                    <Image
                        src={googleplay}
                        alt="google play store"
                        className="w-5/12 h-12 md:w-40"
                    />
                    <Image src={microsoft} alt="Microsoft" className="w-4/12 h-12 md:w-40 " />
                </div>
                {islogIn && (
                    <div>
                        <Preloader />
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;
