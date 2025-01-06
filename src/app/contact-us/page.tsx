import Breadcrumb from "@/components/Breadcrumb";
import { Faq } from "@/components/Faq";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { TiUser } from "react-icons/ti";

const ContactUs = () => {
  return (
    <main className="w-full">
      <div className="lg:px-14 md:px-8 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Contact Us" color="black" />
        </div>
      </div>

      <div className="flex flex-col items-center lg:px-14 md:px-8 px-4">
        <BodyText weight="medium" className="mt-10 text-black text-xl">
          Get in Touch with Our Team
        </BodyText>
        <p className="text-black text-lg opacity-70 mt-5 text-center">
          Let us know how we can help you get the best products that suits your
          needs
        </p>

        <div className="flex items-center justify-center mt-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:gap-x-10 gap-x-5 gap-y-5">
            <div className="h-72 lg:w-[20vw] md:w-[35vw] w-[65vw] px-4 py-6 border border-black border-opacity-30 rounded-2xl flex flex-col items-center m-5 lg:m-0">
              <div className="h-16 w-16 flex justify-center items-center bg-my-blue rounded-full">
                <TiUser color="white" size={40} />
              </div>
              <BodyText weight="medium" className="text-black text-xl mt-5">
                Contact Sales
              </BodyText>
              <p className="text-black text-base opacity-70 mt-6 mb-8 text-center">
                Speak to our sales team
              </p>
              <Link
                href={"/contact-sales"}
                className="text-base text-my-blue hover:underline text-center"
              >
                Send Us a Message
              </Link>
            </div>

            <div className="h-72 lg:w-[20vw] md:w-[35vw] w-[65vw] px-4 py-6 border border-black border-opacity-30 rounded-2xl flex flex-col items-center m-5 lg:m-0">
              <div className="h-16 w-16 flex justify-center items-center bg-my-blue rounded-full">
                <IoChatbubbleEllipsesSharp color="white" size={40} />
              </div>
              <BodyText weight="medium" className="text-black text-xl mt-5">
                Chat to Support
              </BodyText>
              <p className="text-black text-base opacity-70 mt-6 mb-8 text-center">
                We are online and ready to assist you
              </p>
              <button className="text-base text-my-blue hover:underline text-center">
                Go to support
              </button>
            </div>

            <div className="h-72 lg:w-[20vw] md:w-[35vw] w-[65vw] px-4 py-6 border border-black border-opacity-30 rounded-2xl flex flex-col items-center m-5 lg:m-0">
              <div className="h-16 w-16 flex justify-center items-center bg-my-blue rounded-full">
                <FaPhoneAlt color="white" size={34} />
              </div>
              <BodyText weight="medium" className="text-black text-xl mt-5">
                Call Us
              </BodyText>
              <p className="text-black text-base opacity-70 mt-6 mb-8 text-center">
                Mon-Fri 8am-5pm
              </p>
              <a
                href={"/contact-sales"}
                className="text-base text-my-blue hover:underline tracking-wider text-center"
              >
                02078916775
              </a>
            </div>

            <div className="h-72 lg:w-[20vw] md:w-[35vw] w-[65vw] px-4 py-6 border border-black border-opacity-30 rounded-2xl flex flex-col items-center m-5 lg:m-0">
              <div className="h-16 w-16 flex justify-center items-center bg-my-blue rounded-full">
                <FaLocationDot color="white" size={34} />
              </div>
              <BodyText weight="medium" className="text-black text-xl mt-5">
                Visit Us
              </BodyText>
              <p className="text-black text-base opacity-70 mt-6 mb-8 text-center">
                Visit our office today
              </p>
              <Link
                href={"/contact-sales"}
                className="text-base text-my-blue hover:underline tracking-wider text-center"
              >
                View on Google Maps
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Faq />
    </main>
  );
};

export default ContactUs;
