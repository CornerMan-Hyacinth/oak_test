"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import Picker from "@/components/Picker";
import { CenterTitleComponent } from "@/components/Title";
import { positionData } from "@/lib/positionData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Apply = () => {
  const searchParams = useSearchParams();
  const position = searchParams.get("position");

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    file: "",
    message: "",
  });
  const [isPickerOn, setPickerOn] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const enableBtn =
    inputs.firstName !== "" &&
    inputs.lastName !== "" &&
    inputs.email !== "" &&
    inputs.phone !== "" &&
    inputs.position !== "" &&
    inputs.file !== "" &&
    inputs.message !== "";

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = async () => {};

  useEffect(() => {
    if (position) {
      setInputs((prev) => ({ ...prev, position }));
    }
  }, [position]);

  return (
    <main className="w-full pb-20">
      <div className="lg:px-14 md:px-8 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Apply" color="black" />
        </div>
      </div>

      <div className="flex flex-col items-center mt-10 lg:px-14 md:px-8 px-4">
        <div className="xl:w-1/2 md:w-2/3 w-full md:px-10 px-4 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center">
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
              Position <span className="text-red-800 text-xs">*</span>
            </label>
            <button
              className="flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 w-full"
              onClick={() => setPickerOn(true)}
            >
              <span
                className={`text-black text-base ${
                  inputs.position === "" ? "opacity-50" : "opacity-100"
                }`}
              >
                {inputs.position === "" ? "Select a position" : inputs.position}
              </span>
              <IoMdArrowDropdown />
            </button>
          </div>

          <div className="mt-7 w-full">
            <span className="text-black text-sm opacity-70">
              Upload CV/Resume <span className="text-red-800 text-xs">*</span>
            </span>
            <div className="flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30">
              <span className={`text-black text-base opacity-50`}>
                No file chosen
              </span>
              <button className="py-1 px-3 rounded-full border border-black text-black text-sm opacity-50 hover:opacity-100 hover:bg-black hover:text-white duration-300 ease-in-out">
                Choose File
              </button>
            </div>
          </div>

          <div className="mt-7 w-full mb-5">
            <label htmlFor="email" className="text-black text-sm opacity-70">
              Additional Info <span className="text-red-800 text-xs">*</span>
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

          <div
            className={`${
              enableBtn
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <Button text="Send Message" isDark handleClick={sendMessage} />
          </div>
        </div>
      </div>

      {isPickerOn && (
        <Picker
          title="Select a position"
          options={[...positionData.map((item) => item.position)]}
          currentValue={inputs.position}
          updateValue={(p) => setInputs((prev) => ({ ...prev, position: p }))}
          close={() => setPickerOn(false)}
        />
      )}
    </main>
  );
};

export default Apply;
