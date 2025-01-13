"use client";

import React, { useEffect, useRef, useState } from "react";
import { NPCard } from "./ProductCard";
import { MdOutlineTune } from "react-icons/md";
import { CardLoading } from "./LazyLoading";
import { FaChevronUp, FaRegFolderOpen } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import Portal from "./Portal";
import { BrandFilterModal, PriceFilterModal } from "./Filter";
import { useSearchParams } from "next/navigation";
import { TitleText } from "./Text";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { IoFilter } from "react-icons/io5";

const PaginatedProducts = ({
  isFetching,
  isResult,
  products,
  itemsPerPage = 9,
  noBrandFilter,
}: {
  isFetching: boolean;
  isResult?: boolean;
  products: any[];
  itemsPerPage: number;
  noBrandFilter?: boolean;
}) => {
  const searchParams = useSearchParams();

  const sortRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const { elementRef, isAboveThreshold } = useScrollPosition(100);

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("Newest");
  const [isSortOpen, setSortOpen] = useState(false);
  const [fileredProducts, setFilteredProducts] = useState<any[]>([]);

  const [isBrandFilterOpen, setBrandFilterOpen] = useState(false);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get products for the current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return fileredProducts.slice(startIndex, endIndex);
  };

  // Generate pagination range
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const delta = 2; // Number of visible neighbors around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show current page neighbors
      ) {
        range.push(i);
      } else if (
        (i === currentPage - delta - 1 || i === currentPage + delta + 1) &&
        !range.includes("...")
      ) {
        range.push("...");
      }
    }

    return range;
  };

  // Change page
  const changePage = (page: any) => {
    if (typeof page === "number" && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const scrollShopToTop = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortSelect = (s: string) => {
    setSort(s);
    setSortOpen(false);
  };

  const sortProducts = (data: any[]) => {
    let result;

    switch (sort) {
      case "Newest":
        result = data.sort((a, b) => {
          const dateA = new Date(a.dateAdded).getTime();
          const dateB = new Date(b.dateAdded).getTime();

          return dateB - dateA;
        });

        return result;

      case "Oldest":
        result = data.sort((a, b) => {
          const dateA = new Date(a.dateAdded).getTime();
          const dateB = new Date(b.dateAdded).getTime();

          return dateA - dateB;
        });

        return result;

      case "A - Z":
        result = data.sort((a, b) => a.name.localCompare(b.name));
        return result;

      case "Z - A":
        result = data.sort((a, b) => b.name.localCompare(a.name));
        return result;

      default:
        break;
    }
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];

      // Handle price range filter
      const priceRange = searchParams.get("priceRange");
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        filtered = filtered.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }

      // Handle brand filter
      const brand = searchParams.get("brand");
      if (brand && brand !== "all") {
        const brandArray = brand.split(",");

        filtered = filtered.filter((product) =>
          brandArray.map(
            (brand) => brand.toLowerCase() === product.brand.toLowerCase()
          )
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchParams, products]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={elementRef} className="lg:w-[65vw] w-full relative">
      {/** Top product list */}
      <div
        ref={topRef}
        className="flex lg:items-start items-center justify-between"
      >
        <TitleText weight="bold" className="text-black text-lg">
          Page {currentPage} of {totalPages}
        </TitleText>

        <div className="flex items-center space-x-6">
          <button
            className="min-w-32 h-10 px-4 rounded-md bg-my-gray bg-opacity-30 hidden md:flex items-center justify-between lg:hidden"
            onClick={() => setPriceFilterOpen(true)}
          >
            <span className="text-sm text-black">Price</span>
            <IoMdArrowDropdown color="black" size={16} />
          </button>

          {!noBrandFilter && (
            <button
              className="min-w-32 h-10 px-4 rounded-md bg-my-gray bg-opacity-30 hidden md:flex items-center justify-between lg:hidden"
              onClick={() => setBrandFilterOpen(true)}
            >
              <span className="text-sm text-black">Brands</span>
              <IoMdArrowDropdown color="black" size={16} />
            </button>
          )}

          <div ref={sortRef} className="relative">
            <button
              className="min-w-32 h-10 px-4 rounded-md bg-my-gray border border-black border-opacity-40 flex items-center justify-between"
              onClick={(e) => {
                e.stopPropagation();
                setSortOpen((prev) => !prev);
              }}
            >
              <span className="text-sm text-white">Sort</span>
              <MdOutlineTune color="white" size={16} />
            </button>
            {isSortOpen && (
              <div className="flex flex-col items-start absolute bottom-0 w-full bg-white shadow-md shadow-gray-500 transform-all translate-y-full rounded-md z-20">
                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Newest"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => handleSortSelect("Newest")}
                >
                  Newest
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Oldest"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => handleSortSelect("Oldest")}
                >
                  Oldest
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "A - Z"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => handleSortSelect("A - Z")}
                >
                  A - Z
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Z - A"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => handleSortSelect("Z - A")}
                >
                  Z - A
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Display */}
      {isFetching || fileredProducts.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-y-10 gap-x-5 mt-10 justify-items-stretch">
            {isFetching
              ? [...Array(9)].map((_, index) => (
                  <CardLoading
                    key={index}
                    className="lg:w-[20vw] md:w-[27vw] w-[85vw] h-60"
                  />
                ))
              : getCurrentPageProducts().map((product, index) => (
                  <NPCard key={index} isSmall product={product} />
                )) || <div />}
          </div>
        </div>
      ) : (
        <div className="h-60 w-full flex flex-col justify-center items-center opacity-50">
          <FaRegFolderOpen color="black" size={60} />
          <p className="text-lg text-black mt-5">
            No {isResult ? "result" : "product"} found.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-20 mb-10 space-x-2">
        {/* Page Numbers */}
        {getPaginationRange().map((page, index) => (
          <button
            key={index}
            className={`h-12 w-12 border rounded-full ${
              page === currentPage
                ? "border-my-blue text-my-blue"
                : "border-transparent text-black"
            } ${page === "..." ? "cursor-default" : ""}`}
            onClick={() => changePage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="sticky bottom-10 inset-x-0 mx-auto flex items-center space-x-4 bg-my-gray rounded-full h-14 px-8 w-fit md:hidden">
        <div className="flex items-center space-x-2 opacity-70">
          <IoFilter color="white" size={18} />
          <span className="text-white text-base">Filter by</span>
        </div>

        <div className="h-4 bg-white bg-opacity-20" style={{ width: "2px" }} />

        <button
          className="text-white text-base"
          onClick={() => setPriceFilterOpen(true)}
        >
          Price Range
        </button>

        <div className="h-4 bg-white bg-opacity-20" style={{ width: "2px" }} />

        <button
          className="text-white text-base"
          onClick={() => setBrandFilterOpen(true)}
        >
          Brand
        </button>
      </div>

      {isAboveThreshold && (
        <Portal>
          <button
            className="fixed z-50 bottom-10 right-10 h-10 w-10 flex justify-center items-center rounded-full bg-black bg-opacity-70 cursor-pointer"
            onScroll={scrollShopToTop}
          >
            <FaChevronUp color="white" size={20} />
          </button>
        </Portal>
      )}

      {isBrandFilterOpen && (
        <Portal>
          <BrandFilterModal close={() => setBrandFilterOpen(false)} />
        </Portal>
      )}

      {isPriceFilterOpen && (
        <Portal>
          <PriceFilterModal close={() => setPriceFilterOpen(false)} />
        </Portal>
      )}
    </div>
  );
};

export default PaginatedProducts;
