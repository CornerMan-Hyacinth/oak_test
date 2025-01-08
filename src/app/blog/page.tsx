"use client";

import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import { CardLoading } from "@/components/LazyLoading";
import { CenterTitleComponent } from "@/components/Title";
import { useEffect, useRef, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";

const BlogPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [sortedBlogs, setSortedBlogs] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("Latest");
  const [isSortOpen, setSortOpen] = useState(false);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Get products for the current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedBlogs.slice(startIndex, endIndex);
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

  useEffect(() => {
    const handleSort = () => {
      let result;

      switch (sort) {
        case "Latest":
          result = blogs.sort((a, b) => {
            const dateA = new Date(a.dateAdded).getTime();
            const dateB = new Date(b.dateAdded).getTime();

            return dateB - dateA;
          });

          setSortedBlogs(result);
          break;

        case "Earliest":
          result = blogs.sort((a, b) => {
            const dateA = new Date(a.dateAdded).getTime();
            const dateB = new Date(b.dateAdded).getTime();

            return dateA - dateB;
          });

          setSortedBlogs(result);
          break;

        case "A - Z":
          result = blogs.sort((a, b) => a.name.localCompare(b.name));
          setSortedBlogs(result);
          break;

        case "Z - A":
          result = blogs.sort((a, b) => b.name.localCompare(a.name));
          setSortedBlogs(result);
          break;

        default:
          break;
      }
    };

    handleSort();
  }, [sort, blogs]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {};
  }, []);

  return (
    <main className="w-full pb-20 lg:px-14 md:px-8 px-4">
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Blog Posts" color="black" />
        </div>
      </div>

      <div className="w-full mt-14">
        {/** Top product list */}
        <div className="flex items-start justify-between">
          {sortedBlogs.length > 0 ? (
            <span className="text-black text-base opacity-70">
              {sortedBlogs.length === 0
                ? 0
                : itemsPerPage * (currentPage - 1) + 1}{" "}
              to{" "}
              {itemsPerPage * currentPage > blogs.length
                ? blogs.length
                : itemsPerPage * currentPage}{" "}
              of {blogs.length}
            </span>
          ) : (
            <div />
          )}

          <div ref={ref} className="relative">
            <button
              className="min-w-32 h-10 px-4 rounded-md border border-black border-opacity-40 flex items-center justify-between"
              onClick={(e) => {
                e.stopPropagation();
                setSortOpen((prev) => !prev);
              }}
            >
              <span className="text-sm text-black">{sort}</span>
              <MdOutlineTune color="black" size={16} />
            </button>
            {isSortOpen && (
              <div className="flex flex-col items-start absolute bottom-0 w-full bg-white shadow-md shadow-gray-500 transform-all translate-y-full rounded-md z-20">
                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Latest"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => {
                    setSort("Latest");
                    setSortOpen(false);
                  }}
                >
                  Latest
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Earliest"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => {
                    setSort("Earliest");
                    setSortOpen(false);
                  }}
                >
                  Earliest
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "A - Z"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => {
                    setSort("A - Z");
                    setSortOpen(false);
                  }}
                >
                  A - Z
                </button>

                <button
                  className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                    sort === "Z - A"
                      ? "bg-opacity-30"
                      : "bg-opacity-0 hover:bg-opacity-20"
                  }`}
                  onClick={() => {
                    setSort("Z - A");
                    setSortOpen(false);
                  }}
                >
                  Z - A
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Display */}
        {isFetching || sortedBlogs.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10 justify-items-stretch">
              {isFetching
                ? [...Array(9)].map((_, index) => (
                    <CardLoading
                      key={index}
                      className="xl:w-[25vw] lg:w-[30vw] md:w-[35vw] w-full h-60"
                    />
                  ))
                : [...Array(5)].map((blog, index) => (
                    <BlogCard
                      key={index}
                      img="/images/blogImage.png"
                      title="Why Choose Oak Scientifics?"
                      desc="Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis."
                    />
                  ))}
            </div>
          </div>
        ) : (
          <div className="h-60 w-full flex flex-col justify-center items-center opacity-50">
            <FaRegFolderOpen color="black" size={60} />
            <p className="text-lg text-black mt-5">No blogs yet.</p>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-20 space-x-2">
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
      </div>
    </main>
  );
};

export default BlogPage;
