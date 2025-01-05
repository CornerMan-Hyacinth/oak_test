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
  return (
    <>
      <div className="flex w-full justify-center items-center space-x-5 mt-20 mb-8 xl:mb-20">
        <Link
          href={"/shop/science laboratory"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catLab.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Science Laboratory
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/agriculture"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catAgric.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Agriculture
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/geology/geology"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catGeo.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Geology
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/research & analytics"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catRes.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Research & Analytics
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/industrial laboratory"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out hidden xl:block"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catInd.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Industrial Laboratory
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/training mannequins/training mannequins & simulators"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out hidden xl:block"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catMan.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Training Mannequins
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/uncategorized"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out hidden xl:block"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catOther.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              General Products
            </BodyText>
          </div>
        </Link>
      </div>

      <div className="flex w-full justify-center items-center space-x-5 mb-20 xl:hidden">
        <Link
          href={"/shop/industrial laboratory"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catInd.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Industrial Laboratory
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/training mannequins/training mannequins & simulators"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catMan.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              Training Mannequins
            </BodyText>
          </div>
        </Link>

        <Link
          href={"/shop/uncategorized"}
          className="xl:w-40 w-48 xl:h-32 h-40 rounded-md relative overflow-hidden hover:scale-110 duration-300 ease-in-out"
        >
          <Image
            alt="a man testing in a laboratory image"
            src={"/images/catOther.jpg"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-4 cursor-pointer hover:bg-my-blue hover:bg-opacity-70 duration-300 ease-in-out">
            <BodyText
              weight="bold"
              className="text-white xl:text-lg text-base text-center text-wrap"
            >
              General Products
            </BodyText>
          </div>
        </Link>
      </div>
    </>
  );
};
