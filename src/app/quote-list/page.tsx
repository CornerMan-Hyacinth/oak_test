"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import CartCard from "@/components/CartCard";
import { OpErrorModal } from "@/components/ErrorModals";
import { CardLoading, LoadingModal } from "@/components/LazyLoading";
import Portal from "@/components/Portal";
import { NCard, NPCard } from "@/components/ProductCard";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const QuoteList = () => {
  const router = useRouter();
  const prodRef = useRef<HTMLDivElement>(null);

  const [isFetching, setFetching] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [quoteData, setQuoteData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [isFailed, setFailed] = useState<string>();

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

    const quoteItem = quoteData[index];
    const amount = (quantity * quoteItem.price).toFixed(2);

    try {
      const response = await axios.put("/api/cart", {
        id,
        data: { quantity, amount },
      });
      if (response.data.success) {
        const updatedQuotes = [...quoteData];
        updatedQuotes[index] = { ...updatedQuotes[index], quantity, amount };
        setQuoteData(updatedQuotes);
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

  const deleteAll = async () => {
    setProcessing(true);

    try {
      const response = await axios.delete(`/api/cart?isAll=yes`);
      if (response.data.success) {
        setQuoteData([]);
      }
    } catch (error) {
      setFailed("Failed to delete quote list.");
    } finally {
      setProcessing(false);
    }
  };

  const fetchQuotes = async () => {
    setFetching(true);

    try {
      const response = await axios.get("/api/cart");
      if (response.data.success) {
        const { carts, products } = response.data.data;
        setQuoteData(carts);
        setProductData(products);
      }
    } catch (error) {
      setFailed("Failed to fetch cart.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <main className="w-full pb-20">
      <div className="lg:px-14 md:px-10 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Quote List" color="black" />
        </div>
      </div>

      <div className="lg:px-14 md:px-10 px-4 mt-10 mb-20">
        {isFetching ? (
          <div className="flex flex-col space-y-10 items-center">
            {[...Array(2)].map((_, index) => (
              <CardLoading key={index} className="w-1/2 h-[20vh]" />
            ))}
          </div>
        ) : quoteData.length <= 0 ? (
          <div className="flex flex-col items-center">
            <MdOutlineRemoveShoppingCart color="rgba(0,0,0,.5)" size={80} />
            <BodyText weight="medium" className="text-black text-2xl mt-10">
              Your Quote List is currently empty
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
            {quoteData.map((item, index) => (
              <CartCard
                key={index}
                item={item}
                isQuote
                editQuantity={(id, q) => editItemQuantity(id, q, index)}
                handleDelete={(id) => deleteItem(id, index)}
              />
            ))}

            <div className="mt-7 xl:w-2/3 lg:w-3/4 w-full flex items-center justify-between">
              <Link
                href={"/shop"}
                className="text-base text-my-blue opacity-70 hover:opacity-100 hover:underline"
              >
                <BodyText weight="medium">Add more items to list</BodyText>
              </Link>
              <button
                className="text-base text-my-blue opacity-70 hover:opacity-100 hover:underline"
                onClick={deleteAll}
              >
                <BodyText weight="medium">Clear list</BodyText>
              </button>
            </div>

            <div className="mt-20">
              <Button
                text="Go to Request Quote"
                isDark
                handleClick={() => router.push("/quote-list/request-a-quote")}
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

export default QuoteList;
