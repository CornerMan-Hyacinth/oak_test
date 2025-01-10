import { FaRegEdit, FaUserAlt } from "react-icons/fa";
import { TitleText } from "./Text";
import {
  MdEmail,
  MdLocalPhone,
  MdLocationPin,
  MdOutlineTune,
} from "react-icons/md";
import { FaEye, FaEyeSlash, FaFolderOpen } from "react-icons/fa6";
import { IoCard } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { CardLoading, SingleLoading } from "./LazyLoading";
import { FiLoader, FiSearch } from "react-icons/fi";
import Image from "next/image";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import Portal from "./Portal";
import Picker from "./Picker";
import { locationData } from "@/lib/locationData";
import axios from "axios";

const AccountTabs = ({
  tab,
  switchTab,
}: {
  tab: string;
  switchTab: (tab: string) => void;
}) => {
  const renderTabs = () => {
    switch (tab) {
      case "account":
        return <MyAccountTab switchTab={switchTab} />;

      case "orders":
        return <OrderTab />;

      case "details":
        return <DetailsTab />;

      case "shipping":
        return <ShippingTab />;

      case "security":
        return <SecurityTab />;

      default:
        break;
    }
  };

  return renderTabs();
};

export default AccountTabs;

const MyAccountTab = ({ switchTab }: { switchTab: (tab: string) => void }) => {
  const [isIncognito, setIncognito] = useState(true);
  const [isFetching, setFetching] = useState(true);

  return (
    <>
      <h1 className="text-2xl text-black mt-10">
        <TitleText weight="regular">
          Welcome, <span className="text-my-blue">John</span>
        </TitleText>
      </h1>
      {!isFetching ? (
        <div className="flex justify-center space-x-10 mt-10">
          {[...Array(3)].map((_, index) => (
            <CardLoading key={index} className="w-[25vw] h-60" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap lg:justify-center lg:space-x-10 mt-10">
          <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[40vw] min-h-60 px-4 py-6 rounded-lg bg-my-gray bg-opacity-20 lg:mr-0 md:mr-8 mr-4">
            <div className="flex items-center justify-between">
              <span className="text-black text-lg">Account Details</span>
              <button
                className="text-black hover:scale-110 duration-300 ease-in-out"
                onClick={() => switchTab("details")}
              >
                <FaRegEdit size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mt-5">
              <FaUserAlt color="black" size={16} />
              <span className="text-black text-base opacity-70">John Doe</span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <MdEmail color="black" size={16} />
              <span className="text-black text-base opacity-70">
                johndoe@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <MdLocalPhone color="black" size={16} />
              <span className="text-black text-base opacity-70">
                +2348083784933
              </span>
            </div>
          </div>

          <div className="xl:w-[25vw] lg:w-[26vw] md:w-[35vw] w-[40vw] min-h-60 px-4 py-6 rounded-lg bg-my-gray bg-opacity-20 lg:mr-0 md:mr-8 mr-4">
            <div className="flex items-center justify-between">
              <span className="text-black text-lg">Shipping Info</span>
              <button
                className="text-black hover:scale-110 duration-300 ease-in-out"
                onClick={() => switchTab("shipping")}
              >
                <FaRegEdit size={20} />
              </button>
            </div>
            <div className="flex items-start space-x-4 mt-5">
              <div>
                <MdLocationPin color="black" size={16} className="mt-1" />
              </div>
              <p className="text-black text-base flex-grow opacity-70">
                3 Grace Avenue, off Obiwali Road, Port-Harcourt 500111, Rivers
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <MdEmail color="black" size={16} />
              <span className="text-black text-base opacity-70">
                johndoe@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <MdLocalPhone color="black" size={16} />
              <span className="text-black text-base opacity-70">
                +2348083784933
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-20">
        <h2 className="text-2xl text-black">
          <TitleText weight="regular">My Orders</TitleText>
        </h2>
        <button
          className="text-base text-black hover:text-my-blue underline duration-300 ease-in-out"
          onClick={() => switchTab("orders")}
        >
          See more info
        </button>
      </div>

      {!isFetching ? (
        <div className="flex justify-center space-x-10 mt-10">
          {[...Array(4)].map((_, index) => (
            <CardLoading key={index} className="w-[15vw] h-32" />
          ))}
        </div>
      ) : (
        <div className="flex justify-center md:space-x-10 space-x-5 mt-10">
          <div className="py-4 px-8 xl:w-[15vw] lg:w-[17vw] w-[22vw]  border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
            <span className="text-black lg:text-lg text-base text-center opacity-70">
              Total Orders
            </span>
            <span className="text-black text-3xl">12</span>
          </div>
          <div className="py-4 px-8 xl:w-[15vw] lg:w-[17vw] w-[22vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
            <span className="text-black lg:text-lg text-base text-center opacity-70">
              In Progress
            </span>
            <span className="text-black text-3xl">1</span>
          </div>
          <div className="py-4 px-8 xl:w-[15vw] lg:w-[17vw] w-[22vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
            <span className="text-black lg:text-lg text-base text-center opacity-70">
              Delivered
            </span>
            <span className="text-black text-3xl">8</span>
          </div>
          <div className="py-4 px-8 xl:w-[15vw] lg:w-[17vw] w-[22vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
            <span className="text-black lg:text-lg text-base text-center opacity-70">
              Canceled
            </span>
            <span className="text-black text-3xl">3</span>
          </div>
        </div>
      )}
    </>
  );
};

const OrderTab = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("This Week");

  const [isFetching, setFetching] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  useEffect(() => {}, [filter, sort]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <h1 className="text-2xl text-black mt-10">
        <TitleText weight="regular">Order Details</TitleText>
      </h1>

      {isFetching ? (
        <div className="flex justify-center space-x-10 mt-10">
          {[...Array(5)].map((_, index) => (
            <CardLoading key={index} className="w-[25vw] h-32" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-center space-x-10 mt-10">
            <div className="py-4 px-4 xl:w-[15vw] lg:w-[18vw] md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70">
                Total Orders
              </span>
              <span className="text-black text-xl">12</span>
            </div>
            <div className="py-4 px-4 xl:w-[15vw] lg:w-[18vw] md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70">Delivered</span>
              <span className="text-black text-xl">10</span>
            </div>
            <div className="py-4 px-4 xl:w-[15vw] lg:w-[18vw] md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70">
                Total Returned
              </span>
              <span className="text-black text-xl">2</span>
            </div>
            <div className="py-4 px-4 xl:w-[15vw] lg:w-[18vw] md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md hidden lg:flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70">
                Total Order Value
              </span>
              <span className="text-black text-xl">$1500</span>
            </div>
            <div className="py-4 px-4 xl:w-[15vw] lg:w-[18vw] md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md hidden lg:flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70">
                Average Order Value
              </span>
              <span className="text-black text-xl">$450</span>
            </div>
          </div>

          <div className="flex lg:hidden justify-center space-x-10 mt-5">
            <div className="py-4 px-4 md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70 text-center">
                Total Order Value
              </span>
              <span className="text-black text-xl">$1500</span>
            </div>
            <div className="py-4 px-4 md:w-[25vw] w-[27vw] border border-black border-opacity-20 rounded-md flex flex-col space-y-4 justify-center items-center">
              <span className="text-black text-base opacity-70 text-center">
                Average Order Value
              </span>
              <span className="text-black text-xl">$450</span>
            </div>
          </div>
        </>
      )}

      <div className="w-full flex justify-evenly items-center mt-20">
        <div
          className={`flex-grow flex items-center space-x-4 justify-center pb-4 ${
            filter === "all"
              ? "opacity-100 border-my-blue border-opacity-100"
              : "opacity-50 border-black border-opacity-20 hover:opacity-70"
          } duration-300 ease-in-out cursor-pointer`}
          style={{ borderBottomWidth: "4px" }}
          onClick={() => setFilter("all")}
        >
          <span className="lg:text-xl md:text-lg text-base">All Orders</span>
          <div
            className={`md:px-2 px-1 py-1 min-w-6 flex justify-center items-center rounded-md text-white text-xs ${
              filter === "all" ? "bg-my-blue" : "bg-my-gray"
            }`}
          >
            12
          </div>
        </div>

        <div
          className={`flex-grow flex items-center space-x-4 justify-center pb-4 ${
            filter === "progress"
              ? "opacity-100 border-my-blue border-opacity-100"
              : "opacity-50 border-black border-opacity-20 hover:opacity-70"
          } duration-300 ease-in-out cursor-pointer`}
          style={{ borderBottomWidth: "4px" }}
          onClick={() => setFilter("progress")}
        >
          <span className="lg:text-xl md:text-lg text-base">In Progress</span>
          <div
            className={`md:px-2 px-1 py-1 min-w-6 flex justify-center items-center rounded-md text-white text-xs ${
              filter === "progress" ? "bg-my-blue" : "bg-my-gray"
            }`}
          >
            1
          </div>
        </div>

        <div
          className={`flex-grow flex items-center space-x-4 justify-center pb-4 ${
            filter === "delivered"
              ? "opacity-100 border-my-blue border-opacity-100"
              : "opacity-50 border-black border-opacity-20 hover:opacity-70"
          } duration-300 ease-in-out cursor-pointer`}
          style={{ borderBottomWidth: "4px" }}
          onClick={() => setFilter("delivered")}
        >
          <span className="lg:text-xl md:text-lg text-base">Delivered</span>
          <div
            className={`md:px-2 px-1 py-1 min-w-6 flex justify-center items-center rounded-md text-white text-xs ${
              filter === "delivered" ? "bg-my-blue" : "bg-my-gray"
            }`}
          >
            8
          </div>
        </div>

        <div
          className={`flex-grow flex items-center space-x-4 justify-center pb-4 ${
            filter === "canceled"
              ? "opacity-100 border-my-blue border-opacity-100"
              : "opacity-50 border-black border-opacity-20 hover:opacity-70"
          } duration-300 ease-in-out cursor-pointer`}
          style={{ borderBottomWidth: "4px" }}
          onClick={() => setFilter("canceled")}
        >
          <span className="lg:text-xl md:text-lg text-base">Canceled</span>
          <div
            className={`md:px-2 px-1 py-1 min-w-6 flex justify-center items-center rounded-md text-white text-xs ${
              filter === "canceled" ? "bg-my-blue" : "bg-my-gray"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-5 space-x-4">
        <div className="flex items-center space-x-4 lg:w-[25vw] md:w-[35vw] w-[50vw] px-4 py-2 rounded-full border border-black border-opacity-30 focus-within:border-opacity-100 duration-300 ease-in-out">
          <FiSearch color="rgba(0,0,0,.5)" size={16} />
          <input
            type="search"
            placeholder="Search all orders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow text-black text-sm outline-none bg-transparent"
          />
        </div>

        <div ref={ref} className="relative">
          <div
            className="flex min-w-28 items-center space-x-4 px-4 py-2 rounded-full border border-black border-opacity-30 focus-within:border-opacity-100 duration-300 ease-in-out cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSortOpen((prev) => !prev);
            }}
          >
            <MdOutlineTune color="rgba(0,0,0,.5)" size={16} />
            <span className="text-sm text-black">{sort}</span>
          </div>
          {isSortOpen && (
            <div className="flex flex-col items-start absolute bottom-0 w-full bg-white shadow-md shadow-gray-500 transform-all translate-y-full rounded-md z-20">
              <button
                className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                  sort === "All Periods"
                    ? "bg-opacity-30"
                    : "bg-opacity-0 hover:bg-opacity-20"
                }`}
                onClick={() => {
                  setSort("All Periods");
                  setSortOpen(false);
                }}
              >
                All Periods
              </button>

              <button
                className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                  sort === "This Week"
                    ? "bg-opacity-30"
                    : "bg-opacity-0 hover:bg-opacity-20"
                }`}
                onClick={() => {
                  setSort("This Week");
                  setSortOpen(false);
                }}
              >
                This Week
              </button>

              <button
                className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                  sort === "This Month"
                    ? "bg-opacity-30"
                    : "bg-opacity-0 hover:bg-opacity-20"
                }`}
                onClick={() => {
                  setSort("This Month");
                  setSortOpen(false);
                }}
              >
                This Month
              </button>

              <button
                className={`px-4 py-2 bg-black text-black text-start text-sm w-full ${
                  sort === "This Year"
                    ? "bg-opacity-30"
                    : "bg-opacity-0 hover:bg-opacity-20"
                }`}
                onClick={() => {
                  setSort("This Year");
                  setSortOpen(false);
                }}
              >
                This Year
              </button>
            </div>
          )}
        </div>
      </div>

      {isFetching ? (
        <div className="h-40 w-full flex flex-col justify-center items-center opacity-50">
          <FiLoader size={50} color="black" />
          <span className="text-xl text-black mt-5">
            Fetching Your Orders...
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto max-w-[100vw] border mt-10 relative scrollbar-thin scrollbar-thumb-[#3D3A3A] scrollbar-track-[#C5C4C4] scrollable-content">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="md:text-base text-sm bg-my-gray bg-opacity-20 text-black text-nowrap">
                <th className="py-3 pl-6 pr-6">Order ID</th>
                <th className="py-3 pr-6">Products</th>
                <th className="py-3 pr-6">Payment Status</th>
                <th className="py-3 pr-6">Order Status</th>
                <th className="py-3 pr-6">Total Price</th>
                <th className="py-3 pr-6">Date Ordered</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`text-black md:text-base text-sm border-b border-black border-opacity-20 duration-300 ease-in-out cursor-default relative`}
                >
                  <td className="py-3 pl-6 pr-6">#430902</td>
                  <td className="py-3 pr-6 flex items-center space-x-1">
                    {[...Array(3)].map((_, index) => (
                      <span
                        key={index}
                        className="h-8 w-8 relative rounded-full overflow-hidden"
                      >
                        <Image
                          alt="product image"
                          src={"/images/oakProductImg3.png"}
                          fill
                          className="object-cover"
                        />
                      </span>
                    ))}
                  </td>
                  <td className="py-3 pr-6">
                    <span className={`px-4 py-2 bg-[#198B19] text-white`}>
                      Paid
                    </span>
                  </td>
                  <td className="py-3 pr-6">
                    <span className={`px-4 py-2 bg-[#198B19] text-white`}>
                      Delivered
                    </span>
                  </td>
                  <td className="py-3 pr-6">$ 129.99</td>
                  <td className="py-3 pr-6">23 Jan 2024</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="h-72 w-full flex flex-col justify-center items-center">
              <FaFolderOpen size={40} color="rgba(0,0,0,.5)" />
              <span className="text-xl text-black opacity-50 mt-5">
                You have no orders yet.
              </span>
              <Button
                text="Go to shop"
                isDark
                handleClick={() => router.push("/shop")}
              />
            </div>
          )}
        </div>
      )}

      <div className="w-full mt-20 flex flex-col items-center justify-center">
        <TitleText weight="bold" className="text-2xl text-my-blue">
          Having issues with your order?
        </TitleText>
        <p className="text-black text-lg opacity-50 mt-3 lg:w-1/3 md:w-3/4 w-full text-center mb-5">
          Contact our support team to help attend to your enquiries or solve
          your problem.
        </p>
        <Button
          text="Contact Us"
          isDark
          handleClick={() => router.push("/contact-us")}
        />
      </div>
    </>
  );
};

const DetailsTab = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [isErrorModalOn, setErrorModalOn] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    phone: "",
  });

  // Calculate the date 18 years ago
  const today = new Date();
  const hundredYearsAgo = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minDate = hundredYearsAgo.toISOString().split("T")[0];
  const maxDate = eighteenYearsAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const enableBtn =
    inputs.firstName !== "" &&
    inputs.lastName !== "" &&
    inputs.email !== "" &&
    inputs.phone !== "";

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleBtn = async () => {
    if (!enableBtn) return null;
    setProcessing(true);

    try {
    } catch (error) {
      setErrorModalOn(true);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {};
  }, []);

  return (
    <>
      <h1 className="text-2xl text-black mt-10">
        <TitleText weight="regular">Account Details</TitleText>
      </h1>

      <div
        className={`flex flex-col items-center ${
          isProcessing ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className="lg:w-1/2 md:w-3/4 w-full px-4 md:px-10 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="text-black text-sm opacity-70"
            >
              First Name <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              value={inputs.firstName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="lastName" className="text-black text-sm opacity-70">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              value={inputs.lastName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="email" className="text-black text-sm opacity-70">
              Email Address <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={inputs.email}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="phone" className="text-black text-sm opacity-70">
              Phone/Mobile <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone/mobile number"
              value={inputs.phone}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="w-full flex items-center justify-between space-x-10 mt-7 mb-10">
            <div className="w-1/2">
              <label htmlFor="gender" className="text-black text-sm opacity-70">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={inputs.gender}
                onChange={handleInputs}
                className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
              >
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="birthday"
                className="text-black text-sm opacity-70"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                min={minDate}
                max={maxDate}
                value={inputs.birthday}
                onChange={handleInputs}
                className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <Button text="Send Message" isDark handleClick={handleBtn} />
        </div>
      </div>
    </>
  );
};

const ShippingTab = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [isErrorModalOn, setErrorModalOn] = useState(false);
  const [isPickerOn, setPickerOn] = useState<string>();
  const [regionData, setRegionData] = useState<any[]>([]);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    region: "",
    city: "",
    zip: "",
    address: "",
  });

  const enableBtn =
    inputs.firstName !== "" &&
    inputs.lastName !== "" &&
    inputs.phone !== "" &&
    inputs.address !== "" &&
    inputs.city !== "" &&
    inputs.region !== "" &&
    inputs.country !== "" &&
    inputs.zip !== "";

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocation = async (v: string) => {
    setInputs((prev) => ({ ...prev, [isPickerOn as string]: v }));

    if (isPickerOn === "country") {
      const apiKey = process.env.NEXT_PUBLIC_CSC_API_KEY;
      const { code } = locationData.find((item) => item.name === v)!;

      axios
        .get(`https://api.countrystatecity.in/v1/countries/${code}/states`, {
          headers: {
            "X-CSCAPI-KEY": apiKey,
          },
        })
        .then((response) => {
          const regions = response.data.map((item: any) => item.name);
          setRegionData(regions);
        })
        .catch((error) => {
          setErrorModalOn(true);
        });
    }
  };

  const handleBtn = async () => {
    if (!enableBtn) return null;
    setProcessing(true);

    try {
    } catch (error) {
      setErrorModalOn(true);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {};
  }, []);

  return (
    <>
      <h1 className="text-2xl text-black mt-10">
        <TitleText weight="regular">Shipping Address</TitleText>
      </h1>

      <div
        className={`flex flex-col items-center ${
          isProcessing ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className="lg:w-1/2 md:w-3/4 w-full px-4 md:px-10 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="text-black text-sm opacity-70"
            >
              First Name <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              value={inputs.firstName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="lastName" className="text-black text-sm opacity-70">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              value={inputs.lastName}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="mt-7 w-full">
            <label htmlFor="phone" className="text-black text-sm opacity-70">
              Phone/Mobile <span className="text-red-800 text-xs">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="e.g. +2348003000034"
              value={inputs.phone}
              onChange={handleInputs}
              className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
            />
          </div>

          <div className="w-full flex items-center justify-between space-x-10 mt-7">
            <div className="w-1/2">
              <label htmlFor="phone" className="text-black text-sm opacity-70">
                Country <span className="text-red-800 text-xs">*</span>
              </label>
              <button
                className="flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 w-full"
                onClick={() => setPickerOn("country")}
              >
                <span
                  className={`text-black text-base ${
                    inputs.country === "" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {inputs.country === "" ? "Select a country" : inputs.country}
                </span>
                <IoMdArrowDropdown />
              </button>
            </div>

            <div
              className={`w-1/2 ${
                regionData.length > 0 ? "" : "pointer-events-none"
              }`}
            >
              <label htmlFor="phone" className="text-black text-sm opacity-70">
                Region/State <span className="text-red-800 text-xs">*</span>
              </label>
              <button
                className="flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 w-full"
                onClick={() => setPickerOn("region")}
              >
                <span
                  className={`text-black text-base ${
                    inputs.region === "" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {inputs.region === ""
                    ? "Select a region/state"
                    : inputs.region}
                </span>
                <IoMdArrowDropdown />
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-between space-x-10 mt-7 mb-10">
            <div className="w-1/2">
              <label htmlFor="city" className="text-black text-sm opacity-70">
                City <span className="text-red-800 text-xs">*</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter your city"
                value={inputs.city}
                onChange={handleInputs}
                className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="zip" className="text-black text-sm opacity-70">
                Zip <span className="text-red-800 text-xs">*</span>
              </label>
              <input
                type="text"
                name="zip"
                id="zip"
                placeholder="Enter zip/postal code"
                value={inputs.zip}
                onChange={handleInputs}
                className="w-full pb-1 text-black text-base border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100 mt-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <Button text="Save Shipping Address" isDark handleClick={handleBtn} />
          <p className="text-black text-sm mt-5 text-center">
            Clicking the{" "}
            <span className="text-my-blue">Save Shipping Address</span> button
            will set your entered data as your default shipping address.
          </p>
        </div>
      </div>

      {isPickerOn && (
        <Portal>
          <Picker
            title={`Select a ${isPickerOn}`}
            enableSearch
            options={
              isPickerOn === "country"
                ? [...locationData.map((item) => item.name)]
                : regionData
            }
            currentValue={
              isPickerOn === "country" ? inputs.country : inputs.region
            }
            updateValue={handleLocation}
            close={() => setPickerOn(undefined)}
          />
        </Portal>
      )}
    </>
  );
};

const SecurityTab = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [isErrorModalOn, setErrorModalOn] = useState<string>();
  const [inputs, setInputs] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isCurrentSeen, setCurrentSeen] = useState(false);
  const [isNewSeen, setNewSeen] = useState(false);
  const [isConfirmSeen, setConfirmSeen] = useState(false);

  const enableBtn =
    inputs.current !== "" && inputs.new !== "" && inputs.confirm !== "";

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    name === "confirm" && value !== inputs.new
      ? setErrorModalOn("confirm")
      : setErrorModalOn(undefined);
  };

  const handleBtn = async () => {
    if (!enableBtn) return null;
    setProcessing(true);

    try {
    } catch (error: any) {
      switch (error.response.status) {
        case 404:
          setErrorModalOn("invalid");
          break;

        case 500:
          setErrorModalOn("error");

        default:
          break;
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl text-black mt-10">
        <TitleText weight="regular">Change Password</TitleText>
      </h1>

      <div className={`flex flex-col items-center relative`}>
        <div
          className={`lg:w-1/2 md:w-3/4 w-full px-4 md:px-10 py-10 rounded-lg border border-black border-opacity-30 mt-14 flex flex-col items-center ${
            isProcessing
              ? "pointer-events-none opacity-50"
              : "pointer-events-auto opacity-100"
          }`}
        >
          <div className="w-full">
            <label htmlFor="current" className="text-black text-sm opacity-70">
              Current Password <span className="text-red-800 text-xs">*</span>
            </label>
            <div className="w-full flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100">
              <input
                type={isCurrentSeen ? "text" : "password"}
                name="current"
                id="current"
                placeholder="Enter your current password"
                value={inputs.current}
                onChange={handleInputs}
                className="flex-grow text-black text-base outline-none bg-transparent"
              />
              <button
                className="hover:scale-110 duration-300 ease-in-out"
                onClick={() => setCurrentSeen((prev) => !prev)}
              >
                {isCurrentSeen ? (
                  <FaEye color="black" size={18} />
                ) : (
                  <FaEyeSlash color="black" size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="w-full mt-7">
            <label htmlFor="new" className="text-black text-sm opacity-70">
              New Password <span className="text-red-800 text-xs">*</span>
            </label>
            <div className="w-full flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100">
              <input
                type={isNewSeen ? "text" : "password"}
                name="new"
                id="new"
                placeholder="Enter your new password"
                value={inputs.new}
                onChange={handleInputs}
                className="flex-grow text-black text-base outline-none bg-transparent"
              />
              <button
                className="hover:scale-110 duration-300 ease-in-out"
                onClick={() => setNewSeen((prev) => !prev)}
              >
                {isNewSeen ? (
                  <FaEye color="black" size={18} />
                ) : (
                  <FaEyeSlash color="black" size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="w-full mt-7">
            <label htmlFor="confirm" className="text-black text-sm opacity-70">
              Confirm Password <span className="text-red-800 text-xs">*</span>
            </label>
            <div className="w-full flex items-center justify-between space-x-4 mt-3 pb-1 border-b border-black border-opacity-30 focus:border-my-blue focus:border-opacity-100">
              <input
                type={isConfirmSeen ? "text" : "password"}
                name="confirm"
                id="confirm"
                placeholder="Enter your confirm password"
                value={inputs.confirm}
                onChange={handleInputs}
                className="flex-grow text-black text-base outline-none bg-transparent"
              />
              <button
                className="hover:scale-110 duration-300 ease-in-out"
                onClick={() => setConfirmSeen((prev) => !prev)}
              >
                {isConfirmSeen ? (
                  <FaEye color="black" size={18} />
                ) : (
                  <FaEyeSlash color="black" size={18} />
                )}
              </button>
            </div>
          </div>

          <Button text="Save" isDark handleClick={handleBtn} />
        </div>

        {isProcessing && (
          <div className="absolute w-full h-full flex items-center justify-center">
            <SingleLoading />
          </div>
        )}
      </div>
    </>
  );
};
