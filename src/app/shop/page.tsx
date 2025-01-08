"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { NetworkErrorModal } from "@/components/ErrorModals";
import { ShopFilter } from "@/components/Filter";
import { LoadingModal } from "@/components/LazyLoading";
import PaginatedProducts from "@/components/PaginatedProducts";
import Portal from "@/components/Portal";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ShopPage = () => {
  return (
    <Suspense fallback={<LoadingModal />}>
      <Shop />
    </Suspense>
  );
};

const Shop = () => {
  const searchParams = useSearchParams();
  const priceRange = searchParams.get("priceRange");
  const brand = searchParams.get("brand");

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isErrorModalOn, setErrorModalOn] = useState(false);

  const fetchData = async () => {
    setFetching(true);

    try {
      const response = await axios.get("/api/product");
      if (response.data.success) {
        setData(response.data.products);
        await handleFilter(response.data.products);
      }
    } catch (error) {
      setErrorModalOn(true);
    } finally {
      setFetching(false);
    }
  };

  const handleFilter = async (d: any[]) => {
    const newData: any[] = [];

    // filter brand
    if (brand && brand !== "all") {
      const result = d.filter((item) => item.brand === brand);
      newData.push(...result);
    } else {
      newData.push(...d);
    }

    // filter price
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);

      const result =
        max === 10000
          ? d.filter((item) => item.price >= min)
          : d.filter((item) => item.price >= min && item.price <= max);
      newData.push(...result);
    }

    setFilteredData(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter(data);
  }, [priceRange, brand, data]);

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4">
      <Breadcrumb />
      <div className="flex flex-col items-center">
        <CenterTitleComponent isH1 title="Shop" color="black" />
        <p className="text-black opacity-70 text-base mt-7">
          The range of products we offer at Oak Scientifics
        </p>
        <CatWrapper />
      </div>

      <div className="flex items-start justify-between pb-20">
        <ShopFilter />
        <PaginatedProducts
          isFetching={isFetching}
          products={filteredData}
          itemsPerPage={12}
        />
      </div>

      {isErrorModalOn && (
        <Portal>
          <NetworkErrorModal
            refresh={() => {
              fetchData();
              setErrorModalOn(false);
            }}
            close={() => setErrorModalOn(false)}
          />
        </Portal>
      )}
    </main>
  );
};

export default ShopPage;

const CatWrapper = () => {
  const XLRender = () => {
    return (
      <div className="hidden xl:block md:mt-20 mt-10">
        <div className="flex w-full justify-center items-center space-x-5 mb-8">
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

  const MdRender = () => {
    return (
      <div className="hidden md:block xl:hidden mt-20">
        <div className="flex w-full justify-center items-center space-x-5 mb-8">
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

        <div className="flex w-full justify-center items-center space-x-5">
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
      <div className="md:hidden mt-20">
        <div className="flex w-full justify-center items-center space-x-5 mb-8">
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

        <div className="flex w-full justify-center items-center space-x-5 mb-8">
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

        <div className="flex w-full justify-center items-center space-x-5 mb-8">
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

        <div className="flex w-full justify-center items-center space-x-5">
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
      <XLRender />
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
