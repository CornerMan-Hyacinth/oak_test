import { IoMdClose } from "react-icons/io";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { BodyText } from "./Text";
import { BiSolidMessageRoundedError } from "react-icons/bi";

export const NetworkErrorModal = ({
  refresh,
  close,
}: {
  refresh: () => void;
  close: () => void;
}) => {
  return (
    <div className="fixed bottom-0 w-full min-h-20 py-4 bg-my-gray border-2 border-white flex flex-col md:flex-row items-center justify-center md:justify-between lg:px-14 md:px-10 px-4">
      <RiSignalWifiErrorFill color="white" size={35} />
      <div>
        <p className="text-sm text-white opacity-70">
          An unexpected error occurred.
        </p>
        <p className="text-base text-white">
          Check your internet connection and refresh!
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center space-x-4 border border-white text-white px-10 py-2 hover:bg-white hover:text-black duration-300 ease-in-out"
          onClick={() => {
            refresh();
            close();
          }}
        >
          <TbRefresh size={18} />
          <span>Refresh</span>
        </button>

        <button onClick={close}>
          <IoMdClose color="white" size={20} />
        </button>
      </div>
    </div>
  );
};

export const OpErrorModal = ({
  msg,
  close,
}: {
  msg: string;
  close: () => void;
}) => {
  return (
    <div className="fixed bottom-0 w-full min-h-20 py-4 bg-my-gray border-2 border-white flex flex-col md:flex-row items-center justify-center md:justify-between lg:px-14 md:px-10 px-4">
      <BiSolidMessageRoundedError color="white" size={35} />
      <div>
        <p className="text-sm text-white opacity-70">
          An unexpected error occurred.
        </p>
        <p className="text-base text-white">
          {msg} Please <BodyText weight="medium">try again</BodyText>.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center space-x-4 border border-white text-white px-10 py-2 hover:bg-white hover:text-black duration-300 ease-in-out"
          onClick={close}
        >
          <TbRefresh size={18} />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};
