"use client";

import AccountTabs from "@/components/AccountTabs";
import { OpErrorModal } from "@/components/ErrorModals";
import { SingleLoading } from "@/components/LazyLoading";
import { LogoutModal } from "@/components/Modals";
import Portal from "@/components/Portal";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GrShieldSecurity } from "react-icons/gr";
import { MdEditLocationAlt } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";

const AccountPage = () => {
  const [navPage, setNavPage] = useState("account");
  const [isLogoutModalOn, setLogoutModalOn] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [isFailed, setFailed] = useState<string>();

  const [userDetails, setUserDetails] = useState<any>({});
  const [orderData, setOrderData] = useState<any[]>([]);
  const [shippingAddress, setShippingAddress] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);

      try {
        const userResponse = await axios.get("/api/customer");
        const orderResponse = await axios.get("/api/order");
        const shippingAddressResponse = await axios.get("/api/shippingAddress");

        if (userResponse.data.success)
          setUserDetails(userResponse.data.customer);

        if (orderResponse.data.success) setOrderData(orderResponse.data.orders);

        if (shippingAddressResponse.data.success)
          setShippingAddress(shippingAddressResponse.data.data);
      } catch (error) {
        setFailed("Failed to retrieve details.");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  return isFetching ? (
    <div className="w-full min-h-[90vh] bg-white flex items-center justify-center">
      <SingleLoading />
    </div>
  ) : (
    <main className="w-full lg:px-14 md:px-8 px-4 min-h-screen pb-20">
      <div className="flex justify-end mt-10">
        <div className="px-4 md:px-7 py-3 md:py-4 max-w-[100%] md:max-w-fit rounded-full border border-black border-opacity-30 flex items-center space-x-4 md:space-x-7 overflow-x-auto hide-scrollbar">
          <div
            className={`flex items-center space-x-2 cursor-pointer duration-300 ease-in-out ${
              navPage === "account"
                ? "text-my-blue opacity-100"
                : "text-black opacity-50 hover:opacity-100"
            }`}
            onClick={() => setNavPage("account")}
          >
            <FaUser size={14} />
            <span className="text-sm text-nowrap">My Account</span>
          </div>

          <div
            className={`flex items-center space-x-2 cursor-pointer duration-300 ease-in-out ${
              navPage === "orders"
                ? "text-my-blue opacity-100"
                : "text-black opacity-50 hover:opacity-100"
            }`}
            onClick={() => setNavPage("orders")}
          >
            <FaShoppingBasket size={14} />
            <span className="text-sm">Orders</span>
          </div>

          <div
            className={`flex items-center space-x-2 cursor-pointer duration-300 ease-in-out ${
              navPage === "details"
                ? "text-my-blue opacity-100"
                : "text-black opacity-50 hover:opacity-100"
            }`}
            onClick={() => setNavPage("details")}
          >
            <RiEditCircleFill size={14} />
            <span className="text-sm text-nowrap">Account Details</span>
          </div>

          <div
            className={`flex items-center space-x-2 cursor-pointer duration-300 ease-in-out ${
              navPage === "shipping"
                ? "text-my-blue opacity-100"
                : "text-black opacity-50 hover:opacity-100"
            }`}
            onClick={() => setNavPage("shipping")}
          >
            <MdEditLocationAlt size={14} />
            <span className="text-sm">Shipping</span>
          </div>

          <div
            className={`flex items-center space-x-2 cursor-pointer duration-300 ease-in-out ${
              navPage === "security"
                ? "text-my-blue opacity-100"
                : "text-black opacity-50 hover:opacity-100"
            }`}
            onClick={() => setNavPage("security")}
          >
            <GrShieldSecurity size={14} />
            <span className="text-sm">Security</span>
          </div>

          <div
            className={`flex items-center space-x-2 cursor-pointer text-black opacity-50 hover:opacity-100 duration-300 ease-in-out`}
            onClick={() => setLogoutModalOn(true)}
          >
            <SlLogout size={14} />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      <AccountTabs
        tab={navPage}
        switchTab={(t) => setNavPage(t)}
        data={{ userDetails, orderData, shippingAddress }}
      />

      {isLogoutModalOn && (
        <Portal>
          <LogoutModal close={() => setLogoutModalOn(false)} />
        </Portal>
      )}

      {isFailed && (
        <Portal>
          <OpErrorModal msg={isFailed} close={() => setFailed(undefined)} />
        </Portal>
      )}
    </main>
  );
};

export default AccountPage;
