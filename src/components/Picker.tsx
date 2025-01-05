import { useEffect, useState } from "react";
import { TitleText } from "./Text";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Picker = ({
  title,
  enableSearch,
  options,
  currentValue,
  updateValue,
  close,
}: {
  title: string;
  enableSearch?: boolean;
  options: string[];
  currentValue: string;
  updateValue: (v: string) => void;
  close: () => void;
}) => {
  const [search, setSearch] = useState("");
  const [optionData, setOptionData] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (value.trimEnd() !== "") {
      const lowerValue = value.toLowerCase();
      const r = options
        .filter((option) => option.toLowerCase().includes(lowerValue))
        .sort((a, b) => {
          const nameA = a.toLowerCase();
          const nameB = b.toLowerCase();

          // Check if `name` starts with the search substring
          const startsWithA = nameA.startsWith(lowerValue) ? 0 : 1;
          const startsWithB = nameB.startsWith(lowerValue) ? 0 : 1;

          // Prioritize items that start with the substring
          if (startsWithA !== startsWithB) return startsWithA - startsWithB;

          // If both start or neither starts, fallback to alphabetical order
          return nameA.localeCompare(nameB);
        });
      setOptionData(r);
    } else {
      setOptionData(options);
    }
  };

  useEffect(() => {
    setOptionData(options);
  }, [options]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black dark:bg-white bg-opacity-30 flex justify-center items-center"
      onClick={close}
    >
      <div
        className="bg-white dark:bg-black xl:w-[25vw] lg:w-[30vw] md:w-[40vw] w-[80vw] rounded-lg px-5 py-7 max-h-[90vh] overflow-y-scroll hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl text-black dark:text-white mb-5">
          <TitleText weight="bold">{title}</TitleText>
        </h3>

        {enableSearch && (
          <div className="flex items-center space-x-4 w-full h-10 rounded-full border border-black opacity-30 focus-within:opacity-100 px-4 mb-5">
            <FiSearch color="black" size={18} />
            <input
              type="text"
              placeholder="Start typing to search..."
              value={search}
              onChange={handleSearch}
              className="outline-none bg-transparent text-sm text-black flex-grow"
            />
            {search !== "" && (
              <button
                className="p-1 rounded-full bg-black hover:bg-my-blue duration-300 ease-in-out"
                onClick={() => {
                  setSearch("");
                  setOptionData(options);
                }}
              >
                <IoMdClose color="white" size={14} />
              </button>
            )}
          </div>
        )}

        {optionData.length > 0 ? (
          optionData.map((option, index) => (
            <div
              key={index}
              className={`${
                option === currentValue
                  ? "bg-my-blue"
                  : "bg-transparent hover:bg-black hover:dark:bg-white hover:bg-opacity-5"
              } bg-opacity-10 px-5 py-3 flex items-center space-x-4 w-full cursor-pointer`}
              onClick={() => {
                updateValue(option);
                close();
              }}
            >
              <div
                className={`h-4 w-4 rounded-full flex justify-center items-center border-2 ${
                  option === currentValue
                    ? "border-my-blue border-opacity-100"
                    : "border-black border-opacity-20"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    option === currentValue ? "bg-my-blue" : "bg-transparent"
                  }`}
                />
              </div>
              <span
                className={`${
                  option === currentValue
                    ? "text-my-blue"
                    : "text-black dark:text-white"
                } text-sm`}
              >
                {option}
              </span>
            </div>
          ))
        ) : (
          <div className="mt-3 text-start text-black text-base opacity-50">
            No option
          </div>
        )}
      </div>
    </div>
  );
};

export default Picker;
