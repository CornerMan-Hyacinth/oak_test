import Breadcrumb from "@/components/Breadcrumb";
import { CenterTitleComponent } from "@/components/Title";
import Image from "next/image";

const Brands = () => {
  return (
    <main className="w-full min-h-screen lg:px-14 md:px-10 px-4 pb-20">
      <Breadcrumb />
      <div className="flex flex-col items-center mt-5">
        <CenterTitleComponent isH1 title={"Brands"} color="black" />
        <p className="text-black opacity-70 text-base mt-7 text-center xl:w-2/5 lg:w-3/5 md:w-4/5">
          We have partnered with these top-leading Scientific equipment
          manufacturers to give you the best equipments
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="grid lg:grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr] grid-cols-1 items-center gap-y-5 gap-x-16 mt-20">
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand1.png"}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand2.png"}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand3.png"}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand4.png"}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand5.png"}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-[25vw] md:w-[35vw] w-full h-40 rounded-lg overflow-hidden bg-my-gray bg-opacity-10 border border-black border-opacity-10 relative">
            <Image
              alt="oak scientifics partner logo"
              src={"/images/oak_brand6.png"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Brands;
