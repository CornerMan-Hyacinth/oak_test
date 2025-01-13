"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import CartCard from "@/components/CartCard";
import { OpErrorModal } from "@/components/ErrorModals";
import { CardLoading, LoadingModal } from "@/components/LazyLoading";
import Portal from "@/components/Portal";
import { NPCard } from "@/components/ProductCard";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartPage = () => {
  const router = useRouter();
  const prodRef = useRef<HTMLDivElement>(null);

  const [isFetching, setFetching] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [isFailed, setFailed] = useState<string>();

  const [cartData, setCartData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const scrollLeft = () => {
    if (prodRef.current) {
      prodRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (prodRef.current) {
      prodRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const editItemQuantity = async (
    id: string,
    quantity: number,
    index: number
  ) => {
    setProcessing(true);

    const cartItem = cartData[index];
    const amount = (quantity * cartItem.price).toFixed(2);

    try {
      const response = await axios.put("/api/cart", {
        id,
        data: { quantity, amount },
      });
      if (response.data.success) {
        const updatedCart = [...cartData];
        updatedCart[index] = { ...updatedCart[index], quantity, amount };
        setCartData(updatedCart);
      }
    } catch (error) {
      setFailed("Failed to update item's quantity.");
    } finally {
      setProcessing(false);
    }
  };

  const deleteItem = async (id: string, index: number) => {
    setProcessing(true);

    try {
      const response = await axios.delete(`/api/cart?id=${id}`);
      if (response.data.success) {
        const updatedCart = [...cartData];
        updatedCart.splice(index, 1);
        setCartData(updatedCart);
      }
    } catch (error) {
      setFailed("Failed to delete quote item.");
    } finally {
      setProcessing(false);
    }
  };

  const fetchCart = async () => {
    setFetching(true);

    try {
      const response = await axios.get("/api/cart?isCart=true");
      if (response.data.success) {
        const { carts, products } = response.data.data;
        let totalCartAmount = 0;
        carts.map((item: any) => (totalCartAmount += item.amount));

        setCartData(carts);
        setProductData(products);
        setSubtotal(totalCartAmount);
      }
    } catch (error) {
      setFailed("Failed to fetch cart.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main className="w-full pb-0">
      <div className="lg:px-14 md:px-8 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="My Cart" color="black" />
        </div>
      </div>

      <div className="lg:px-14 md:px-8 px-4 mt-10 mb-20">
        {isFetching ? (
          <div className="flex flex-col space-y-10 items-center">
            {[...Array(2)].map((_, index) => (
              <CardLoading key={index} className="w-1/2 h-[20vh]" />
            ))}
          </div>
        ) : cartData.length <= 0 ? (
          <div className="flex flex-col items-center">
            <MdOutlineRemoveShoppingCart color="rgba(0,0,0,.5)" size={80} />
            <BodyText weight="medium" className="text-black text-2xl mt-10">
              Your Cart is currently empty
            </BodyText>
            <Link
              href={"/shop"}
              className="px-10 py-3 rounded-sm bg-my-gray bg-opacity-0 text-sm text-black hover:bg-opacity-15 duration-300 ease-in-out mt-14"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {cartData.map((item, index) => (
              <CartCard
                key={index}
                item={item}
                editQuantity={(id, q) => editItemQuantity(id, q, index)}
                handleDelete={(id) => deleteItem(id, index)}
              />
            ))}

            <div className="mt-20 lg:w-1/2 md:w-2/3 w-4/5">
              <div className="flex items-center justify-between">
                <span className="text-base text-black opacity-70">
                  Subtotal
                </span>
                <BodyText weight="medium" className="text-base text-black">
                  $ {subtotal.toFixed(2)}
                </BodyText>
              </div>

              <div className="flex items-center justify-between mt-5">
                <span className="text-base text-black opacity-70">
                  Discount
                </span>
                <BodyText weight="medium" className="text-base text-black">
                  -$ {discount}
                </BodyText>
              </div>

              <hr
                className="w-full bg-black bg-opacity-30 my-5"
                style={{ height: "2px" }}
              />

              <div className="flex items-center justify-between mt-5">
                <span className="text-base text-black opacity-70">
                  Grand Total
                </span>
                <BodyText weight="bold" className="text-base text-my-blue">
                  $ {(subtotal - discount).toFixed(2)}
                </BodyText>
              </div>
            </div>

            <div className="mt-20">
              <Button
                text="Checkout Now"
                isDark
                handleClick={() => router.push("/cart/checkout")}
              />
            </div>
          </div>
        )}
      </div>

      {(isFetching || productData.length > 0) && (
        <div className="w-full mt-20 pb-20">
          <div className="lg:px-14 md:px-10 px-4 flex items-center justify-between">
            <div>
              <TitleComponent title="You might also like" color="black" />
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
                onClick={scrollLeft}
              >
                <IoChevronBack color="black" size={18} />
              </button>
              <button
                className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
                onClick={scrollRight}
              >
                <IoChevronForward color="black" />
              </button>
            </div>
          </div>

          <div
            ref={prodRef}
            className="w-full overflow-x-auto py-5 lg:px-14 md:px-10 px-4 hide-scrollbar"
          >
            <div className="flex space-x-4 min-w-max mt-5">
              {isFetching
                ? [...Array(4)].map((_, index) => (
                    <CardLoading key={index} className="w-[25vw] h-60" />
                  ))
                : productData.map((product, index) => (
                    <NPCard key={index} product={product} />
                  ))}
            </div>
          </div>
        </div>
      )}

      {isFailed && (
        <Portal>
          <OpErrorModal msg={isFailed} close={() => setFailed(undefined)} />
        </Portal>
      )}

      {isProcessing && (
        <Portal>
          <LoadingModal />
        </Portal>
      )}
    </main>
  );
};

export default CartPage;
