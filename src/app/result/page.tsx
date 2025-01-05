"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { NetworkErrorModal } from "@/components/ErrorModals";
import { PriceFilter } from "@/components/Filter";
import PaginatedProducts from "@/components/PaginatedProducts";
import Portal from "@/components/Portal";
import { CenterTitleComponent } from "@/components/Title";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const priceRange = searchParams.get("priceRange");

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isErrorModalOn, setErrorModalOn] = useState(false);

  const fetchData = async () => {
    setFetching(true);

    if (!query) {
      router.push("/shop");
      setFetching(false);
      return;
    }

    try {
      const response = await axios.get(`/api/product?search=${query}`);
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
    if (!priceRange) {
      setFilteredData(d);
      return;
    }

    const [min, max] = priceRange.split("-").map(Number);
    const result =
      max === 10000
        ? d.filter((item) => item.price >= min)
        : d.filter((item) => item.price >= min && item.price <= max);

    setFilteredData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter(data);
  }, [priceRange, data]);

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4">
      <Breadcrumb />
      <div className="flex flex-col items-center">
        <CenterTitleComponent
          isH1
          title={`${data.length} Search Results`}
          color="black"
        />
      </div>

      <div className="flex items-start justify-between my-20">
        <PriceFilter />
        <PaginatedProducts
          isFetching={isFetching}
          isResult
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

export default ResultPage;
