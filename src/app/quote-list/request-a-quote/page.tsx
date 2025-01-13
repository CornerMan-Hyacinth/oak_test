"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { DeleteCartModal } from "@/components/CartCard";
import { Faq } from "@/components/Faq";
import { LoadingModal } from "@/components/LazyLoading";
import Picker from "@/components/Picker";
import Portal from "@/components/Portal";
import { TitleText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import { locationData } from "@/lib/locationData";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [quoteData, setQuoteData] = useState<any[]>([]);

  const [isPickerOn, setPickerOn] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [isFailed, setFailed] = useState<string>();
  const [isSucceeded, setSucceeded] = useState(false);

  const isBtnEnabled =
    inputs.firstName !== "" &&
    inputs.lastName !== "" &&
    inputs.email !== "" &&
    inputs.phone &&
    inputs.country !== "" &&
    inputs.message !== "";

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const deleteItem = async (id: string, index: number) => {
    setProcessing(true);

    try {
      const response = await axios.delete(`/api/cart?id=${id}`);
      if (response.data.success) {
        const updatedQuotes = [...quoteData];
        updatedQuotes.splice(index, 1);
        setQuoteData(updatedQuotes);
      }
    } catch (error) {
      setFailed("Failed to delete quote item.");
    } finally {
      setProcessing(false);
    }
  };

  const requestQuote = async () => {
    if (!isBtnEnabled) return;
    if (quoteData.length === 0) return;

    setProcessing(true);

    const items = quoteData.map((item) => {
      const {
        _id,
        customerId,
        guestId,
        isCart,
        createdAt,
        updatedAt,
        ...rest
      } = item;
      return rest;
    });

    try {
      const response = await axios.post("/api/quote", {
        data: {
          items,
          recipientName: inputs.firstName + " " + inputs.lastName,
          recipientPhone: inputs.phone,
          recipientEmail: inputs.email,
          recipientLocation: inputs.country,
          recipientMessage: inputs.message,
          requestDate: Date.now,
        },
      });

      if (response.data.success) setSucceeded(true);
    } catch (error) {
      setFailed("Failed to deliver your request for quote.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);

      try {
        const response = await axios.get("/api/cart");
        if (response.data.success) {
          const { carts } = response.data.data;
          setQuoteData(carts);
        }
      } catch (error) {
        setFailed("Failed to retrieve quote items.");
      } finally {
        setProcessing(false);
      }
    };

    fetchData();
  }, []);

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

            {quoteData.length > 0 ? (
              quoteData.map((item, index) => (
                <ItemWrapper
                  key={index}
                  item={item}
                  handleDelete={(id) => deleteItem(id, index)}
                />
              ))
            ) : (
              <div className="w-full mb-5 text-base text-black opacity-70">
                No quote item found.
              </div>
            )}
          </div>

          <Button
            text="Submit Form"
            isDark
            notEnabled={!isBtnEnabled}
            handleClick={requestQuote}
          />

          {!isFetching && quoteData.length === 0 && (
            <p className="text-[red] text-base mt-3">
              No product found in quote list. Go to{" "}
              <Link href={"/shop"} className="underline">
                Shop
              </Link>{" "}
              to add to quote.
            </p>
          )}
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

      {isProcessing && (
        <Portal>
          <LoadingModal />
        </Portal>
      )}
    </main>
  );
};

export default RequestQuote;

const ItemWrapper = ({
  item,
  handleDelete,
}: {
  item: any;
  handleDelete: (id: string) => void;
}) => {
  const [isDeleteClicked, setDeleteClicked] = useState(false);

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center space-x-4">
        <Image
          alt={`${item.productName} product`}
          src={item.imageUrl}
          width={60}
          height={60}
          className="object-cover rounded-md"
        />
        <span className="text-base text-black">{item.productName}</span>
      </div>
      <button
        className="flex items-center space-x-2"
        onClick={() => setDeleteClicked(true)}
      >
        <MdDelete color="#FF0000" size={16} />
        <span className="text-[#FF0000] text-base">Delete</span>
      </button>

      {isDeleteClicked && (
        <Portal>
          <DeleteCartModal
            name={item.productName}
            handleDelete={() => handleDelete(item._id)}
            close={() => setDeleteClicked(false)}
          />
        </Portal>
      )}
    </div>
  );
};
