import Image from "next/image";
import { TitleText } from "./Text";
import Link from "next/link";

const BlogCard = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="xl:w-[25vw] lg:w-[30vw] md:w-[35vw] w-full">
        <div className="w-full h-52 rounded-lg overflow-hidden relative">
          <Image
            alt="a set of scientific stationeries image"
            src={img}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between space-x-4 mt-4">
          <p className="flex-grow text-xl text-black line-clamp-2">
            <TitleText weight="bold">{title}</TitleText>
          </p>
          <span className="text-black text-sm text-nowrap">3 weeks ago</span>
        </div>

        <p className="text-sm text-black opacity-70 mt-2 line-clamp-3 text-ellipsis overflow-hidden">
          {desc}
        </p>
        <hr className="border border-black border-opacity-20 my-4" />
        <button className="w-full py-3 flex items-center justify-center rounded-md bg-my-gray text-white text-base hover:bg-my-blue duration-300 ease-in-out">
          Read Article
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
