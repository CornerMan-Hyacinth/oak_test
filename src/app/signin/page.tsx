"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CenterTitleComponent } from "@/components/Title";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Signin = () => {
  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });
  const [isPasswordSeen, setPasswordSeen] = useState(false);
  const [isRememberMeOn, setRememberMeOn] = useState(false);

  const handleLogin = async () => {};

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4 pb-20">
      <Breadcrumb />
      <div className="flex flex-col items-center mt-5">
        <CenterTitleComponent isH1 title={"Sign In"} color="black" />
        <p className="text-black opacity-70 text-base mt-7">
          Sign in to get started wth Oak Scientifics
        </p>
      </div>

      <div className="flex justify-center items-center mt-20">
        <div className="lg:w-2/3 md:w-4/5 w-full px-4 md:px-10 py-8 border border-black border-opacity-50 rounded-lg flex flex-col items-center">
          <div className="mb-5 w-full">
            <label htmlFor="user" className="text-sm text-black">
              <span className="opacity-70">Full name or Email</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-2">
              <input
                type="text"
                id="user"
                placeholder="Enter your name or email"
                value={inputs.user}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, user: e.target.value }))
                }
                className="bg-transparent outline-none text-black text-base flex-grow"
              />
            </div>
          </div>

          <div className="mb-5 w-full">
            <label htmlFor="password" className="text-sm text-black">
              <span className="opacity-70">Password</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-2 space-x-4">
              <input
                type={isPasswordSeen ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, password: e.target.value }))
                }
                className="bg-transparent outline-none text-black text-base flex-grow"
              />
              <button
                className="text-black hover:text-my-blue duration-300 ease-in-out"
                onClick={() => setPasswordSeen((prev) => !prev)}
              >
                {isPasswordSeen ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between w-full my-5">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setRememberMeOn((prev) => !prev)}
            >
              <div className="flex items-center justify-center border border-my-blue h-3 w-3 rounded-full">
                {isRememberMeOn && (
                  <div className="h-2 w-2 rounded-full bg-my-blue" />
                )}
              </div>
              <span className="text-my-blue text-sm">Remember Me</span>
            </div>

            <Link
              href={"/forgot"}
              className="text-sm text-my-blue hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button text="Sign in" isDark handleClick={handleLogin} />

          <div className="w-full flex items-center space-x-2 mt-5">
            <span className="text-sm text-black">Don't have an account?</span>
            <Link
              href={"/register"}
              className="text-sm text-my-blue hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signin;
