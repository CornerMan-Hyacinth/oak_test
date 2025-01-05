"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CenterTitleComponent } from "@/components/Title";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendResetLink = async () => {};

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4 pb-20">
      <Breadcrumb />
      <div className="flex flex-col items-center mt-5">
        <CenterTitleComponent isH1 title={"Lost Your Password"} color="black" />
        <p className="text-black opacity-70 text-base mt-7 text-center">
          Lost your Password, No worries!!.
          <br />
          We will send you a reset link.
        </p>
      </div>

      <div className="flex justify-center items-center mt-20">
        <div className="lg:w-2/3 md:w-4/5 w-full px-4 md:px-10 py-8 border border-black border-opacity-50 rounded-lg flex flex-col items-center">
          <div className="mb-5 w-full">
            <label htmlFor="email" className="text-sm text-black">
              <span className="opacity-70">Full name or Email</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-1">
              <input
                type="email"
                id="email"
                placeholder="Enter your name or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-black text-base flex-grow"
              />
            </div>
          </div>

          <Button text="Send Reset Link" isDark handleClick={sendResetLink} />

          <div className="w-full flex items-center space-x-2 mt-5">
            <Link
              href={"/signin"}
              className="hover:underline flex items-center space-x-2"
            >
              <FaArrowLeft color="black" size={14} />
              <span className="text-sm text-black">Back to Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
