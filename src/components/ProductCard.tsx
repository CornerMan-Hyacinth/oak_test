"use client";

import Image from "next/image";
import { TitleText } from "./Text";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { DetailsModal } from "./Modals";
import { FaEye, FaMagnifyingGlassArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { productSample } from "@/lib/mockups";

export const NCard = ({ product }: { product: any }) => {
  return (
    <div className="md:w-[25vw] w-full p-4 rounded-lg hover:shadow-md hover:shadow-gray-600 duration-300 ease-in-out">
      <div className="w-full h-48 rounded-lg overflow-hidden relative">
        <Image
          alt={`${productSample.name} product image`}
          src={"/images/oakProductImg3.png"}
          fill
          className="object-top"
        />
      </div>

      <TitleText weight="bold" className="line-clamp-2 h-14 mt-2">
        {productSample.name}
      </TitleText>
      <hr className="border border-black border-opacity-20 my-4" />
      <button className="bg-my-gray text-sm py-3 text-white rounded-md w-full flex items-center justify-center hover:bg-my-blue duration-300 ease-in-out">
        Add to quote
      </button>
    </div>
  );
};

export const NPCard = ({
  product,
  isSmall,
}: {
  product: any;
  isSmall?: boolean;
}) => {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <div
      className={`${
        isSmall
          ? "lg:w-[20vw] md:w-[27vw] w-[85vw]"
          : "xl:w-[25vw] lg:w-[30vw] md:w-[35vw] w-full"
      } pb-4 rounded-lg hover:shadow-lg hover:shadow-gray-600 duration-300 ease-in-out overflow-hidden`}
      onMouseEnter={() => setHoveredOn(true)}
      onMouseLeave={() => setHoveredOn(false)}
    >
      <div
        className={`w-full ${
          isSmall ? "lg:h-52 md:h-44 h-52" : "lg:h-80 h-60"
        } overflow-hidden ${
          isHoveredOn ? "rounded-t-lg" : "rounded-lg"
        } relative transition-all duration-300`}
      >
        <Image
          alt={`${productSample.name} product image`}
          src={"/images/oakProductImg3.png"}
          fill
          className="object-cover"
        />

        <div
          className={`absolute w-full h-full bg-black bg-opacity-70 flex items-center justify-center space-x-14 ${
            isHoveredOn ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-500 ease-in-out`}
        >
          <div
            className="p-4 rounded-full bg-my-blue bg-opacity-60 hover:bg-opacity-90 text-white duration-300 ease-in-out cursor-pointer relative group"
            onClick={() => setDetailsOpen(true)}
          >
            <FaEye size={24} />
            <div className="absolute -translate-x-1/3 -bottom-10 hidden group-hover:block bg-white text-my-gray text-sm px-2 py-1 rounded shadow text-nowrap">
              Quick details
            </div>
          </div>
          <Link
            href={`/products/${productSample.name}`}
            className="p-4 rounded-full bg-my-blue bg-opacity-60 hover:bg-opacity-90 text-white duration-300 ease-in-out relative group"
          >
            <FaMagnifyingGlassArrowRight size={24} />
            <div className="absolute -translate-x-1/3 -bottom-10 hidden group-hover:block bg-white text-my-gray text-sm px-2 py-1 rounded shadow text-nowrap">
              Read more
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-start justify-between border-b border-black border-opacity-20 mt-4 pb-4 lg:px-4 px-2">
        <div>
          <p
            className={`text-my-gray ${
              isSmall ? "lg:text-lg text-base" : "text-xl"
            } line-clamp-1`}
          >
            <TitleText weight="bold">{productSample.name}</TitleText>
          </p>
          {!isSmall && (
            <div className={`mt-1 flex items-center`}>
              <div className={`h-1 w-1 rounded-full mr-1 bg-my-yellow`} />
              <span
                className={`lg:text-base text-sm ${
                  productSample.availability === "In stock"
                    ? "text-my-yellow"
                    : "text-red-600"
                }`}
              >
                {productSample.availability}
              </span>
            </div>
          )}
        </div>

        {!isSmall && (
          <div className="flex items-center space-x-1">
            <IoIosStar color="#FFCE31" size={18} />
            <span className="text-black lg:text-base text-sm opacity-70">
              {productSample.reviews.averageRating}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 lg:px-4 px-2">
        <span className="text-my-blue lg:text-lg text-base">
          $ {productSample.price}
        </span>
        <button className="bg-my-gray text-xs text-white rounded-md py-3 lg:px-7 px-3 hover:bg-my-blue duration-300 ease-in-out">
          {productSample.price > 999 ? "Add to quote" : "Add to cart"}
        </button>
      </div>

      {isDetailsOpen && (
        <DetailsModal
          product={productSample}
          close={() => setDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export const NPDCard = ({ product }: { product: any }) => {
  return (
    <div className="md:w-[35vw] w-full pt-4 pb-7 px-4 flex items-center space-x-4 rounded-lg bg-white hover:shadow-md hover:shadow-black duration-300 ease-in-out relative">
      <div className="min-h-40 h-full w-2/5 rounded-lg overflow-hidden relative">
        <Image
          alt={`${productSample.name} product image`}
          src={"/images/oakProductImg1.png"}
          className="object-cover"
        />
      </div>
      <div className="w-3/5">
        <p className="text-black text-xs opacity-70 mb-1">
          {productSample.category}
        </p>
        <p className="text-my-gray text-xl">
          <TitleText weight="bold">{productSample.name}</TitleText>
        </p>
        <p className="text-black opacity-70 mt-2 leading-relaxed text-sm text-justify line-clamp-4">
          {productSample.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-my-blue text-lg">$ {productSample.price}</span>
          <button className="bg-my-gray text-xs text-white rounded-md py-3 px-7 hover:bg-my-blue duration-300 ease-in-out">
            View Product
          </button>
        </div>
      </div>

      <hr className="absolute bottom-0 w-60 border border-black border-opacity-10" />
    </div>
  );
};
