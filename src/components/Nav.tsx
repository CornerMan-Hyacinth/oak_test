"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/images/oak_logo.png";
import { GrHomeRounded } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { CatalogueModal, ReviewModal, SearchModal } from "./Modals";
import Portal from "./Portal";
import { usePathname, useRouter } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa6";

const Nav = () => {
  const topNavRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const topNavHeight = topNavRef.current?.offsetHeight || 0;

      // Check if user has scrolled down past the top nav
      if (window.scrollY > topNavHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-10 w-full`}>
      <div ref={topNavRef} className="w-full transition-transform duration-300">
        <NavUp />
      </div>

      <div className={`w-full relative`}>
        <NavDown />
      </div>
    </nav>
  );
};

export default Nav;

const NavUp = () => {
  return (
    <div className="flex items-center justify-between bg-white lg:px-14 md:px-8 px-4 h-12">
      <span className="text-black text-sm opacity-70 lg:w-48">
        +(234) 803 8867 562
      </span>
      <p className="text-black text-sm opacity-70 tracking-wider ">
        ...infinite possibilities
      </p>

      <div className="items-center space-x-5 hidden md:flex">
        <Link
          href={"/career"}
          className="text-black text-xs hover:text-my-blue hover:underline duration-300 ease-in-out"
        >
          Career
        </Link>
        <Link
          href={"/blog"}
          className="text-black text-xs hover:text-my-blue hover:underline duration-300 ease-in-out"
        >
          Blog
        </Link>
        <Link
          href={"/about-us"}
          className="text-black text-xs hover:text-my-blue hover:underline duration-300 ease-in-out"
        >
          About Us
        </Link>
        <Link
          href={"/contact-us"}
          className="text-black text-xs hover:text-my-blue hover:underline duration-300 ease-in-out"
        >
          Contact Us
        </Link>
        <Link
          href={"/review"}
          className="text-black text-xs hover:text-my-blue hover:underline duration-300 ease-in-out"
        >
          Leave a Review
        </Link>
      </div>
    </div>
  );
};

const NavDown = () => {
  const pathname = usePathname();

  const [isCatalogueClicked, setCatalogueClicked] = useState(false);
  const [tabHoveredOn, setTabHoveredOn] = useState("");
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    if (isMenuOpen) {
      document.body.style.overflowY = "auto";
      setMenuOpen(false);
    } else {
      document.body.style.overflowY = "hidden";
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    pathname === "/review"
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [pathname]);

  return (
    <div
      className={`bg-my-blue h-16 w-full lg:px-14 md:px-10 px-4 flex items-center justify-between`}
    >
      <div className="h-full w-16 bg-white relative">
        <Image
          alt="Oak scientifics logo"
          src={logo}
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="md:flex hidden items-center lg:space-x-6 space-x-4 h-full">
        <Link href={"/"} className="hover:opacity-70 duration-500 ease-in-out">
          <GrHomeRounded size={16} color="white" />
        </Link>
        <div className="w-1 h-4 bg-opacity-70 border-l border-l-white" />
        <div
          className="relative h-full flex items-center justify-center"
          onMouseEnter={() => setTabHoveredOn("solutions")}
          onMouseLeave={() => setTabHoveredOn("")}
        >
          <Link
            href={"/shop"}
            className="hover:opacity-70 duration-300 ease-in-out text-white text-sm flex items-center space-x-"
          >
            <span>Solutions</span>
            <span
              className={`transition-all duration-300 ease-in-out ${
                tabHoveredOn === "solutions" ? "rotate-180" : "rotate-0"
              }`}
            >
              <MdArrowDropDown color="white" size={22} />
            </span>
          </Link>
          <div
            className={`absolute top-0 right-0 bg-white shadow-sm shadow-my-gray rounded-md pl-4 pr-8 flex flex-col space-y-6 text-nowrap transition-all translate-y-14 translate-x-1/2 duration-500 ease-in ${
              tabHoveredOn === "solutions" ? "max-h-fit py-5" : "max-h-0 py-0"
            } overflow-hidden`}
          >
            <Link
              href={"/shop/science laboratory"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Science Laboratory
            </Link>
            <Link
              href={"/shop/agriculture"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Agriculture
            </Link>
            <Link
              href={"/shop/geology/geology"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Geology
            </Link>
            <Link
              href={"/shop/research & analytics"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Research & Analytics
            </Link>
            <Link
              href={"/shop/industrial laboratory"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Industrial Laboratory
            </Link>
            <Link
              href={
                "/shop/training mannequins/training mannequins & simulators"
              }
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Training Mannequins
            </Link>
            <Link
              href={"/shop/uncategorized"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              General Products
            </Link>
          </div>
        </div>

        <div
          className="relative h-full flex items-center justify-center"
          onMouseEnter={() => setTabHoveredOn("services")}
          onMouseLeave={() => setTabHoveredOn("")}
        >
          <Link
            href={"/services"}
            className="hover:opacity-70 duration-500 ease-in-out text-white text-sm flex items-center space-x-"
          >
            <span>Services</span>
            <span
              className={`transition-all duration-300 ease-in-out ${
                tabHoveredOn === "services" ? "rotate-180" : "rotate-0"
              }`}
            >
              <MdArrowDropDown color="white" size={22} />
            </span>
          </Link>
          <div
            className={`absolute top-0 right-0 bg-white shadow-sm shadow-my-gray rounded-md pl-4 pr-8 flex flex-col space-y-6 text-nowrap transition-all translate-y-14 translate-x-1/2 duration-500 ease-in-out ${
              tabHoveredOn === "services" ? "max-h-fit py-5" : "max-h-0 py-0"
            } overflow-hidden`}
          >
            <Link
              href={"/services?sheet=setups"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Laboratory Setups and Furnishing
            </Link>
            <Link
              href={"/services?sheet=training"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              Training of End-Users
            </Link>
            <Link
              href={"/services?sheet=support"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              After-sales Support
            </Link>
          </div>
        </div>

        <Link
          href={"/brands"}
          className="hover:opacity-70 duration-300 ease-in-out text-white text-sm"
        >
          Brands
        </Link>

        <button
          className="hover:opacity-70 duration-300 ease-in-out text-white text-sm"
          onClick={() => setCatalogueClicked(true)}
        >
          Product Catalogue
        </button>
      </div>

      <div className="flex items-center space-x-5 h-full">
        <button
          className="hover:opacity-70 duration-300 ease-in-out"
          onClick={() => setSearchClicked(true)}
        >
          <BsSearch size={20} color="white" />
        </button>

        <div
          className="relative h-full flex items-center justify-center"
          onMouseEnter={() => setTabHoveredOn("cart")}
          onMouseLeave={() => setTabHoveredOn("")}
        >
          <button className="hover:opacity-70 duration-300 ease-in-out relative">
            <HiOutlineShoppingCart size={20} color="white" />
          </button>
          <div
            className={`absolute top-0 right-0 bg-white shadow-sm shadow-my-gray rounded-md pl-4 pr-8 flex flex-col space-y-4 text-nowrap transition-all translate-y-14 lg:translate-x-1/2 translate-x-1/3 duration-500 ease-in-out ${
              tabHoveredOn === "cart" ? "max-h-fit py-5" : "max-h-0 py-0"
            } overflow-hidden`}
          >
            <Link
              href={"/cart"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              View Cart
            </Link>
            <Link
              href={"/quote-list"}
              className="text-black text-base hover:text-my-blue hover:underline duration-300 ease-in-out"
            >
              View Quote List
            </Link>
          </div>
        </div>

        <Link
          href={"/account"}
          className="hover:opacity-70 duration-300 ease-in-out"
        >
          <FaRegUser size={20} color="white" />
        </Link>

        <MenuButton isOpen={isMenuOpen} toggleOpen={handleMenu} />
      </div>

      {isCatalogueClicked && (
        <Portal>
          <CatalogueModal close={() => setCatalogueClicked(false)} />
        </Portal>
      )}

      {isMenuOpen && (
        <Portal>
          <MenuPane
            handleCatalogue={() => {
              setCatalogueClicked(true);
              handleMenu();
            }}
            close={handleMenu}
          />
        </Portal>
      )}

      {isSearchClicked && (
        <Portal>
          <SearchModal close={() => setSearchClicked(false)} />
        </Portal>
      )}
    </div>
  );
};

const MenuButton = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <button
      onClick={() => toggleOpen()}
      className="relative w-10 h-10 md:hidden hover:opacity-70 duration-300 ease-in-out focus:outline-none"
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
          }`}
        />
      </div>
    </button>
  );
};

const MenuPane = ({
  handleCatalogue,
  close,
}: {
  handleCatalogue: () => void;
  close: () => void;
}) => {
  const [isNextStep, setNextStep] = useState<string>();
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={close}
    >
      <div
        className="h-[80vh] max-h-[80vh] w-[90vw] bg-white rounded-md px-6 pb-8 overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center py-6">
          <div className="h-10 w-10 relative">
            <Image
              alt="Oak Scientifics logo"
              src={"/images/oak_logo.png"}
              fill
              className="object-cover"
            />
          </div>
          <button onClick={close}>
            <IoMdClose color="#0f81b0" size={30} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 py-8 border-t border-black border-opacity-30">
          {!isNextStep ? (
            <>
              <Link
                href={"/"}
                className="flex items-center space-x-3"
                onClick={close}
              >
                <CiHome color="#0f81b0" size={30} />
                <div
                  className="h-5 bg-my-blue bg-opacity-70"
                  style={{ width: "2px" }}
                />
                <span className="text-my-blue text-base">Home</span>
              </Link>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setNextStep("solutions")}
              >
                <button
                  className="text-base text-my-blue focus:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/shop");
                  }}
                >
                  Solutions
                </button>
                <FaChevronRight color="0f81b0" size={18} />
              </div>

              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setNextStep("services")}
              >
                <button
                  className="text-base text-my-blue focus:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/services");
                  }}
                >
                  Services
                </button>
                <FaChevronRight color="0f81b0" size={18} />
              </div>

              <Link
                href={"/brands"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Brands
              </Link>

              <button
                className="text-base text-start w-fit text-my-blue focus:underline"
                onClick={handleCatalogue}
              >
                Product Catalogue
              </button>
            </>
          ) : isNextStep === "solutions" ? (
            <>
              <button
                className="flex items-center space-x-3"
                onClick={() => setNextStep(undefined)}
              >
                <FaArrowLeft color="#0f81b0" size={16} />
                <span className="text-base text-my-blue">Go Back</span>
              </button>
              <Link
                href={"/shop/science laboratory"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Science Laboratory
              </Link>
              <Link
                href={"/shop/agriculture"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Agriculture
              </Link>
              <Link
                href={"/shop/geology/geology"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Geology
              </Link>
              <Link
                href={"/shop/industrial laboratory"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                industrial laboratory
              </Link>
              <Link
                href={"/shop/research & analytics"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Research & Analytics
              </Link>
              <Link
                href={
                  "/shop/training mannequins/training mannequins & simulators"
                }
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Training Mannequins
              </Link>
              <Link
                href={"/shop/uncategorized"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                General Products
              </Link>
            </>
          ) : (
            <>
              <button
                className="flex items-center space-x-3"
                onClick={() => setNextStep(undefined)}
              >
                <FaArrowLeft color="#0f81b0" size={16} />
                <span className="text-base text-my-blue">Go Back</span>
              </button>
              <Link
                href={"/services?sheet=setups"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Laboratory Setups and Furnishing
              </Link>
              <Link
                href={"/services?sheet=training"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                Training of End-Users
              </Link>
              <Link
                href={"/services?sheet=support"}
                className="text-base text-my-blue focus:underline"
                onClick={close}
              >
                After-sales Support
              </Link>
            </>
          )}
        </div>

        {!isNextStep && (
          <div className="flex flex-col space-y-6 py-8 border-t border-black border-opacity-30">
            <Link
              href={"/career"}
              className="text-base text-start w-fit text-my-blue focus:underline"
              onClick={close}
            >
              Career
            </Link>
            <Link
              href={"/blog"}
              className="text-base text-start w-fit text-my-blue focus:underline"
              onClick={close}
            >
              Blog
            </Link>
            <Link
              href={"/about-us"}
              className="text-base text-start w-fit text-my-blue focus:underline"
              onClick={close}
            >
              About Us
            </Link>
            <Link
              href={"/contact-us"}
              className="text-base text-start w-fit text-my-blue focus:underline"
              onClick={close}
            >
              Contact Us
            </Link>
            <Link
              href={"/review"}
              className="text-base text-start w-fit text-my-blue focus:underline"
              onClick={close}
            >
              Leave a Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
