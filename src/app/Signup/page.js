"use client";
import React, { useState } from "react";
import Input from "@/components/input.jsx";
import Link from "next/link";
import Swal from "sweetalert2";
import googleplay from "@/assest/images/googleplay.png";
import microsoft from "@/assest/images/microsoft.png";
import profile from '@/assest/images/profile.png'
import Image from "next/image";
import { supabase } from "@/client";
import Preloader from "@/components/Preloader/Preloader.jsx";

const Signup = () => {

  
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async () => {
    console.log(formData);
    setIsSignUp(true)
    if (
      formData.email &&
      formData.password &&
      formData.username &&
      formData.fullname
    ) {
      supabase.auth
        .signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              fullname: formData.fullname,
              username: formData.username
            },
            emailRedirectTo: 'http://localhost:3000/Login',
          },
        })
        .then(({ data }) => {
          console.log("Sign-up successful:", data);
          Swal.fire({
            icon: "success",
            title: "Sign Up Successful",
            text: "Please check your email to confirm your account.",
          });
          
        })
        .catch((error) => {
          console.error("Error during sign up:", error.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        })
        .finally(() => {
          setIsSignUp(false)
        })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required!',
        text: 'Please fill out all the fields.',

      });
    }

  };

  return (
    <div className="w-full h-screen mt-0 mr-0 mb-10 ml-0 pt-10 pr-0">
      <div className=" h-auto md:border-2 md:w-80 md:h-auto md:m-auto md:py-6 lg:items-end">
        <div className=" w-full h-14 flex justify-center ">
          <Image src={profile} alt="logo" className="w-14" />
        </div>


        <div className=" mt-28 h-20 flex flex-col justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              type={"text"}
              placeholder={" Email"}
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={
                "bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2 border-slate-300 "
              }
            />
            <Input
              type={"text"}
              placeholder={"Full Name"}
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={
                "bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2 border-slate-300 "
              }
            />
            <Input
              type={"text"}
              placeholder={"Username"}
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={
                "bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2 border-slate-300 "
              }
            />
            <Input
              type={"password"}
              placeholder={"Password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={
                "bg-gray-50 w-60 h-9 text-xs py-2 px-2 mb-2 rounded border-2 border-slate-300 "
              }
            />

            <div className="bg-cyan-500 flex justify-center  w-60 mt-2 m-auto py-2 gap-2 rounded-md active:bg-cyan-800">
              <input
                type="submit"
                value="Sign Up"
                className=" text-sm text-white font-semibold"
              />
            </div>

          </form>
        </div>


        <div className=" w-72 flex flex-col justify-center text-center text-gray-500 m-auto mt-20">
          <p className="text-xs mt-6">
            By signing up, you agree to our{" "}
            <span className="font-medium text-cyan-800">Terms</span> ,
            <span className="font-medium text-cyan-800">Privacy Policy</span>{" "}
            and
            <span className="font-medium text-cyan-800"> Cookies Policy</span> .
          </p>

        </div>

      </div>
      <div className="mt-4 flex justify-center items-center gap-1 md:border-2 md:w-80 md:h-4 md:m-auto md:mt-5 md:py-5 ">
        <p className="text-sm md:text-base">Already have an account ?</p>
        <Link
          href="/Login"
          className="text-sm font-semibold text-cyan-500  md:text-base"
        >
          Login
        </Link>
      </div>
      <div className=" mt-9 flex justify-center">
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
      {isSignUp && (
        <div>
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default Signup;
