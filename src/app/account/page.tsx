"use client";

import AccountTabs from "@/components/AccountTabs";
import { LogoutModal } from "@/components/Modals";
import Portal from "@/components/Portal";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GrShieldSecurity } from "react-icons/gr";
import { MdEditLocationAlt } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";

// hello

const AccountPage = () => {
  const [navPage, setNavPage] = useState("account");
  const [isLogoutModalOn, setLogoutModalOn] = useState(false);

  return (
    <main className="w-full lg:px-14 md:px-8 px-4 min-h-screen pb-20">
      <div className="flex justify-end mt-10">
        <div className="px-7 py-4 max-w-[90%] md:max-w-fit rounded-full border border-black border-opacity-30 flex items-center space-x-7 overflow-x-auto hide-scrollbar">
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

      <AccountTabs tab={navPage} switchTab={(t) => setNavPage(t)} />

      {isLogoutModalOn && (
        <Portal>
          <LogoutModal close={() => setLogoutModalOn(false)} />
        </Portal>
      )}
    </main>
  );
};

export default AccountPage;
