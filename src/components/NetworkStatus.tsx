"use client";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { IoMdClose } from "react-icons/io";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

const NetworkStatus = () => {
  const { isOnline, connectionQuality, latency } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="fixed bottom-0 w-full min-h-20 py-4 bg-my-gray border-2 border-white flex flex-col md:flex-row items-center justify-center md:justify-between lg:px-14 md:px-10 px-4">
        <RiSignalWifiErrorFill color="white" size={35} />
        <div>
          <p className="text-sm text-white opacity-70">
            No Internet Connection
          </p>
          <p className="text-base text-white">
            Please check your internet connection and try again.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center justify-center space-x-4 border border-white text-white px-10 py-2 hover:bg-white hover:text-black duration-300 ease-in-out">
            <TbRefresh size={18} />
            <span>Check</span>
          </button>
        </div>
      </div>
    );
  }
};

export default NetworkStatus;
