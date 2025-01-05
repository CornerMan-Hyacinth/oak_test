"use client";

import { useToast } from "@/contexts/ToastContext";
import { BiSolidErrorAlt } from "react-icons/bi";
import { TitleText } from "./Text";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TextButton } from "./Button";

export const Toast = () => {
  const { message, success, setMsg } = useToast();

  if (message) {
    return (
      <div className="fixed w-80 bottom-10 md:bottom-10 right-4 md:right-10 lg:right-14 bg-my-gray px-4 py-6 rounded-lg shadow-md shadow-[rgba(255,255,255,.5)] flex items-start space-x-4">
        {success ? (
          <IoCheckmarkCircle color="#0f81b0" size={30} />
        ) : (
          <BiSolidErrorAlt color="#FF0000" size={30} />
        )}
        <div className="flex flex-col">
          <TitleText weight="bold" className="text-xl text-white">
            {success ? "Success" : "Error"}
          </TitleText>
          <p className="text-base text-white mt-2 opacity-70">{message}</p>
          <button
            className="text-white text-base self-end mt-4 hover:underline hover:scale-110 duration-300 ease-in-out"
            onClick={() => setMsg(null, false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};
