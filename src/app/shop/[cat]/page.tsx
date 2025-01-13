"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { CardLoading } from "@/components/LazyLoading";
import { NPCard } from "@/components/ProductCard";
import SubCat from "@/components/SubCatLists";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Category = ({ params }: { params: Promise<{ cat: string }> }) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [isErrorModalOn, setErrorModalOn] = useState(false);

  const scrollLeft = () => {
    if (topRef.current) {
      topRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (topRef.current) {
      topRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const fetchTopProducts = async () => {
    setFetching(true);

    try {
      const response = await axios.get("/api/product?top=10");
      response.data.success && setData(response.data.products);
    } catch (error) {
      setErrorModalOn(false);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const getParam = async () => {
      const { cat } = await params;
      setCategory(decodeURIComponent(cat));
    };

    getParam();
  }, [params]);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <main className="w-full pb-20">
      <div className="lg:px-14 md:px-8 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent
            isH1
            title={decodeURIComponent(
              category.charAt(0).toUpperCase() + category.slice(1)
            )}
            color="black"
          />
        </div>
      </div>

      <div className="mt-10 lg:px-14 md:px-8 px-4 flex justify-center items-center space-x-10">
        {category ? (
          <SubCat category={category} />
        ) : (
          [...Array(5)].map((_, index) => (
            <CardLoading key={index} className="w-52 h-44 px-5" />
          ))
        )}
      </div>

      {(isFetching || data.length > 0) && (
        <div className="mt-20">
          <div className="lg:px-14 md:px-8 px-4 flex items-center justify-between">
            <TitleComponent title="Top Sellers" color="black" />

            <div className="hidden md:flex items-center space-x-4">
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
            ref={topRef}
            className="w-full overflow-x-auto py-5 lg:px-14 md:px-10 px-4 hide-scrollbar mt-5"
          >
            <div className="flex space-x-4 min-w-max">
              {isFetching
                ? [...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <CardLoading className="lg:w-[20vw] md:w-[27vw] w-[85vw] h-52" />
                    </div>
                  ))
                : data.map((product, index) => (
                    <NPCard key={index} isSmall product={product} />
                  ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Category;
