"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CenterTitleComponent } from "@/components/Title";
import { useState } from "react";

const ContactSales = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = async () => {};

  return (
    <main className="w-full pb-20 lg:px-14 md:px-8 px-4">
      <div className="">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Contact Sales" color="black" />
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <p className="text-black md:text-lg text-base opacity-70 md:mt-5 text-center">
          We will give you a response as soon as we receive your message
        </p>

        <div className="lg:w-1/2 md:w-2/3 w-full md:px-10 px-4 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="text-black text-sm opacity-70"
            >
              First Name <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              value={inputs.firstName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="lastName" className="text-black text-sm opacity-70">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              value={inputs.lastName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="email" className="text-black text-sm opacity-70">
              Email Address <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={inputs.email}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="phone" className="text-black text-sm opacity-70">
              Phone/Mobile <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone/mobile number"
              value={inputs.phone}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full mb-5">
            <label htmlFor="email" className="text-black text-sm opacity-70">
              Message <span className="text-red-800 text-xs">*</span>
            </label>
            <textarea
              name="email"
              id="email"
              placeholder="Enter your message"
              value={inputs.message}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent min-w-28"
            />
          </div>

          <Button text="Send Message" isDark handleClick={sendMessage} />
        </div>
      </div>
    </main>
  );
};

export default ContactSales;
