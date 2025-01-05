import { FaRegFileLines } from "react-icons/fa6";
import { TitleText } from "./Text";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { NPCard } from "./ProductCard";
import { CardLoading } from "./LazyLoading";
import axios from "axios";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { MdSearchOff } from "react-icons/md";
import { LuRefreshCcw } from "react-icons/lu";

const ProductDetails = ({
  detailChoice,
  details,
}: {
  detailChoice: string;
  details: any;
}) => {
  const renderDetails = () => {
    switch (detailChoice) {
      case "features":
        return <Features features={details.features} />;

      case "specifications":
        return <Specifications specifications={details.specifications} />;

      case "videos":
        return <Videos videos={details.videos} />;

      case "models":
        return <Models models={details.models} />;

      case "catalogue":
        return <Catalogue catalogue={details.catalogue} />;

      default:
        break;
    }
  };
  return <div className="mt-10">{renderDetails()}</div>;
};

export default ProductDetails;

const Features = ({ features }: { features: any }) => {
  return (
    <>
      <h2 className="text-xl text-black">
        <TitleText weight="regular">Features</TitleText>
      </h2>

      <div className="mt-8">
        <ul className="opacity-50 flex flex-col space-y-2 list-disc">
          {features.map((item: any, index: number) => (
            <li key={index} className="text-base text-black">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Specifications = ({ specifications }: { specifications: any }) => {
  return (
    <>
      {specifications.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-black rounded-xl">
          <thead className="">
            <tr className="text-base bg-my-gray text-white">
              <th className="w-1/3 px-4 py-3 text-start">Parameters</th>
              <th className="w-2/3 px-4 py-3 text-start">Values</th>
            </tr>
          </thead>
          <tbody>
            {specifications.length > 0 &&
              specifications.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border border-black text-black text-sm"
                >
                  <td className="w-1/3 py-3 px-4">{item.parameter}</td>
                  <td className="w-2/3 py-3 px-4">{item.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-52 flex flex-col items-center justify-center">
          <p className="text-black text-xl opacity-50">
            No specifications yet.
          </p>
        </div>
      )}
    </>
  );
};

const Videos = ({ videos }: { videos: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-black">
          <TitleText weight="regular">Videos</TitleText>
        </h2>

        <div className="flex items-center space-x-4">
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
            onClick={scrollLeft}
          >
            <IoChevronBack color="black" size={18} />
          </button>
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
            onClick={scrollRight}
          >
            <IoChevronForward color="black" />
          </button>
        </div>
      </div>

      <div ref={ref} className="w-full overflow-x-auto scrollbar-hide mt-5">
        {videos.length > 0 ? (
          <div className="flex space-x-4 min-w-max relative h-60 w-full">
            {videos.map((videoId, index) => (
              <div
                key={index}
                className="h-60 w-[30vw] relative rounded-2xl overflow-hidden"
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-52 flex flex-col items-center justify-center">
            <p className="text-black text-xl opacity-50">No videos yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

const Models = ({ models }: { models: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>(["", ""]);
  const [isFetching, setFetching] = useState(false);
  const [errorCode, setErrorCode] = useState<number>();

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchModels = async () => {
      setFetching(true);

      try {
        const returnedData: any[] = [];

        models.map(async (id) => {
          const response = await axios.get(`/api/product?id=${id}`);
          response.data.success && returnedData.push(response.data.product);
        });

        if (returnedData.length === 0) {
          setErrorCode(404);
        }

        setData(returnedData);
      } catch (error) {
        setErrorCode(500);
      } finally {
        setFetching(false);
      }
    };

    fetchModels();
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-black">
          <TitleText weight="regular">Models</TitleText>
        </h2>

        <div className="flex items-center space-x-4">
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
            onClick={scrollLeft}
          >
            <IoChevronBack color="black" size={18} />
          </button>
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-my-gray bg-opacity-5 hover:bg-opacity-15 duration-300 ease-in-out"
            onClick={scrollRight}
          >
            <IoChevronForward color="black" />
          </button>
        </div>
      </div>

      <div ref={ref} className="w-full overflow-x-auto scrollbar-hide mt-5">
        {isFetching ? (
          <div className="flex items-center space-x-10">
            {[...Array(5)].map((_, index) => (
              <CardLoading key={index} className="h-60 w-[20vw]" />
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="flex space-x-4 min-w-max relative min-h-60 w-full">
            {data.map((product, index) => (
              <NPCard
                key={index}
                isSmall
                product={{
                  name: "Absograph 500",
                  availabilty: "In stock",
                  avgRating: 4.3,
                  price: 1420,
                }}
              />
            ))}
          </div>
        ) : errorCode === 500 ? (
          <div className="flex-grow min-h-72 flex flex-col justify-center items-center opacity-50">
            <BiSolidMessageSquareError color="black" size={60} />
            <p className="text-lg text-black mt-5 mb-10 w-1/5 text-center">
              An unexpected error occurred.
            </p>
            <button className="flex items-center justify-center space-x-4 rounded-lg bg-black hover:bg-my-blue duration-300 ease-in-out">
              <LuRefreshCcw size={18} color="white" />
              <span className="text-sm text-white">Refresh</span>
            </button>
          </div>
        ) : (
          <div className="flex-grow min-h-72 flex flex-col justify-center items-center opacity-50">
            <MdSearchOff size={60} color="black" />
            <p className="text-lg text-black mt-5 w-1/5 text-center">
              This product does not exist or may have been removed.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const Catalogue = ({ catalogue }: { catalogue: any }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="opacity-50">
        <FaRegFileLines color="black" size={60} />
      </span>
      <p className="text-black text-lg mt-6">
        <TitleText weight="bold">Get product catalogue</TitleText>
      </p>
      <p className="text-black text-base mt-3 opacity-70">
        Get the catalogue and quickly scan through the product details
      </p>
      <Button isDark text="Download Catalogue" handleClick={() => {}} />
    </div>
  );
};
