"use client";

import { BodyText, TitleText } from "./Text";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoHelpCircleOutline } from "react-icons/io5";
import { ToolTip } from "./ToolTip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const ShopFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 10000,
  });
  const [brandFilter, setBrandFilter] = useState("all");

  const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);
  const [isBrandFilterOpen, setBrandFilterOpen] = useState(false);
  const [isCatFilterOpen, setCatFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    // Set the `priceRange` filter
    params.set("priceRange", `${priceFilter.min}-${priceFilter.max}`);
    // Set the `brand` filter
    params.set("brand", brandFilter);

    router.push(`?${params.toString()}`);
  }, [priceFilter, brandFilter]);

  return (
    <div className="w-[20vw] hidden lg:block">
      {/** Filter heading and reset button */}
      <TitleText weight="bold" className="text-base text-black mb-5 block">
        Filter by
      </TitleText>

      {/** Price filter */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <BodyText weight="light" className="text-base text-black">
            Price ($)
          </BodyText>
          <button
            className="opacity-70"
            onClick={() => setPriceFilterOpen((prev) => !prev)}
          >
            {isPriceFilterOpen ? (
              <FaMinus color="#0f81b0" size={14} />
            ) : (
              <FaPlus color="#0f81b0" size={14} />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isPriceFilterOpen ? "max-h-32" : "max-h-0"
          }`}
        >
          <hr className="border border-black w-full my-3" />

          <BodyText
            weight="regular"
            className="text-base text-my-blue text-center w-full block"
          >
            $90 &ndash; $980
          </BodyText>
        </div>
      </div>

      {/** Brand filter */}
      <div className="w-full mt-5">
        <div className="flex items-center justify-between mb-4">
          <BodyText weight="light" className="text-base text-black">
            Brand
          </BodyText>
          <button
            className="opacity-70"
            onClick={() => setBrandFilterOpen((prev) => !prev)}
          >
            {isBrandFilterOpen ? (
              <FaMinus color="#0f81b0" size={14} />
            ) : (
              <FaPlus color="#0f81b0" size={14} />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out pl-4 ${
            isBrandFilterOpen ? "max-h-48" : "max-h-0"
          } flex flex-col space-y-3`}
        >
          <button
            className={`flex items-center space-x-4 text-sm hover:text-my-blue duration-300 ease-in-out ${
              brandFilter === "all"
                ? "text-my-blue opacity-100"
                : "text-black opacity-70"
            }`}
            onClick={() => setBrandFilter("all")}
          >
            All
          </button>

          <button
            className={`flex items-center space-x-4 text-sm hover:text-my-blue duration-300 ease-in-out ${
              brandFilter === "Eppendorf"
                ? "text-my-blue opacity-100"
                : "text-black opacity-70"
            }`}
            onClick={() => setBrandFilter("Eppendorf")}
          >
            Eppendorf
          </button>

          <button
            className={`flex items-center space-x-4 text-sm hover:text-my-blue duration-300 ease-in-out ${
              brandFilter === "Medtronic"
                ? "text-my-blue opacity-100"
                : "text-black opacity-70"
            }`}
            onClick={() => setBrandFilter("Medtronic")}
          >
            Medtronic
          </button>

          <button
            className={`flex items-center space-x-4 text-sm hover:text-my-blue duration-300 ease-in-out ${
              brandFilter === "Biobase"
                ? "text-my-blue opacity-100"
                : "text-black opacity-70"
            }`}
            onClick={() => setBrandFilter("Biobase")}
          >
            Biobase
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center my-3 py-6 border-y border-black border-opacity-30">
        <button className="w-2/3 py-2 rounded-md bg-my-gray hover:bg-my-blue text-white text-base duration-300 ease-in-out">
          Reset
        </button>
      </div>

      {/** Category */}
      <div className="w-full mt-5">
        <div className="flex items-center justify-between mb-5">
          <BodyText weight="light" className="text-base text-black">
            Shop by category
          </BodyText>
          <button
            className="opacity-70"
            onClick={() => setCatFilterOpen((prev) => !prev)}
          >
            {isCatFilterOpen ? (
              <FaMinus color="#0f81b0" size={14} />
            ) : (
              <FaPlus color="#0f81b0" size={14} />
            )}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out pl-4 mb-4 opacity-70 ${
            isCatFilterOpen ? "max-h-40" : "max-h-0"
          } flex flex-col space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3D3A3A] scrollbar-track-[#C5C4C4] scrollable-content`}
        >
          <Link
            href={`/shop/uncategorized`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Uncategorized
          </Link>
          <Link
            href={`/shop/science laboratory`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Science Laboratory
          </Link>
          <Link
            href={`/shop/agriculture`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Agriculture
          </Link>
          <Link
            href={`/shop/geology`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Geology
          </Link>
          <Link
            href={`/shop/research & analytics`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Research & Analytics
          </Link>
          <Link
            href={`/shop/industrial laboratory`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Industrial Laboratory
          </Link>
          <Link
            href={`/shop/training mannequins`}
            className={`text-sm text-black hover:text-my-blue duration-300 ease-in-out`}
          >
            Training Mannequins
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PriceFilter = () => {
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 10000,
  });
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);

  return (
    <div className="w-[20vw] hidden lg:block">
      {/** Filter heading and reset button */}
      <div className="flex items-center justify-between mb-5">
        <TitleText weight="bold" className="text-base text-black">
          Filter by
        </TitleText>
        <button className="text-black text-sm opacity-70 hover:text-my-blue hover:underline duration-300 ease-in-out">
          Reset
        </button>
      </div>

      {/** Price filter */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <BodyText weight="light" className="text-base text-black">
            Price
          </BodyText>
          <button
            className="opacity-70"
            onClick={() => setPriceFilterOpen((prev) => !prev)}
          >
            {isPriceFilterOpen ? (
              <FaMinus color="#0f81b0" size={14} />
            ) : (
              <FaPlus color="#0f81b0" size={14} />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isPriceFilterOpen ? "max-h-32" : "max-h-0"
          }`}
        >
          <hr className="border border-black w-full my-3" />

          <BodyText
            weight="regular"
            className="text-base text-my-blue text-center w-full block"
          >
            $90 &ndash; $980
          </BodyText>
        </div>
      </div>
    </div>
  );
};

export const BrandFilterModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brands = searchParams.get("brand");

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (v: string) => {
    if (selectedValues.includes(v)) {
      const [v, ...others] = selectedValues;
      setSelectedValues(others);
    } else {
      setSelectedValues((prev) => [...prev, v]);
    }
  };

  const handleSet = () => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (selectedValues.length > 0) {
      const restParams = { ...currentParams, brand: selectedValues.join(",") };

      const newSearchParams = new URLSearchParams(restParams);

      // Using replace instead of push, with scroll: false
      router.replace(`/shop?${newSearchParams.toString()}`, {
        scroll: false,
      });

      close();
    } else {
      handleClear();
    }
  };

  const handleClear = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const { brand, ...restParams } = currentParams;

    const newSearchParams = new URLSearchParams(restParams);

    router.replace(`/shop?${newSearchParams.toString()}`, {
      scroll: false,
    });

    close();
  };

  useEffect(() => {
    const currentValues = brands?.split(",") || [];
    currentValues.map((item) => setSelectedValues((prev) => [...prev, item]));
  }, [brands]);

  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white dark:bg-black md:w-[50vw] w-[90vw] rounded-lg px-5 py-10 max-h-[90vh] shadow-xl shadow-my-gray flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <TitleText weight="bold" className="text-black text-2xl">
          Brand Filter
        </TitleText>
        <p className="mt-3 text-black text-lg opacity-70 mb-6">
          Select brands to filter products
        </p>

        <ul className="text-base text-black space-y-4 w-full">
          <li
            className="w-full flex items-center justify-between cursor-default"
            onClick={() => handleSelect("Eppendorf")}
          >
            <span className="text-black text-base">Eppendorf</span>
            <div
              className={`h-3 w-3 border ${
                selectedValues.includes("Eppendorf")
                  ? "border-my-blue"
                  : "border-black"
              } rounded-full flex justify-center items-center cursor-pointer`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  selectedValues.includes("Eppendorf")
                    ? "bg-my-blue"
                    : "bg-transparent"
                }`}
              />
            </div>
          </li>

          <li
            className="w-full flex items-center justify-between cursor-default"
            onClick={() => handleSelect("Medtronic")}
          >
            <span className="text-black text-base">Medtronic</span>
            <div
              className={`h-3 w-3 border ${
                selectedValues.includes("Medtronic")
                  ? "border-my-blue"
                  : "border-black"
              } rounded-full flex justify-center items-center cursor-pointer`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  selectedValues.includes("Medtronic")
                    ? "bg-my-blue"
                    : "bg-transparent"
                }`}
              />
            </div>
          </li>

          <li
            className="w-full flex items-center justify-between cursor-default"
            onClick={() => handleSelect("Biobase")}
          >
            <span className="text-black text-base">Biobase</span>
            <div
              className={`h-3 w-3 border ${
                selectedValues.includes("Biobase")
                  ? "border-my-blue"
                  : "border-black"
              } rounded-full flex justify-center items-center cursor-pointer`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  selectedValues.includes("Biobase")
                    ? "bg-my-blue"
                    : "bg-transparent"
                }`}
              />
            </div>
          </li>
        </ul>

        <div className="mt-10 flex items-center justify-between space-x-20">
          <button
            className="w-32 py-2 flex items-center justify-center bg-my-gray text-white rounded-md"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="w-32 py-2 flex items-center justify-center bg-my-blue text-white rounded-md"
            onClick={handleSet}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export const PriceFilterModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceRange = searchParams.get("priceRange");

  const [selectedRanges, setSelectedRanges] = useState({
    min: 0,
    max: 0,
  });

  const handleChange = (values: [number, number]) => {
    setSelectedRanges({ min: values[0], max: values[1] });
  };

  const handleSet = () => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const restParams = {
      ...currentParams,
      priceRange: `${selectedRanges.min}-${selectedRanges.max}`,
    };

    const newSearchParams = new URLSearchParams(restParams);

    // Using replace instead of push, with scroll: false
    router.replace(`/shop?${newSearchParams.toString()}`, {
      scroll: false,
    });

    close();
  };

  const handleClear = () => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const restParams = {
      ...currentParams,
      priceRange: `0-100000`,
    };

    const newSearchParams = new URLSearchParams(restParams);

    // Using replace instead of push, with scroll: false
    router.replace(`/shop?${newSearchParams.toString()}`, {
      scroll: false,
    });

    close();
  };

  useEffect(() => {
    const [min, max] =
      priceRange?.split("-").map(Number) || "0-100000".split("-").map(Number);

    setSelectedRanges({ min, max });
  }, []);

  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white dark:bg-black md:w-[50vw] w-[90vw] rounded-lg px-5 py-10 max-h-[90vh] shadow-xl shadow-my-gray flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <TitleText weight="bold" className="text-black text-2xl">
          Price Filter
        </TitleText>
        <div className="flex items-start space-x-2 mb-6 mt-3">
          <p className="text-black text-lg opacity-70">
            Set min and max price filters
          </p>
          <ToolTip tip="Your selected price range will be converted to your local/choice currency.">
            <IoHelpCircleOutline color="black" size={18} />
          </ToolTip>
        </div>

        <PriceRangeSlider
          min={0}
          max={100000}
          step={50}
          onChange={handleChange}
        />

        <div className="mt-10 flex items-center justify-between space-x-20">
          <button
            className="w-32 py-2 flex items-center justify-center bg-my-gray text-white rounded-md"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="w-32 py-2 flex items-center justify-center bg-my-blue text-white rounded-md"
            onClick={handleSet}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange?: (values: [number, number]) => void;
  step?: number;
}

function PriceRangeSlider({
  min,
  max,
  onChange,
  step = 100,
}: PriceRangeSliderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  // Get initial values from URL or use defaults
  const initialValues: [number, number] = useMemo(() => {
    const priceRange = searchParams.get("priceRange");
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      return [
        Math.max(min, Math.min(maxPrice, minPrice)),
        Math.min(max, Math.max(maxPrice, minPrice)),
      ];
    }
    return [min, max];
  }, [min, max, searchParams]);

  const [values, setValues] = useState<[number, number]>(initialValues);
  const [minValue, maxValue] = values;

  const updateURL = useCallback(
    (newValues: [number, number]) => {
      const current = new URLSearchParams(searchParams.toString());
      current.set("priceRange", `${newValues[0]}-${newValues[1]}`);
      router.replace(`?${current.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Calculate percentage position for thumbs
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const minThumbStyle = {
    left: `${getPercentage(minValue)}%`,
  };

  const maxThumbStyle = {
    left: `${getPercentage(maxValue)}%`,
  };

  const progressStyle = {
    left: `${getPercentage(minValue)}%`,
    width: `${getPercentage(maxValue) - getPercentage(minValue)}%`,
  };

  // Handle mouse/touch move
  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;

      // Calculate new value based on position
      const percentage = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1
      );
      const newValue =
        Math.round((percentage * (max - min) + min) / step) * step;

      setValues((prev) => {
        let newValues: [number, number];

        if (isDragging === "min") {
          newValues = [Math.min(newValue, maxValue - step), maxValue];
        } else {
          newValues = [minValue, Math.max(newValue, minValue + step)];
        }

        onChange?.(newValues);
        return newValues;
      });
    },
    [isDragging, min, max, step, minValue, maxValue, onChange]
  );

  // Handle mouse/touch up
  const handleEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(null);
    }
  }, [isDragging, values]);

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div className="w-full px-4 py-6">
      <div
        ref={sliderRef}
        className="relative w-full h-2 bg-gray-200 rounded-full"
      >
        {/* Progress Bar */}
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={progressStyle}
        />

        {/* Min Thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full -mt-1.5 cursor-pointer"
          style={minThumbStyle}
          onMouseDown={() => setIsDragging("min")}
          onTouchStart={() => setIsDragging("min")}
        />

        {/* Max Thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full -mt-1.5 cursor-pointer"
          style={maxThumbStyle}
          onMouseDown={() => setIsDragging("max")}
          onTouchStart={() => setIsDragging("max")}
        />
      </div>

      {/* Values display */}
      <div className="flex justify-between mt-4">
        <div className="px-7 py-2 min-w-28 text-black text-base border border-black border-opacity-50 rounded-lg">
          ${minValue.toLocaleString()}
        </div>
        <div className="px-7 py-2 min-w-28 text-black text-base border border-black border-opacity-50 rounded-lg">
          ${maxValue.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
