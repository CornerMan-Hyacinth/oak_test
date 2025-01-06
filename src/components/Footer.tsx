import Image from "next/image";
import Newsletter from "./Newsletter";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import {
  FaFacebook,
  FaLocationDot,
  FaSquareXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TitleText } from "./Text";
import Link from "next/link";
import { MdEmail, MdLocalPhone } from "react-icons/md";

const Footer = () => {
  return (
    <section className="w-full">
      <Newsletter />
      <FooterComponent />
    </section>
  );
};

export default Footer;

const FooterComponent = () => {
  const getYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
  };
  return (
    <footer className="w-full relative bg-my-light-yellow pb-10">
      <div className="w-full h-5 rounded-t-3xl bg-my-light-yellow transform -translate-y-5" />
      <div className="flex flex-col lg:flex-row lg:items-start md:items-center justify-between lg:px-14 md:px-10 px-4 mt-4">
        <div className="flex flex-col items-center lg:w-[20vw] md:w-4/5 w-full">
          <Image
            alt="oak scientifics logo"
            src={"/images/oak_logo.png"}
            width={100}
            height={100}
            className="object-contain"
          />
          <p className="text-black text-base text-center mt-5 leading-relaxed opacity-70">
            Founded in 2024, we are fully engaged in the supply, installtion and
            maintenance of Scientific and Agricultural equipments across Africa
            and beyond.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-8 mb-12 lg:mb-0">
            <a
              href="https://www.linkedin.com/company/105725236"
              target="_blank"
              className="text-black hover:text-my-blue duration-300 ease-in-out"
            >
              <BsLinkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/oakscientifics"
              target="_blank"
              className="text-black hover:text-my-blue duration-300 ease-in-out"
            >
              <FaInstagramSquare size={22} />
            </a>
            {/* <a
              href=""
              target="_blank"
              className="text-black hover:text-my-blue duration-300 ease-in-out"
            >
              <FaSquareXTwitter size={22} />
            </a> */}
            <a
              href="https://www.facebook.com/profile.php?id=61569571321915"
              target="_blank"
              className="text-black hover:text-my-blue duration-300 ease-in-out"
            >
              <FaFacebook size={22} />
            </a>
            {/* <a
              href=""
              target="_blank"
              className="text-black hover:text-my-blue duration-300 ease-in-out"
            >
              <FaYoutube size={22} />
            </a> */}
          </div>
        </div>

        <div className="flex-grow w-full lg:w-fit flex items-start justify-between lg:max-w-[65vw]">
          <div className="flex flex-col items-center">
            <h5 className="text-lg text-black mb-6">
              <TitleText weight="bold">Our company</TitleText>
            </h5>
            <div className="flex flex-col items-center space-y-6">
              <Link
                href={"/about-us"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                About Us
              </Link>
              <Link
                href={"/blog"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Blog
              </Link>
              <Link
                href={"/careers"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Careers
              </Link>
              <Link
                href={"/contact-us"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-lg text-black mb-6">
              <TitleText weight="bold">Links</TitleText>
            </h5>
            <div className="flex flex-col items-center space-y-6">
              <Link
                href={"/contact-sales"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Support
              </Link>
              <Link
                href={"/"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Live Chat
              </Link>
              <Link
                href={"/"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Privacy Policy
              </Link>
              <Link
                href={"/"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Terms & Conditions
              </Link>
              <Link
                href={"/"}
                className="text-black text-sm opacity-70 hover:opacity-100 hover:text-my-blue hover:underline duration-300 ease-in-out"
              >
                Return Policy
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center max-w-[20vw]">
            <h5 className="text-lg text-black mb-6">
              <TitleText weight="bold">Contact Us</TitleText>
            </h5>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-start space-x-4">
                <span className="block mt-1">
                  <MdEmail size={18} color="black" />
                </span>
                <div className="flex flex-col space-y-3">
                  <span className="text-black text-sm opacity-70">
                    sales@oakscientifics.com
                  </span>
                  <hr className="border border-black border-opacity-10" />
                  <span className="text-black text-sm opacity-70">
                    info@oakscientifics.com
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MdLocalPhone size={18} color="black" />
                <span className="text-black text-sm opacity-70">
                  +(234) 803 8867 562
                </span>
              </div>

              <div className="flex items-start space-x-4">
                <span className="block mt-1">
                  <FaLocationDot size={18} color="black" />
                </span>
                <div className="flex flex-col space-y-3">
                  <span className="text-black text-sm opacity-70 text-center">
                    Blk 5, Idah St Area 10 Garki 900246, FCT Abuja Nigeria.
                  </span>
                  <hr className="border border-black border-opacity-10" />
                  <span className="text-black text-sm opacity-70 text-center">
                    Blk 5, Idah St Area 10 Garki 900246, FCT Abuja Nigeria.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <h5 className="text-lg text-black mb-6">
              <TitleText weight="bold">Open Hours</TitleText>
            </h5>
            <p className="text-black text-sm opacity-70 mb-3">Mon&ndash;Fri</p>
            <p className="text-black text-sm opacity-70">
              8:00&ndash;17:30 WAT
            </p>
          </div>
        </div>

        <div className="w-full flex items-start justify-between md:hidden mt-5 md:mt-0">
          <div className="flex flex-col items-center max-w-[35vw]">
            <h5 className="text-lg text-black mb-6">
              <TitleText weight="bold">Contact Us</TitleText>
            </h5>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-start space-x-4">
                <span className="block mt-1">
                  <MdEmail size={18} color="black" />
                </span>
                <div className="flex flex-col space-y-3">
                  <span className="text-black text-sm opacity-70">
                    sales@oakscientifics.com
                  </span>
                  <hr className="border border-black border-opacity-10" />
                  <span className="text-black text-sm opacity-70">
                    info@oakscientifics.com
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MdLocalPhone size={18} color="black" />
                <span className="text-black text-sm opacity-70">
                  +(234) 803 8867 562
                </span>
              </div>

              <div className="flex items-start space-x-4">
                <span className="block mt-1">
                  <FaLocationDot size={18} color="black" />
                </span>
                <div className="flex flex-col space-y-3">
                  <span className="text-black text-sm opacity-70 text-center">
                    Blk 5, Idah St Area 10 Garki 900246, FCT Abuja Nigeria.
                  </span>
                  <hr className="border border-black border-opacity-10" />
                  <span className="text-black text-sm opacity-70 text-center">
                    Blk 5, Idah St Area 10 Garki 900246, FCT Abuja Nigeria.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-lg text-black mb-6 text-nowrap">
              <TitleText weight="bold">Open Hours</TitleText>
            </h5>
            <p className="text-black text-sm opacity-70 mb-3">Mon&ndash;Fri</p>
            <p className="text-black text-sm opacity-70 text-nowrap">
              8:00&ndash;17:30 WAT
            </p>
          </div>
        </div>
      </div>

      <hr className="w-full border border-black border-opacity-10 lg:mt-4 mt-8 mb-4 block" />

      <p className="text-center text-black text-sm w-full">
        All rights reserved &copy; {getYear()} Oak Scientifics.
      </p>
    </footer>
  );
};
