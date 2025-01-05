import Breadcrumb from "@/components/Breadcrumb";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import { BiSupport } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SlChemistry } from "react-icons/sl";

const ServicesPage = () => {
  return (
    <main className="w-full pb-20 lg:px-14 md:px-8 px-4 flex flex-col">
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Our Services" color="black" />
        </div>
      </div>

      <p className="lg:w-2/3 md:w-3/4 w-full text-lg text-black opacity-70 text-center self-center mt-20">
        We&apos;re committed to excellence in scientific and educational
        endeavors. Our diverse range of services caters to the ever-evolving
        needs of research, education, and quality control sectors.
        <br />
        Discover a world where reliability meets innovation, and every service
        is a step towards achieving remarkable scientific breakthroughs
      </p>

      <div className="mt-20 flex items-center justify-center lg:space-x-20 space-x-10">
        <div className="lg:w-[22vw] md:w-[27vw] w-[40vw] h-[35vh] flex flex-col justify-center items-center rounded-lg border-2 border-black border-opacity-10 hover:border-my-blue hover:border-opacity-50 duration-300 ease-in-out py-10 md:px-10 px-4 cursor-pointer">
          <SlChemistry color="#0f81b0" size={50} />
          <BodyText
            weight="regular"
            className="mt-7 lg:text-lg text-base text-black text-center"
          >
            Laboratory Setups and Furnishing
          </BodyText>
        </div>

        <div className="lg:w-[22vw] md:w-[27vw] w-[40vw] h-[35vh] flex flex-col justify-center items-center rounded-lg border-2 border-black border-opacity-10 hover:border-my-blue hover:border-opacity-50 duration-300 ease-in-out py-10 md:px-10 px-4 cursor-pointer">
          <FaChalkboardTeacher color="#0f81b0" size={50} />
          <BodyText
            weight="regular"
            className="mt-7 lg:text-lg text-base text-black text-center"
          >
            Training of End-users
          </BodyText>
        </div>

        <div className="lg:w-[22vw] md:w-[27vw] w-[40vw] h-[35vh] hidden md:flex flex-col justify-center items-center rounded-lg border-2 border-black border-opacity-10 hover:border-my-blue hover:border-opacity-50 duration-300 ease-in-out py-10 md:px-10 px-4 cursor-pointer">
          <BiSupport color="#0f81b0" size={50} />
          <BodyText
            weight="regular"
            className="mt-7 lg:text-lg text-base text-black text-center"
          >
            After-sales Support
          </BodyText>
        </div>
      </div>

      <div className="w-[40vw] h-[35vh] flex md:hidden flex-col justify-center items-center rounded-lg border-2 border-black border-opacity-10 hover:border-my-blue hover:border-opacity-50 duration-300 ease-in-out py-10 md:px-10 px-4 cursor-pointer self-center mt-10">
        <BiSupport color="#0f81b0" size={50} />
        <BodyText
          weight="regular"
          className="mt-7 lg:text-lg text-base text-black text-center"
        >
          After-sales Support
        </BodyText>
      </div>
    </main>
  );
};

export default ServicesPage;
