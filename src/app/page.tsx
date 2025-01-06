"use client";

import Image from "next/image";
import { BodyText, TitleText } from "@/components/Text";
import { useEffect, useRef, useState } from "react";
import { Button, TextLink } from "@/components/Button";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import { FaHandshakeSimple } from "react-icons/fa6";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { MdOutlineEngineering } from "react-icons/md";
import { NCard, NPCard, NPDCard } from "@/components/ProductCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CardLoading } from "@/components/LazyLoading";
import BlogCard from "@/components/BlogCard";
import { Faq } from "@/components/Faq";

export default function Home() {
  const router = useRouter();
  const featuredRef = useRef<HTMLDivElement>(null);

  const [slider, setSlider] = useState(0);

  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [agricProducts, setAgricProducts] = useState<any[]>([]);
  const [labProducts, setLabProducts] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProucts] = useState<any[]>([]);

  const [isFetching, setFetching] = useState(false);
  const [isErrorSet, setErrorSet] = useState(false);

  const scrollLeft = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const fetchData = async () => {
    setFetching(true);

    try {
      const topResponse = await axios.get(`/api/product?top=${4}`);
      const agricResponse = await axios.get("/api/product?cat=agric");
      const labResponse = await axios.get("/api/product?cat=lab");
      const featuredResponse = await axios.get("/api/product?featured=yes");

      if (topResponse.data.success) setTopProducts(topResponse.data.products);
      if (agricResponse.data.success)
        setAgricProducts(agricResponse.data.products);
      if (labResponse.data.success) setLabProducts(labResponse.data.products);
      if (featuredResponse.data.success)
        setFeaturedProucts(featuredResponse.data.products);
    } catch (error) {
      setErrorSet(true);
    }
  };

  useEffect(() => {}, []);

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-white">
      {/** Top Slider */}
      <div className="w-full h-[80vh] relative">
        <div className="w-full h-full relative">
          <Image
            alt="Electrolyte Analyzer image"
            src={"/images/electrolyteImg.png"}
            fill
            className="object-cover"
          />
          <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center absolute">
            <h1 className="text-white lg:text-5xl md:text-4xl text-3xl mb-10">
              <TitleText weight="regular">Electrolyte Analyzer e|1</TitleText>
            </h1>
            <p className="text-white lg:text-3xl md:text-2xl text-xl lg:w-1/2 md:w-2/3 text-center opacity-90 mb-10">
              <TitleText weight="light">
                Electrolyte system for invitro measurements with high accuracy
                and ease of use.
              </TitleText>
            </p>
            <Button
              text="Request a Quote"
              isDark
              isBig
              handleClick={() => {}}
            />
          </div>
        </div>

        <div className="absolute lg:top-14 md:top-8 top-4 lg:right-20 md:right-10 right-4 bg-my-blue h-24 w-24 flex items-center justify-center rounded-full bg-opacity-60">
          <BodyText weight="regular" className="text-center text-sm text-white">
            Best
            <br />
            Selling
          </BodyText>
        </div>

        <div className="absolute bottom-10 md:right-10 right-4 flex items-center space-x-3">
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              onClick={() => setSlider(index)}
              className={`h-3 w-3 rounded-full border border-my-gray ${
                slider === index
                  ? "bg-white opacity-100"
                  : "bg-my-gray opacity-50"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/** Categories */}
      <CatWrapper />

      <div className="w-full pt-10 md:pb-20 pb-14 lg:px-14 md:px-8 px-4 flex flex-col md:flex-row items-center justify-center lg:space-x-48 md:space-x-16">
        <div className="relative mb-10 md:mb-0">
          <div className="lg:w-[35vw] md:w-[45vw] w-[85vw] md:h-[70vh] h-[50vh] relative">
            <div className="absolute w-full h-full rounded-2xl transition-transform lg:-translate-x-8 -translate-x-4 lg:-translate-y-8 -translate-y-4 bg-my-blue bg-opacity-60" />

            <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-md shadow-black">
              <Image
                alt="a man working in the laboratory image"
                src={"/images/oak_cover.jpg"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute z-20 bottom-0 right-0 h-40 w-40 transition-transform md:translate-x-24 translate-x-16 translate-y-20">
            <Image
              alt="A square box mesh image"
              src={"/images/imageEffect.png"}
              fill
            />
          </div>
        </div>

        <div className="md:w-[30vw] w-full">
          <h3 className="text-black lg:text-3xl text-2xl">
            <TitleText weight="regular">
              We are committed to Educational & Scientific Excellence
            </TitleText>
          </h3>
          <p className="lg:text-lg md:text-base text-black mt-4 opacity-70">
            Oak Scientifics is your trusted Partner for quality laboratory,
            scientific and educational equipments.
          </p>
          <Button
            isDark
            text="Go to Shop"
            handleClick={() => router.push("/shop")}
          />
        </div>
      </div>

      <div className="bg-my-blue rounded-t-3xl py-20 lg:px-14 md:px-10 px-4 flex flex-col justify-center items-center">
        <CenterTitleComponent title="Our Achievements" color="white" />

        <div className="flex items-start justify-center sm:space-x-10 space-x-5 mt-14">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 hidden md:flex justify-center items-center bg-white rounded-full">
              <FaHandshakeSimple color="#0F81B0" size={40} />
            </div>
            <div className="h-16 w-16 flex md:hidden justify-center items-center bg-white rounded-full">
              <FaHandshakeSimple color="#0F81B0" size={30} />
            </div>
            <p className="md:text-2xl text-xl text-white mt-2 mb-1 text-center">
              10+ Years
            </p>
            <span className="opacity-80 text-white md:text-base text-sm text-center">
              in Business
            </span>
          </div>

          <div className="flex flex-col items-center md:px-32">
            <div className="h-20 w-20 hidden md:flex justify-center items-center bg-white rounded-full">
              <PiBuildingOfficeFill color="#0F81B0" size={40} />
            </div>
            <div className="h-16 w-16 flex md:hidden justify-center items-center bg-white rounded-full">
              <PiBuildingOfficeFill color="#0F81B0" size={30} />
            </div>
            <p className="md:text-2xl text-xl text-white mt-2 mb-1">50+</p>
            <span className="opacity-80 text-white md:text-base text-sm text-center">
              Educational Institutes
              <br />
              Served
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-20 w-20 hidden md:flex justify-center items-center bg-white rounded-full">
              <MdOutlineEngineering color="#0F81B0" size={40} />
            </div>
            <div className="h-16 w-16 flex md:hidden justify-center items-center bg-white rounded-full">
              <MdOutlineEngineering color="#0F81B0" size={30} />
            </div>
            <p className="md:text-2xl text-xl text-white mt-2 mb-1">100+</p>
            <span className="opacity-80 text-white md:text-base text-sm text-center">
              Lab Installations
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:py-28 py-14 lg:px-14 md:px-10 px-4 lg:space-x-40 md:space-x-16">
        <div className="lg:w-[35vw] md:w-[45vw] w-full">
          <h2 className="text-black lg:text-3xl text-2xl mb-2">
            <TitleText weight="regular">Oak Scientifics at a glance</TitleText>
          </h2>
          <p className="text-black mb-4 opacity-70 text-base">
            Founded in 2024, we are fully engaged in the supply, installtion and
            maintenance of Scientific and Agricultural equipments across Africa
            and beyond.
          </p>
          <TitleComponent title="Our Vision" color="black" />
          <p className="text-black text-base opacity-70 mt-2 mb-4">
            To become a global leader in scientific innovation, empowering
            discoveries, advancing education, and promoting sustainability with
            cutting-edge solutions.
          </p>
          <TitleComponent title="Our Mission" color="black" />
          <p className="text-black text-base opacity-70 mt-2 mb-4">
            Empowering innovation and discovery by providing precision
            scientific equipment and tailored solutions.
          </p>

          <Button
            text="About Oak Scientifics"
            isDark
            handleClick={() => router.push("/about-us")}
          />
        </div>

        <div className="relative mt-14 md:mt-0">
          <div className="lg:w-[30vw] md:w-[40vw] w-[85vw] md:h-[70vh] h-[50vh] relative">
            <div className="absolute w-full h-full rounded-2xl transition-transform lg:translate-x-8 translate-x-4 lg:-translate-y-8 -translate-y-4 bg-my-blue bg-opacity-60" />
            <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-md shadow-my-gray">
              <Image
                alt="a man working in the laboratory image"
                src={"/images/oak_cover3.jpg"}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute z-20 bottom-0 left-0 h-40 w-40 transition-transform md:-translate-x-24 -translate-x-16 translate-y-20">
            <Image
              alt="A square box mesh image"
              src={"/images/imageEffect.png"}
              fill
            />
          </div>
        </div>
      </div>

      {(isFetching || topProducts.length === 0) && (
        <div className="w-full pt-10 md:pb-20 pb-14 lg:px-14 md:px-10 px-4">
          <div className="flex justify-center items-center">
            <CenterTitleComponent title="Top Selling Products" color="black" />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3 mt-10 justify-items-center">
            {isFetching
              ? [...Array(4)].map((_, index) => (
                  <CardLoading
                    key={index}
                    className="md:w-[35vw] w-full h-40"
                  />
                ))
              : [...Array(4)].map((product, index) => (
                  <NPDCard key={index} product={product} />
                ))}
          </div>
        </div>
      )}

      {(isFetching || agricProducts.length === 0) && (
        <div className="w-full pt-10 md:pb-20 pb-14 lg:px-14 md:px-8 px-4">
          <div className="flex justify-center items-center relative">
            <CenterTitleComponent
              title="Agricultural Equipments"
              color="black"
            />
            <div className="hidden md:block absolute right-0">
              <TextLink
                text="View all Products"
                link="/shop/agriculture"
                isDark={false}
                className="text-sm tracking-wider"
              />
            </div>
          </div>

          <div>
            {isFetching ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 gap-x-3 mt-10 justify-items-center">
                {[...Array(3)].map((_, index) => (
                  <CardLoading
                    key={index}
                    className="xl:w-[25vw] lg:w-[27vw] md:w-[40vw] w-full h-60"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="hidden lg:grid grid-cols-3 gap-y-5 gap-x-3 mt-10 justify-items-center">
                  {[...Array(3)].map((product, index) => (
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

                <div className="grid lg:hidden md:grid-cols-2 grid-cols-1 gap-y-5 gap-x-3 mt-10 justify-items-center">
                  {[...Array(4)].map((product, index) => (
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
              </>
            )}
          </div>

          <div className="md:hidden flex justify-center mt-10 md:mt-0">
            <TextLink
              text="View all Products"
              link="/shop/agriculture"
              isDark={false}
              className="text-sm tracking-wider"
            />
          </div>
        </div>
      )}

      {(isFetching || labProducts.length === 0) && (
        <div className="w-full pt-10 md:pb-20 pb-14 lg:px-14 md:px-8 px-4">
          <div className="flex justify-center items-center relative">
            <CenterTitleComponent
              title="Science Laboratory Equipments"
              color="black"
            />
            <div className="hidden md:block absolute right-0">
              <TextLink
                text="View all Products"
                link="/"
                isDark={false}
                className="text-sm tracking-wider"
              />
            </div>
          </div>

          <div>
            {isFetching ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 gap-x-3 mt-10 justify-items-center">
                {[...Array(3)].map((_, index) => (
                  <CardLoading
                    key={index}
                    className="xl:w-[25vw] lg:w-[27vw] md:w-[40vw] w-full h-60"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="hidden lg:grid grid-cols-3 gap-y-5 gap-x-3 mt-10 justify-items-center">
                  {[...Array(3)].map((product, index) => (
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

                <div className="grid lg:hidden md:grid-cols-2 grid-cols-1 gap-y-5 gap-x-3 mt-10 justify-items-center">
                  {[...Array(4)].map((product, index) => (
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
              </>
            )}
          </div>

          <div className="md:hidden flex justify-center mt-10 md:mt-0">
            <TextLink
              text="View all Products"
              link="/shop/agriculture"
              isDark={false}
              className="text-sm tracking-wider"
            />
          </div>
        </div>
      )}

      {(isFetching || featuredProducts.length === 0) && (
        <div className="w-full pt-10 md:pb-20 pb-14">
          <div className="lg:px-14 md:px-10 px-4 flex items-center justify-between">
            <div>
              <TitleComponent title="Featured Products" color="black" />
              <p className="text-base w-full md:w-2/3 lg:w-fit text-black opacity-70 mt-2">
                These products were carefully selected to showcase the best of
                our Product lists.
              </p>
            </div>

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
            ref={featuredRef}
            className="w-full overflow-x-auto py-5 lg:px-14 md:px-10 px-4 hide-scrollbar"
          >
            <div className="flex space-x-4 min-w-max">
              {isFetching
                ? [...Array(4)].map((_, index) => (
                    <CardLoading
                      key={index}
                      className="md:w-[25vw] w-[70vw] h-60"
                    />
                  ))
                : [...Array(4)].map((product, index) => (
                    <NCard
                      key={index}
                      product={{
                        name: "Radiation Alert Inspection Exp+ Insp. Model Rubber Boot, Ls,",
                      }}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-my-yellow bg-opacity-60 rounded-t-3xl py-20 lg:px-14 md:px-10 px-4 flex flex-col justify-center items-center">
        <CenterTitleComponent title="What makes Us the Best" color="black" />
        <BodyText
          weight="medium"
          className="md:text-lg text-base text-black opacity-70 lg:w-2/3 md:w-3/4 text-center mt-10"
        >
          Over the years, Oak Scientifics has been a top-leader in supplying
          Scientific and laboratory equipments across Africa and beyond.
        </BodyText>

        <div className="flex items-start justify-center space-x-10 mt-10">
          <div className="flex flex-col items-center md:max-w-[20vw] max-w-[35vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black medal achievement icon"
                src={"/icons/medalIcon.svg"}
                fill
                className="object-contain"
              />
            </div>
            <p className="lg:text-2xl text-xl text-black mt-6 mb-2 text-center">
              Quality Assured
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-sm text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>

          <div className="flex flex-col items-center md:max-w-[20vw] max-w-[35vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black van delivery icon"
                src={"/icons/vanIcon.svg"}
                fill
                className="object-contain"
              />
            </div>

            <p className="lg:text-2xl text-xl text-black mt-6 mb-2 text-center">
              Timely Delivery
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-sm text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>

          <div className="hidden md:flex flex-col items-center max-w-[20vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black bulb innovative icon"
                src={"/icons/bulbIcon.svg"}
                fill
                className="object-contain"
              />
            </div>
            <p className="lg:text-2xl md:text-xl text-black mt-6 mb-2 text-center">
              Innovative
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>

          <div className="hidden md:flex flex-col items-center max-w-[20vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black support center logo"
                src={"/icons/supportIcon.svg"}
                fill
                className="object-contain"
              />
            </div>
            <p className="lg:text-2xl md:text-xl text-black mt-6 mb-2 text-center">
              Expert Support
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>
        </div>

        <div className="flex md:hidden items-start justify-center space-x-10 mt-5">
          <div className="flex flex-col items-center max-w-[35vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black bulb innovative icon"
                src={"/icons/bulbIcon.svg"}
                fill
                className="object-contain"
              />
            </div>
            <p className="lg:text-2xl text-xl text-black mt-6 mb-2 text-center">
              Innovative
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-sm text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>

          <div className="flex flex-col items-center max-w-[35vw]">
            <div className="lg:h-20 md:h-14 h-12 lg:w-20 md:w-14 w-12 relative overflow-hidden">
              <Image
                alt="a black support center logo"
                src={"/icons/supportIcon.svg"}
                fill
                className="object-contain"
              />
            </div>
            <p className="lg:text-2xl text-xl text-black mt-6 mb-2 text-center">
              Expert Support
            </p>
            <span className="opacity-70 text-black lg:text-lg md:text-base text-sm text-center">
              Torem ipsum dolor sit amet, consectetur
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:py-20 py-14 lg:px-14 md:px-8 px-4">
        <div className="flex flex-col justify-center items-center relative">
          <CenterTitleComponent
            title="Our Partners Across the Global"
            color="black"
          />
          <BodyText
            weight="medium"
            className="md:text-lg text-base text-black opacity-70 lg:w-2/3 md:w-4/5 text-center mt-10"
          >
            We collaborate with top-notch Manufacturers in the industry to give
            you the best of our range of scientific and laboratory equipments
          </BodyText>
        </div>

        <div className="flex flex-col items-center">
          <div className="grid lg:grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr] grid-cols-1 items-center md:gap-x-14 gap-x-7 gap-y-5 mt-10">
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand1.png"}
                fill
                className="object-cover"
              />
            </div>
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand2.png"}
                fill
                className="object-cover"
              />
            </div>
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand3.png"}
                fill
                className="object-cover"
              />
            </div>
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand4.png"}
                fill
                className="object-cover"
              />
            </div>
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand5.png"}
                fill
                className="object-cover"
              />
            </div>
            <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[90vw] h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
              <Image
                alt="oak scientifics partner logo"
                src={"/images/oak_brand6.png"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-10 lg:px-14 md:px-10 px-4">
        <TitleComponent title="Blog Posts" color="black" />

        <div className="flex items-center justify-between mt-10">
          <BlogCard
            img="/images/blogImage.png"
            title="Why Choose Oak Scientifics?"
            desc="Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </div>
      </div>

      <Faq />
    </main>
  );
}

const CatWrapper = () => {
  const MdRender = () => {
    return (
      <div className="hidden md:block">
        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/science laboratory"
            img={{
              alt: "a black girl working in a laboratory",
              uri: "/images/catLab.jpg",
            }}
            text="Science Laboratory"
          />

          <CatBox
            link="/shop/agriculture"
            img={{
              alt: "a red tractor tilling a farm field",
              uri: "/images/catAgric.jpg",
            }}
            text="Agriculture"
          />

          <CatBox
            link="/shop/geology/geology"
            img={{
              alt: "two geologists studying a cave wall",
              uri: "/images/catGeo.jpg",
            }}
            text="Geology"
          />

          <CatBox
            link="/shop/research & analytics"
            img={{
              alt: "a black man running a test in a laboratory",
              uri: "/images/catRes.jpg",
            }}
            text="Research & Analytics"
          />
        </div>

        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/industrial laboratory"
            img={{
              alt: "a machine drilling into a metal",
              uri: "/images/catInd.jpg",
            }}
            text="Industrial Laboratory"
          />

          <CatBox
            link="/shop/training mannequins/training mannequins & simulators"
            img={{
              alt: "a mannequin within a green jacket",
              uri: "/images/catMan.jpg",
            }}
            text="Training Mannequins"
          />

          <CatBox
            link="/shop/uncategorized"
            img={{
              alt: "a set of lab chemicals",
              uri: "/images/catOther.jpg",
            }}
            text="General Products"
          />
        </div>
      </div>
    );
  };

  const SMRender = () => {
    return (
      <div className="md:hidden">
        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/science laboratory"
            img={{
              alt: "a black girl working in a laboratory",
              uri: "/images/catLab.jpg",
            }}
            text="Science Laboratory"
          />

          <CatBox
            link="/shop/agriculture"
            img={{
              alt: "a red tractor tilling a farm field",
              uri: "/images/catAgric.jpg",
            }}
            text="Agriculture"
          />
        </div>

        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/geology/geology"
            img={{
              alt: "two geologists studying a cave wall",
              uri: "/images/catGeo.jpg",
            }}
            text="Geology"
          />

          <CatBox
            link="/shop/research & analytics"
            img={{
              alt: "a black man running a test in a laboratory",
              uri: "/images/catRes.jpg",
            }}
            text="Research & Analytics"
          />
        </div>

        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/industrial laboratory"
            img={{
              alt: "a machine drilling into a metal",
              uri: "/images/catInd.jpg",
            }}
            text="Industrial Laboratory"
          />

          <CatBox
            link="/shop/training mannequins/training mannequins & simulators"
            img={{
              alt: "a mannequin within a green jacket",
              uri: "/images/catMan.jpg",
            }}
            text="Training Mannequins"
          />
        </div>

        <div className="flex w-full justify-center items-center space-x-10 mt-10">
          <CatBox
            link="/shop/uncategorized"
            img={{
              alt: "a set of lab chemicals",
              uri: "/images/catOther.jpg",
            }}
            text="General Products"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:py-24 py-16 lg:px-14 md:px-8 px-4">
      <TitleComponent color="black" title="Solutions we Provide" />

      <MdRender />
      <SMRender />
    </div>
  );
};

const CatBox = ({
  link,
  img,
  text,
}: {
  link: string;
  img: { alt: string; uri: string };
  text: string;
}) => {
  return (
    <Link
      href={link}
      className="lg:w-56 md:w-48 w-40 md:h-44 h-36 rounded-xl relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
    >
      <Image alt={img.alt} src={img.uri} fill className="object-cover" />
      <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
        <BodyText
          weight="bold"
          className="text-white md:text-lg text-base text-center text-wrap"
        >
          {text}
        </BodyText>
      </div>
    </Link>
  );
};
