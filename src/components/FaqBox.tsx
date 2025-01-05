"use client";

import { useState } from "react";
import { TitleText } from "./Text";
import { IoChevronDown } from "react-icons/io5";

const FaqBox = ({ question, answer }: { question: string; answer: string }) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="w-full py-5 border-b border-black border-opacity-20">
      <div
        className="flex items-center justify-between mt-5 cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <TitleText weight="regular" className="text-black text-xl">
          {question}
        </TitleText>
        <span
          className={`transform duration-300 ease-in-out ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoChevronDown color="black" size={18} />
        </span>
      </div>
      {isExpanded && (
        <p className="text-black text-base opacity-70 mt-5">{answer}</p>
      )}
    </div>
  );
};

export default FaqBox;
