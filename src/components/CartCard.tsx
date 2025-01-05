"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BodyText, TitleText } from "./Text";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import Portal from "./Portal";
import { FaMinus } from "react-icons/fa6";

const CartCard = ({
  item,
  isQuote,
  editQuantity,
  handleDelete,
}: {
  item: any;
  isQuote?: boolean;
  editQuantity: (id: number, q: number) => void;
  handleDelete: (id: number) => void;
}) => {
  const [isDeleteClicked, setDeleteClicked] = useState(false);

  return (
    <div className="flex items-center justify-between xl:w-2/3 lg:w-3/4 w-full space-x-20 py-10 border-b border-black border-opacity-30">
      <div className="md:w-[25vw] flex-grow flex items-center md:space-x-8 space-x-4">
        <div className="h-14 w-14 rounded-lg overflow-hidden relative border border-black border-opacity-50">
          <Image
            alt={`${item.name} product image`}
            src={item.imageUrl}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <TitleText weight="bold" className="md:text-xl text-lg text-black">
            {item.name}
          </TitleText>
          <span
            className={`${
              isQuote ? "hidden" : "block md:hidden"
            } text-black text-base mt-2 opacity-70`}
          >
            $ {item.price}
          </span>
        </div>
      </div>

      <div
        className={`${
          isQuote ? "md:flex hidden" : "flex"
        } flex-col items-center mr-32`}
      >
        <div
          className={`flex items-center space-x-6 px-4 py-1 rounded-full border border-black border-opacity-30`}
        >
          <button
            className={`${
              item.quantity === 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100"
            }`}
            onClick={() =>
              item.quantity > 1 && editQuantity(item._id, item.quantity - 1)
            }
          >
            <FaMinus color="black" size={16} />
          </button>
          <BodyText weight="bold" className="text-lg text-black">
            {item.quantity}
          </BodyText>
          <button onClick={() => editQuantity(item._id, item.quantity + 1)}>
            <LuPlus color="black" size={16} />
          </button>
        </div>

        {!isQuote && (
          <button
            className={`flex items-center space-x-2 mt-3`}
            onClick={() => setDeleteClicked(true)}
          >
            <MdDelete color="red" size={16} />
            <span className="text-[#FF0000] md:text-lg text-base">Delete</span>
          </button>
        )}
      </div>

      {!isQuote ? (
        <span className="text-black text-xl hidden md:block">
          $ {item.price}
        </span>
      ) : (
        <div className="flex flex-col items-end">
          <div className="md:hidden flex mb-3 items-center space-x-6 px-4 py-1 rounded-full border border-black border-opacity-30">
            <button
              className={`${
                item.quantity === 1
                  ? "opacity-30 cursor-not-allowed"
                  : "opacity-100"
              }`}
              onClick={() =>
                item.quantity > 1 && editQuantity(item._id, item.quantity - 1)
              }
            >
              <FaMinus color="black" size={16} />
            </button>
            <BodyText weight="bold" className="text-lg text-black">
              {item.quantity}
            </BodyText>
            <button onClick={() => editQuantity(item._id, item.quantity + 1)}>
              <LuPlus color="black" size={16} />
            </button>
          </div>

          <button
            className={`flex items-center space-x-2`}
            onClick={() => setDeleteClicked(true)}
          >
            <MdDelete color="red" size={16} />
            <span className="text-[#FF0000] md:text-lg text-base">Delete</span>
          </button>
        </div>
      )}

      {isDeleteClicked && (
        <Portal>
          <DeleteCartModal
            name={item.name}
            handleDelete={() => handleDelete(item._id)}
            close={() => setDeleteClicked(false)}
          />
        </Portal>
      )}
    </div>
  );
};

export default CartCard;

export const DeleteCartModal = ({
  name,
  handleDelete,
  close,
}: {
  name: string;
  handleDelete: () => void;
  close: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="xl:w-[30vw] lg:w-[35vw] md:w-[50vw] w-[90vw] py-5 px-4 rounded-lg bg-white">
        <div className="flex items-center justify-between space-x-4">
          <TitleText weight="bold" className="text-black text-xl">
            Remove {name} from cart?
          </TitleText>
        </div>
        <p className="text-black text-base opacity-70 mt-2">
          This operation is irreversible.
        </p>

        <div className="flex items-center justify-between mt-7">
          <button
            className="w-32 py-2 rounded-md bg-black text-white text-base"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="w-32 py-2 rounded-md bg-my-blue text-white text-base"
            onClick={() => {
              handleDelete();
              close();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditCartModal = ({
  currentQuantity,
  handleEdit,
  close,
}: {
  currentQuantity: number;
  handleEdit: (q: number) => void;
  close: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(currentQuantity);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-[30vw] py-5 px-4 rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <TitleText weight="bold" className="text-my-blue text-2xl">
            Edit quantity
          </TitleText>
          <button
            className="hover:scale-110 duration-300 ease-in-out"
            onClick={close}
          >
            <GrClose color="red" size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-5 mt-10">
          <button
            className={`${
              quantity === 0 ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setQuantity((prev) => --prev)}
          >
            <FaMinus color="black" size={20} />
          </button>
          <div className="px-3 py-1 rounded-md border border-black text-black text-xl">
            {quantity}
          </div>
          <button
            className={`${
              quantity === 0 ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setQuantity((prev) => ++prev)}
          >
            <LuPlus color="black" size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-7">
          <button
            className="w-32 py-2 rounded-md bg-black text-white text-base"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="w-32 py-2 rounded-md bg-my-blue text-white text-base"
            onClick={() => handleEdit(quantity)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
