"use client";

import { useState } from "react";
import { BodyText } from "./Text";
import { CenterTitleComponent } from "./Title";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setFocused] = useState(false);

  return (
    <div className="w-full bg-my-blue rounded-t-3xl pt-20 pb-32 xl:px-14 lg:px-10 px-4 flex flex-col items-center">
      <CenterTitleComponent title="Sign up for our Newsletter" color="white" />

      <BodyText
        weight="medium"
        className="md:text-lg text-base text-white opacity-80 md:w-2/3 w-full text-center mt-8"
      >
        Signup to receive updates and stay connected with Us. Be the first to
        know about our latest product, offers and promotions.
      </BodyText>

      <div className="flex items-center justify-between space-x-4 md:px-7 px-4 h-14 rounded-md bg-white mt-16 lg:w-2/5 md:w-3/5 w-full">
        <input
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-[90%] text-black text-base outline-none bg-transparent"
        />
        <button
          className={`${
            email !== ""
              ? "hover:scale-110 hover:bg-opacity-100 hover:text-white"
              : "hover:cursor-not-allowed"
          } p-2 rounded-full bg-my-blue text-black bg-opacity-0 duration-300 ease-in-out`}
        >
          <HiOutlineArrowNarrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
