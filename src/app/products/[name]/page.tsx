"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { NPCard } from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { BodyText, TitleText } from "@/components/Text";
import { TitleComponent } from "@/components/Title";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ReactStars from "react-stars";
import axios from "axios";
import { MdSearchOff } from "react-icons/md";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { LuRefreshCcw } from "react-icons/lu";
import { SingleLoading } from "@/components/LazyLoading";
import { productSample } from "@/lib/mockups";

const ProductPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [selectedImg, setSelectedImg] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState("features");
  const [product, setProduct] = useState<any>();
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [errorCode, setErrorCode] = useState<number>();

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const fetchProduct = async () => {
    setFetching(true);

    try {
      const productName = (await params).name;
      const response = await axios.get(`/api/product?name=${productName}`);
      const topResponse = await axios.get(`/api/product?top=${10}`);

      if (response.data.success) {
        if (!response.data.product) {
          setErrorCode(404);
          return;
        }
        setProduct(response.data.product);
      }

      if (topResponse.data.success) {
        setTopProducts(topResponse.data.products);
      }
    } catch (error) {
      setErrorCode(500);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params]);

  return (
    <main className="w-full ">
      <div className="lg:px-14 md:px-10 px-4 pb-10">
        <Breadcrumb />

        {isFetching ? (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="p-10 rounded-md bg-white">
              <SingleLoading />
            </div>
          </div>
        ) : productSample ? (
          <>
            <div className="flex items-start justify-between mt-14">
              <div className="w-2/5">
                <div className="w-full h-[70vh] rounded-3xl border border-black relative overflow-hidden">
                  <Image
                    alt="a product image"
                    src={"/images/oakProductImg4.png"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center space-x-4 mt-5">
                  {[...Array(3)].map((url: string, index: number) => (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-md border border-black relative overflow-hidden cursor-pointer ${
                        selectedImg === index ? "opacity-100" : "opacity-40"
                      }`}
                      onClick={() => setSelectedImg(index)}
                    >
                      <Image
                        alt="a product image"
                        src={"/images/oakProductImg4.png"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-2/5">
                <h1 className="text-black text-xl mb-3">
                  <TitleText weight="bold">{productSample.name}</TitleText>
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-1 w-1 rounded-full ${
                        productSample.availability.toLowerCase() === "in stock"
                          ? "bg-my-yellow"
                          : "bg-red-700"
                      }`}
                    />
                    <span
                      className={`text-base ${
                        productSample.availability.toLowerCase() === "in stock"
                          ? "text-my-yellow"
                          : "text-red-700"
                      }`}
                    >
                      {productSample.availability}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ReactStars
                      count={5}
                      value={productSample.reviews.averageRating}
                      size={20}
                      color1="#333333"
                      color2="#FFCE31"
                      edit={false}
                    />
                    <span className="text-black text-sm opacity-70">
                      {productSample.reviews.totalReviews} Reviews
                    </span>
                  </div>
                </div>

                <p className="text-sm text-my-blue mt-3">
                  <BodyText weight="medium" className="text-black">
                    Brand:{" "}
                  </BodyText>
                  {productSample.brand}
                </p>

                <p className="text-base text-black opacity-70 mt-3 leading-loose">
                  {productSample.description}
                </p>

                <div className="flex items-center justify-between mt-9">
                  <button className="bg-my-gray text-white h-12 px-10 text-sm rounded-md hover:bg-my-blue">
                    Add to cart
                  </button>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4 border border-black rounded-full py-2 px-4">
                      <button
                        className={`text-black hover:text-my-blue duration-300 ease-in-out ${
                          quantity === 1
                            ? "opacity-50 pointer-events-none"
                            : "opacity-100"
                        }`}
                        onClick={() =>
                          quantity !== 1 && setQuantity((prev) => --prev)
                        }
                      >
                        <FaMinus size={16} />
                      </button>
                      <span className="text-black text-sm">{quantity}</span>
                      <button
                        className={`text-black hover:text-my-blue duration-300 ease-in-out`}
                        onClick={() => setQuantity((prev) => ++prev)}
                      >
                        <FaPlus size={16} />
                      </button>
                    </div>

                    <BodyText weight="bold" className="text-lg text-my-blue">
                      ${(productSample.price * quantity).toFixed(2)}
                    </BodyText>
                  </div>
                </div>

                <p className="mt-6 text-black text-sm opacity-70">
                  SKU - {productSample.sku}
                </p>

                <div className="flex items-start space-x-4 mt-6">
                  <FaCalendarAlt size={20} color="black" />
                  <div className="flex flex-col space-y-2">
                    <span className="text-black text-sm">Delivery Period:</span>
                    <span className="text-black text-xs opacity-70">
                      15-21 working days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="flex items-center w-full border-b border-black border-opacity-10">
                {productSample.features.length > 0 && (
                  <button
                    className={`pb-3 w-52 border-b-2 outline-none ${
                      details === "features"
                        ? "border-my-blue opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => setDetails("features")}
                  >
                    <BodyText
                      weight={details === "features" ? "bold" : "regular"}
                    >
                      Features
                    </BodyText>
                  </button>
                )}

                {productSample.specifications.length > 0 && (
                  <button
                    className={`pb-3 w-52 border-b-2 outline-none ${
                      details === "specifications"
                        ? "border-my-blue opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => setDetails("specifications")}
                  >
                    <BodyText
                      weight={details === "specifications" ? "bold" : "regular"}
                    >
                      Specifications
                    </BodyText>
                  </button>
                )}

                {productSample.videos.length > 0 && (
                  <button
                    className={`pb-3 w-52 border-b-2 outline-none ${
                      details === "videos"
                        ? "border-my-blue opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => setDetails("videos")}
                  >
                    <BodyText
                      weight={details === "videos" ? "bold" : "regular"}
                    >
                      Videos
                    </BodyText>
                  </button>
                )}

                {productSample.models.length > 0 && (
                  <button
                    className={`pb-3 w-52 border-b-2 outline-none ${
                      details === "models"
                        ? "border-my-blue opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => setDetails("models")}
                  >
                    <BodyText
                      weight={details === "models" ? "bold" : "regular"}
                    >
                      Models
                    </BodyText>
                  </button>
                )}

                {productSample.catalogue && (
                  <button
                    className={`pb-3 w-52 border-b-2 outline-none ${
                      details === "catalogue"
                        ? "border-my-blue opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                    onClick={() => setDetails("catalogue")}
                  >
                    <BodyText
                      weight={details === "catalogue" ? "bold" : "regular"}
                    >
                      Catalogue
                    </BodyText>
                  </button>
                )}
              </div>

              <ProductDetails
                detailChoice={details}
                details={{
                  features: productSample.features,
                  specifications: productSample.specifications,
                  videos: productSample.videos,
                  models: productSample.models,
                  catalogue: productSample.catalogue,
                }}
              />
            </div>
          </>
        ) : errorCode === 404 ? (
          <div className="flex-grow min-h-72 flex flex-col justify-center items-center opacity-50">
            <MdSearchOff size={60} color="black" />
            <p className="text-lg text-black mt-5 w-1/5 text-center">
              This product does not exist or may have been removed.
            </p>
          </div>
        ) : (
          <div className="flex-grow min-h-72 flex flex-col justify-center items-center">
            <BiSolidMessageSquareError color="rgba(0,0,0,.5)" size={60} />
            <p className="text-lg md:text-xl text-black mt-5 mb-10 w-1/5 text-center opacity-50">
              An unexpected error occurred.
            </p>
            <button
              className="flex items-center justify-center space-x-4 rounded-lg px-10 py-3 bg-black hover:bg-my-blue duration-300 ease-in-out"
              onClick={fetchProduct}
            >
              <LuRefreshCcw size={18} color="white" />
              <span className="text-sm text-white">Refresh</span>
            </button>
          </div>
        )}
      </div>

      {topProducts.length > 0 && (
        <div className="mt-14 mb-20">
          <div className="lg:px-14 md:px-10 px-4 flex items-center justify-between">
            <TitleComponent title="You might also like" color="black" />

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
            ref={ref}
            className="w-full overflow-x-auto py-5 lg:px-14 md:px-10 px-4 scrollbar-hide mt-5"
          >
            <div className="flex space-x-4 min-w-max">
              {topProducts.map((product, index) => (
                <NPCard
                  key={index}
                  isSmall
                  product={{
                    name: product.name,
                    availabilty: product.availability,
                    avgRating: product.ratings.averageRating,
                    price: product.price,
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

export default ProductPage;
