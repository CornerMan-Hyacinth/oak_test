"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { NetworkErrorModal } from "@/components/ErrorModals";
import { PriceFilter } from "@/components/Filter";
import { LoadingModal } from "@/components/LazyLoading";
import PaginatedProducts from "@/components/PaginatedProducts";
import Portal from "@/components/Portal";
import { CenterTitleComponent } from "@/components/Title";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SubCategory = ({ params }: { params: Promise<{ subcat: string }> }) => {
  return (
    <Suspense fallback={<LoadingModal />}>
      <SubCategoryPage params={params} />
    </Suspense>
  );
};

const SubCategoryPage = ({
  params,
}: {
  params: Promise<{ subcat: string }>;
}) => {
  const searchParams = useSearchParams();
  const priceRange = searchParams.get("priceRange");

  const [subCategory, setSubCategory] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isErrorModalOn, setErrorModalOn] = useState(false);

  const fetchData = async () => {
    setFetching(true);

    try {
      const response = await axios.get(
        `/api/product?subcat=${decodeURIComponent((await params).subcat)}`
      );
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

  useEffect(() => {
    const getSubCat = async () => {
      const { subcat } = await params;
      setSubCategory(decodeURIComponent(subcat));
    };

    getSubCat();
  }, [params]);

  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4">
      <Breadcrumb />
      <div className="flex flex-col items-center">
        <CenterTitleComponent
          isH1
          title={subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
          color="black"
        />
      </div>

      <div className="flex items-start justify-between my-20">
        <PriceFilter />
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

export default SubCategory;
