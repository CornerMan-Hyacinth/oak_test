import { BodyText, TitleText } from "@/components/Text";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const ReceiptPage = () => {
  return (
    <main className="w-full min-h-screen lg:px-14 md:px-8 px-4 pb-20">
      <div className="flex flex-col items-center mt-20">
        <FaCircleCheck color="#58D315" size={80} />

        <TitleText weight="regular" className="text-3xl text-black mt-14 block">
          Thanks for your Order !
        </TitleText>
        <p className="text-black text-base opacity-70 mt-5">
          Receipt for your order has been sent to example@gmail.com
        </p>

        <div className="lg:w-1/2 md:w-3/4 w-full mt-20">
          <div className="mb-10">
            <BodyText weight="regular" className="text-lg text-black">
              Transaction Date
            </BodyText>
            <span className="block mt-5 text-sm text-black opacity-70">
              3/09/2024, 10:05am
            </span>
          </div>

          <div className="mb-10">
            <BodyText weight="regular" className="text-lg text-black">
              Payment Method
            </BodyText>
            <span className="block mt-5 text-sm text-black opacity-70">
              Mastercard
            </span>
          </div>

          <div className="mb-10">
            <BodyText weight="regular" className="text-lg text-black">
              Shipping Method
            </BodyText>
            <span className="block mt-5 text-sm text-black opacity-70">
              Express (7-15 business days)
            </span>
          </div>

          <div className="mb-5">
            <BodyText weight="medium" className="text-lg text-black">
              Order Details
            </BodyText>
          </div>

          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-md overflow-hidden relative border border-black border-opacity-50">
                  <Image
                    src={"/images/oakProductImg6.png"}
                    alt="product image"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-base text-black opacity-70">
                  Microcomputer Digital pH Meter
                </p>
              </div>

              <BodyText weight="regular" className="text-base text-black">
                $78
              </BodyText>
            </div>
          ))}

          <Link
            href={"/shop"}
            className="text-black text-base flex items-center space-x-2 mt-10"
          >
            <FaArrowLeft />
            <span className="text-black opacity-70 underline hover:opacity-100">
              Go back to shop
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ReceiptPage;
