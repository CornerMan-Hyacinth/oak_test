"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import Picker from "@/components/Picker";
import { TitleText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import { locationData } from "@/lib/locationData";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const RequestQuote = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [isPickerOn, setPickerOn] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const requestQuote = async () => {};

  return (
    <main className="w-full">
      <div className="lg:px-14 md:px-8 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Request A Quote" color="black" />
        </div>
      </div>

      <div className="flex flex-col items-center mt-10 lg:px-14 md:px-8 px-4">
        <p className="text-black text-lg opacity-70 mt-5 text-center">
          Please fill out this form. Our dedicated support team will reach out
          to you as soon as possible.
        </p>

        <div className="lg:w-1/2 md:w-3/4 w-full px-4 md:px-10 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center">
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

          <div className="mt-7 w-full">
            <label htmlFor="phone" className="text-black text-sm opacity-70">
              Country <span className="text-red-800 text-xs">*</span>
            </label>
            <button
              className="flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 w-full"
              onClick={() => setPickerOn(true)}
            >
              <span
                className={`text-black text-base ${
                  inputs.country === "" ? "opacity-50" : "opacity-100"
                }`}
              >
                {inputs.country === "" ? "Select a country" : inputs.country}
              </span>
              <IoMdArrowDropdown />
            </button>
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

          <div className="mt-5 w-full mb-10">
            <TitleText weight="bold" className="text-black text-xl mb-5 block">
              Quote Items
            </TitleText>

            {[...Array(2)].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-5"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    alt={"product name image"}
                    src={"/images/oakProductImg3.png"}
                    width={60}
                    height={60}
                    className="object-cover rounded-md"
                  />
                  <span className="text-base text-black">
                    Pipette Tips (Racked)
                  </span>
                </div>
                <button className="flex items-center space-x-2">
                  <MdDelete color="#FF0000" size={16} />
                  <span className="text-[#FF0000] text-base">Delete</span>
                </button>
              </div>
            ))}
          </div>

          <Button text="Submit Form" isDark handleClick={requestQuote} />
        </div>
      </div>

      <Faq />

      {isPickerOn && (
        <Picker
          title="Select a country"
          enableSearch
          options={[...locationData.map((item) => item.name)]}
          currentValue={inputs.country}
          updateValue={(p) => setInputs((prev) => ({ ...prev, position: p }))}
          close={() => setPickerOn(false)}
        />
      )}
    </main>
  );
};

export default RequestQuote;
