"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { BodyText, TitleText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowRoundForward, IoMdArrowDropdown } from "react-icons/io";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "",
    region: "",
    country: "",
  });
  const [shippingMethod, setShippingMethod] = useState("regular");
  const [orderItems, setOrderItems] = useState<any[]>(["", ""]);
  const [promoInput, setPromoInput] = useState("");

  const [isCountryPickerOn, setCountryPickerOpen] = useState(false);
  const [isRegionPickerOn, setRegionPickerOpen] = useState(false);

  const isBtnEnabled = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      zip,
      city,
      region,
      country,
    } = shippingAddress;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      street === "" ||
      zip === "" ||
      city === "" ||
      region === "" ||
      country === ""
    )
      return false;

    return true;
  };

  const handleInput = () => {};

  const handlePayment = async () => {
    if (!isBtnEnabled()) return null;
  };

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-8 px-4 pb-20">
      <Breadcrumb />
      <div className="flex flex-col items-center mt-5">
        <CenterTitleComponent isH1 title={"Checkout"} color="black" />
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-14">
        <form className="lg:w-3/5 md:w-4/5 w-full">
          <div className="flex items-center justify-between space-x-20 mb-10">
            <div className="flex-grow">
              <label htmlFor="firstName" className="text-black text-sm">
                First Name<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  value={shippingAddress.firstName}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex-grow">
              <label htmlFor="lastName" className="text-black text-sm">
                Last Name<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter first name"
                  value={shippingAddress.lastName}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-20 mb-10">
            <div className="flex-grow">
              <label htmlFor="email" className="text-black text-sm">
                Email Address<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  value={shippingAddress.email}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex-grow">
              <label htmlFor="phone" className="text-black text-sm">
                Phone/Mobile<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter first name"
                  value={shippingAddress.phone}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mb-10">
            <label htmlFor="street" className="text-black text-sm">
              Street<span className="text-red-600">*</span>
            </label>
            <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
              <input
                type="text"
                name="street"
                id="street"
                placeholder="Enter first name"
                value={shippingAddress.street}
                onChange={handleInput}
                className="flex-grow text-black text-base outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-20 mb-10">
            <div className="flex-grow">
              <label className="text-black text-sm">
                Country<span className="text-red-600">*</span>
              </label>
              <div
                className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2 cursor-pointer"
                onClick={() => setCountryPickerOpen(true)}
              >
                <span
                  className={`flex-grow text-black text-base ${
                    shippingAddress.country === ""
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  {shippingAddress.country === ""
                    ? "Select country"
                    : shippingAddress.country}
                </span>
                <IoMdArrowDropdown color="black" size={18} />
              </div>
            </div>

            <div className="flex-grow">
              <label htmlFor="region" className="text-black text-sm">
                Region<span className="text-red-600">*</span>
              </label>
              <div
                className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2 cursor-pointer"
                onClick={() => setRegionPickerOpen(true)}
              >
                <span
                  className={`flex-grow text-black text-base ${
                    shippingAddress.region === "" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {shippingAddress.region === ""
                    ? "Select region"
                    : shippingAddress.region}
                </span>
                <IoMdArrowDropdown color="black" size={18} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-20 mb-5">
            <div className="flex-grow">
              <label htmlFor="city" className="text-black text-sm">
                City<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter city"
                  value={shippingAddress.city}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex-grow">
              <label htmlFor="zip" className="text-black text-sm">
                Postal Code<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between space-x-4 border-b border-black border-opacity-40 focus-within:border-my-blue focus-within:border-opacity-100 mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="Enter postal code"
                  value={shippingAddress.zip}
                  onChange={handleInput}
                  className="flex-grow text-black text-base outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="lg:w-3/5 w-4/5 mt-10">
          <h2 className="text-black text-lg mb-5">
            <TitleText weight="regular">Shipping Method</TitleText>
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-4">
              <div
                className="w-3 h-3 rounded-full border border-my-blue flex items-center justify-center mt-2"
                onClick={() => setShippingMethod("regular")}
              >
                {shippingMethod === "regular" && (
                  <div className="h-2 w-2 bg-my-blue rounded-full" />
                )}
              </div>
              <div>
                <BodyText
                  weight="medium"
                  className="text-base text-black mb-1 block"
                >
                  Regular
                </BodyText>
                <span className="text-black text-sm opacity-70 block">
                  15-30 business days
                </span>
              </div>
            </div>

            <BodyText weight="regular" className="text-base text-black">
              $10
            </BodyText>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-start space-x-4">
              <div
                className="w-3 h-3 rounded-full border border-my-blue flex items-center justify-center mt-2"
                onClick={() => setShippingMethod("express")}
              >
                {shippingMethod === "express" && (
                  <div className="h-2 w-2 bg-my-blue rounded-full" />
                )}
              </div>
              <div>
                <BodyText
                  weight="medium"
                  className="text-base text-black block mb-1"
                >
                  Express
                </BodyText>
                <span className="text-black text-sm opacity-70 block">
                  7-15 business days
                </span>
              </div>
            </div>

            <BodyText weight="regular" className="text-base text-black">
              $20
            </BodyText>
          </div>
        </div>

        <div className="lg:w-3/5 w-4/5 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg mb-5">
              <TitleText weight="regular">Your Order</TitleText>
            </h2>
            <Link
              href={"/cart"}
              className="text-black hover:text-my-blue text-sm hover:underline duration-300 ease-in-out"
            >
              Edit
            </Link>
          </div>

          {orderItems.map((_, index) => (
            <div key={index} className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-md overflow-hidden relative border border-black border-opacity-50">
                  <Image
                    src={"/images/oakProductImg6.png"}
                    alt="product image"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-base text-black opacity-70">
                  Microcomputer Digital pH Meter
                </p>
              </div>

              <BodyText weight="regular" className="text-base text-black">
                $78
              </BodyText>
            </div>
          ))}
        </div>

        <div className="lg:w-3/5 w-4/5 mt-10">
          <div className="flex items-center justify-between border-2 space-x-4 border-black border-opacity-30 focus-within:border-my-blue px-4 h-12 rounded-full mb-1">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="text-black text-sm flex-grow outline-none bg-transparent"
            />
            <button className="h-6 w-6 flex items-center justify-center bg-transparent text-black hover:bg-my-blue hover:text-white rounded-full duration-300 ease-in-out">
              <IoIosArrowRoundForward size={20} />
            </button>
          </div>

          <BodyText weight="medium" className="text-xs">
            New Customer?{" "}
            <Link href={"/register"} className="text-my-blue hover:underline">
              Register
            </Link>
          </BodyText>
        </div>

        <div className="mt-14 lg:w-3/5 w-4/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-black text-base opacity-70">Subtotal</span>
            <BodyText weight="bold" className="text-base text-black">
              $560
            </BodyText>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-black text-base opacity-70">
              Promo Discount
            </span>
            <BodyText weight="bold" className="text-base text-red-700">
              - $60
            </BodyText>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-black text-base opacity-70">
              Shipping Fee
            </span>
            <BodyText weight="bold" className="text-base text-black">
              $138
            </BodyText>
          </div>
          <hr className="w-full bg-black bg-opacity-80 my-5" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-black text-base opacity-70">Total</span>
            <BodyText weight="bold" className="text-base text-black">
              $638
            </BodyText>
          </div>
        </div>

        <div className="mt-10">
          <Button
            text="Continue to Payment"
            isDark
            handleClick={handlePayment}
          />
        </div>
      </div>
    </main>
  );
};

export default Checkout;
