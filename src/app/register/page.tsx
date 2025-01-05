"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CenterTitleComponent } from "@/components/Title";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [isPasswordSeen, setPasswordSeen] = useState(false);
  const [isConfirmSeen, setConfirmSeen] = useState(false);

  const handleRegister = async () => {};

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4 pb-20">
      <Breadcrumb />
      <div className="flex flex-col items-center mt-5">
        <CenterTitleComponent isH1 title={"Register"} color="black" />
        <p className="text-black opacity-70 text-base mt-7">
          Welcome to Oak Scientifics
        </p>
      </div>

      <div className="flex justify-center items-center mt-20">
        <div className="lg:w-2/3 md:w-4/5 w-full px-4 md:px-10 py-8 border border-black border-opacity-50 rounded-lg flex flex-col items-center">
          <div className="mb-5 w-full">
            <label htmlFor="name" className="text-sm text-black">
              <span className="opacity-70">Full name</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-2">
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={inputs.name}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-transparent outline-none text-black text-base flex-grow"
              />
            </div>
          </div>

          <div className="mb-5 w-full">
            <label htmlFor="email" className="text-sm text-black">
              <span className="opacity-70">Email</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-2">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={inputs.email}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, email: e.target.value }))
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

          <div className="mb-5 w-full">
            <label htmlFor="confirm" className="text-sm text-black">
              <span className="opacity-70">Confirm Password</span>
              <span className="text-red-800">*</span>
            </label>
            <div className="flex items-center justify-between border-b focus-within:border-b-2 border-black focus-within:border-my-blue border-opacity-50 focus-within:border-opacity-100 mt-2 space-x-4">
              <input
                type={isConfirmSeen ? "text" : "password"}
                id="confirm"
                placeholder="Confirm your password"
                value={inputs.confirm}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, confirm: e.target.value }))
                }
                className="bg-transparent outline-none text-black text-base flex-grow"
              />
              <button
                className="text-black hover:text-my-blue duration-300 ease-in-out"
                onClick={() => setConfirmSeen((prev) => !prev)}
              >
                {isConfirmSeen ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <Button text="Register" isDark handleClick={handleRegister} />

          <div className="w-full flex items-center space-x-2 mt-5">
            <span className="text-sm text-black">Already have an account?</span>
            <Link
              href={"/signin"}
              className="text-sm text-my-blue hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
