"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import CartCard from "@/components/CartCard";
import { CardLoading } from "@/components/LazyLoading";
import { NCard, NPCard } from "@/components/ProductCard";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartPage = () => {
  const router = useRouter();
  const prodRef = useRef<HTMLDivElement>(null);

  const [isFetching, setFetching] = useState(false);
  const [cartData, setCartData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);

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

  const editItemQuantity = async (id: number, quantity: number) => {};

  const deleteItem = async (id: number) => {};

  const fetchCart = async () => {};

  const fetchProducts = async () => {};

  useEffect(() => {
    // setFetching(true);
    fetchCart();
    fetchProducts();
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
        ) : cartData.length > 0 ? (
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
            <CartCard
              item={{
                name: "Pipette Tips (Racked)",
                imageUrl: "/images/oakProductImg4.png",
                quantity: 1,
                price: 29.99,
              }}
              editQuantity={editItemQuantity}
              handleDelete={deleteItem}
            />
            <CartCard
              item={{
                name: "Microcomputer Digital pH Meter",
                imageUrl: "/images/oakProductImg2.png",
                quantity: 2,
                price: 409.99,
              }}
              editQuantity={editItemQuantity}
              handleDelete={deleteItem}
            />

            <div className="mt-20 lg:w-1/2 md:w-2/3 w-4/5">
              <div className="flex items-center justify-between">
                <span className="text-base text-black opacity-70">
                  Subtotal
                </span>
                <BodyText weight="medium" className="text-base text-black">
                  $ 439.98
                </BodyText>
              </div>

              <div className="flex items-center justify-between mt-5">
                <span className="text-base text-black opacity-70">
                  Discount
                </span>
                <BodyText weight="medium" className="text-base text-black">
                  -$ 0
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
                  $ 439.98
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

      {(isFetching || productData.length === 0) && (
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
                : [...Array(5)].map((product, index) => (
                    <NPCard
                      key={index}
                      product={{
                        name: "Absograph 500",
                        availabilty: "In stock",
                        avgRating: 4.3,
                        price: 1420,
                      }}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
