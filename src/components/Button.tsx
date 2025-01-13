"use client";

import Link from "next/link";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";

export const Button = ({
  isDark,
  isBig,
  text,
  notEnabled,
  handleClick,
}: {
  isDark: boolean;
  isBig?: boolean;
  notEnabled?: boolean;
  text: string;
  handleClick: () => void;
}) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <button
      className={`mt-8 rounded-md min-w-48 ${
        isBig ? "h-20" : "h-12"
      } px-14 flex items-center justify-center ${
        isDark
          ? "bg-my-gray text-white hover:bg-my-blue"
          : "bg-white text-black"
      } ${
        notEnabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer opacity-100"
      } duration-300 ease-in-out relative`}
      onMouseEnter={() => setHoveredOn(true)}
      onMouseLeave={() => setHoveredOn(false)}
      onClick={handleClick}
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`${isBig ? "text-base" : "text-sm"} ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {text}
        </span>
        {isHoveredOn && (
          <span className="absolute right-0 translate-x-7">
            <GoArrowRight size={20} color={`${isDark ? "white" : "black"}`} />
          </span>
        )}
      </div>
    </button>
  );
};

export const TextLink = ({
  text,
  isDark,
  link,
  className,
}: {
  text: string;
  isDark: boolean;
  link: string;
  className?: string;
}) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <Link href={link}>
      <div
        onMouseEnter={() => setHoveredOn(true)}
        onMouseLeave={() => setHoveredOn(false)}
      >
        <span
          className={`${isDark ? "text-black" : "text-my-blue"} ${className}`}
        >
          {text}
        </span>
        <div
          style={{ height: "0.07rem" }}
          className={`w-1/2 ${
            isHoveredOn ? "bg-my-blue" : "bg-transparent"
          } rounded-full mt-1`}
        />
      </div>
    </Link>
  );
};

export const TextButton = ({
  text,
  isDark,
  handleClick,
  className,
}: {
  text: string;
  isDark: boolean;
  handleClick: () => void;
  className?: string;
}) => {
  return (
    <div onClick={handleClick}>
      <div>
        <span
          className={`${isDark ? "text-black" : "text-my-blue"} ${className}`}
        >
          {text}
        </span>
        <span
          style={{ height: "0.15rem" }}
          className={`w-1/2 bg-my-blue rounded-full mt-1`}
        />
      </div>
    </div>
  );
};
