import Image from "next/image";
import { MdClose } from "react-icons/md";
import { BodyText, TitleText } from "./Text";
import { useState } from "react";
import { FaFilePdf, FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "./Button";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const DetailsModal = ({
  product,
  close,
}: {
  product: any;
  close: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white xl:w-[50vw] lg:w-[75vw] w-[90vw] rounded-lg px-5 py-5 max-h-[90vh] shadow-xl shadow-my-gray flex flex-col md:flex-row items-center justify-between space-x-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/3 h-64 rounded-md relative">
          <Image
            alt={`${product.name} image`}
            src={product.imageUrls[0]}
            fill
            className="object-cover bg-my-gray bg-opacity-20"
          />
        </div>

        <div className="flex flex-col w-full md:w-2/3 mt-7 md:mt-0">
          <button
            className="self-end text-black hover:text-my-blue hover:scale-110 duration-300 ease-in-out"
            onClick={close}
          >
            <MdClose size={24} />
          </button>
          <h3 className="text-lg text-black mt-2 mb-4">
            <TitleText weight="bold">{product.name}</TitleText>
          </h3>
          <p className="text-sm text-black opacity-70 mb-6 line-clamp-5 text-ellipsis">
            {product.description}
          </p>
          <span className="text-black text-sm">SKU - {product.sku}</span>
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center space-x-4">
              <BodyText weight="bold" className="text-lg text-my-blue">
                ${product.price}
              </BodyText>
              <div className="flex items-center space-x-4 border border-black rounded-full py-2 px-4">
                <button
                  className={`text-black hover:text-my-blue duration-300 ease-in-out ${
                    quantity === 1
                      ? "opacity-50 pointer-events-none"
                      : "opacity-100"
                  }`}
                  onClick={() =>
                    quantity !== 1 && setQuantity((prev) => --prev)
                  }
                >
                  <FaMinus size={16} />
                </button>
                <span className="text-black text-sm">{quantity}</span>
                <button
                  className={`text-black hover:text-my-blue duration-300 ease-in-out`}
                  onClick={() => setQuantity((prev) => ++prev)}
                >
                  <FaPlus size={16} />
                </button>
              </div>
            </div>

            <button className="bg-my-gray text-sm text-white rounded-md py-3 px-7 hover:bg-my-blue duration-300 ease-in-out">
              Add to quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CatalogueModal = ({ close }: { close: () => void }) => {
  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white xl:w-[50vw] lg:w-[75vw] w-[90vw] rounded-lg px-5 py-10 max-h-[90vh] shadow-xl shadow-my-gray flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <FaFilePdf color="rgba(0,0,0,.5)" size={50} />
        <TitleText weight="bold" className="text-2xl text-my-blue mt-12 mb-5">
          Get our catalogue free
        </TitleText>
        <p className="text-black text-base mb-5">
          Download and browse through our extensive product catalogue.
        </p>

        <Button text="Download Catalogue" isDark handleClick={() => {}} />
      </div>
    </div>
  );
};

export const ReviewModal = ({ close }: { close: () => void }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");

  const starColor = (star: number) => {
    switch (rating) {
      case 1:
        return star === 1 ? "#D70B0B" : "#000";

      case 2:
        return star <= 2 ? "#F24114" : "#000";

      case 3:
        return star <= 3 ? "#F5DB13" : "#000";

      case 4:
        return star <= 4 ? "#49EF0D" : "#000";

      case 5:
        return star <= 5 ? "#19B40A" : "#000";

      default:
        return "#000";
    }
  };

  const placeholderText = () => {
    switch (rating) {
      case 1:
        return "What made your experience worse? What are we doing wrong?";

      case 2:
        return "What went bad? What areas do we need to improve?";

      case 3:
        return "What do you like and dislike? How do we deliver our services better?";

      case 4:
        return "What made your experience great? What are we doing well?";

      case 5:
        return "What surprised you about us? Tell us how we exceeded your expectations!";

      default:
        break;
    }
  };

  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-end max-h-[100vh] overflow-y-auto"
      onClick={close}
    >
      <div
        className="bg-[#F3F9FB] w-full min-h-[90vh] rounded-t-2xl overflow-hidden pb-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full min-h-20 bg-white items-center justify-center">
          <div className="w-1/3 flex items-center space-x-2">
            <Image
              alt="Oak Scientifics logo"
              src={"/images/oak_logo.png"}
              width={40}
              height={40}
              className="object-cover"
            />
            <TitleText weight="bold" className="text-2xl text-my-blue">
              Leave a review for us
            </TitleText>
          </div>
        </div>

        <div className="flex w-full justify-center flex-grow">
          <div className="w-1/3 mt-10">
            <BodyText weight="medium" className="text-black text-base mb-5">
              Your patronage means a lot to us and we hope to continually
              deliver the best of our services to you. Dropping a
              review/feedback will help us in achieving this mission.
            </BodyText>

            <div className="w-full py-5 px-4 bg-white border border-black border-opacity-30 rounded-lg mt-10">
              <div className="mb-10">
                <p className="text-black text-lg">
                  Rate your recent experience
                </p>
                <div className="flex items-center space-x-5 mt-4">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      className={`hover:scale-125 duration-300 ease-in-out`}
                      onClick={() => setRating(index + 1)}
                    >
                      {rating >= index + 1 ? (
                        <TiStarFullOutline
                          color={starColor(index + 1)}
                          size={45}
                        />
                      ) : (
                        <TiStarOutline color={"rgba(0,0,0,.5)"} size={45} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <>
                <div className="mb-7">
                  <p className="text-black text-lg">
                    Tell us more about your experience
                  </p>

                  <textarea
                    placeholder={placeholderText()}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-3 text-base text-black bg-transparent min-h-40 w-full outline-none border border-black border-opacity-50 focus:border-opacity-100 px-4 py-2 rounded-lg"
                  />
                </div>

                <div className="mb-7">
                  <p className="text-black text-lg">Your full name</p>

                  <input
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-3 text-base text-black bg-transparent w-full outline-none border border-black border-opacity-50 focus:border-opacity-100 px-4 py-2 rounded-lg"
                  />
                </div>
              </>
            </div>

            <Button text="Leave review" isDark handleClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input === "") return null;

    router.push(`/result?query=${input}`);
    close();
  };

  return (
    <div
      className="bg-black bg-opacity-80 fixed inset-0 z-50 flex justify-center items-center xl:px-20 lg:px-14 md:px-10 px-4"
      onClick={close}
    >
      <div
        className="w-full md:h-28 h-20 flex justify-between items-center rounded-full md:px-8 px-4 bg-white border-2 border-white focus:border-my-blue space-x-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          type="search"
          enterKeyHint="search"
          placeholder="Enter product name to search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full flex-grow-0 md:flex-grow w-[80%] md:w-fit md:text-2xl text-lg text-black outline-none"
        />

        <button
          className={`bg-my-blue md:p-4 p-3 rounded-full duration-300 ease-in-out md:text-xl text-lg ${
            input === ""
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer hover:scale-110"
          }`}
          onClick={handleSearch}
        >
          <FiSearch color="white" />
        </button>
      </div>

      <button
        className="absolute md:top-20 top-10 md:right-20 right-4 text-white hover:text-my-blue duration-300 ease-in-out"
        onClick={close}
      >
        <IoClose size={30} />
      </button>
    </div>
  );
};

export const LogoutModal = ({ close }: { close: () => void }) => {
  const handleSignout = async () => {};

  return (
    <div
      className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white xl:w-[50vw] lg:w-[75vw] w-[90vw] rounded-lg px-5 py-10 max-h-[90vh] shadow-xl shadow-my-gray flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          <TitleText weight="bold" className="text-2xl text-black">
            Signing out?
          </TitleText>
        </h3>
        <p className="text-black text-base mt-5">
          Your session data will be removed and you will be required to login
          upon next entry?
        </p>

        <div className="flex items-center justify-between space-x-20 mt-14">
          <button className="bg-my-gray text-white text-sm py-2 px-7 rounded-md">
            Cancel
          </button>
          <button className="bg-my-blue text-white text-sm py-2 px-7 rounded-md">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
