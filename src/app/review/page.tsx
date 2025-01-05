"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { BodyText, TitleText } from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

const ReviewPage = () => {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");

  const starColor = (star: number) => {
    switch (rating) {
      case 1:
        return star === 1 ? "#D70B0B" : "#000";

      case 2:
        return star <= 2 ? "#EF5E20" : "#000";

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
    <main className="w-full relative scrollbar-bar">
      <button
        className="fixed top-20 lg:left-14 md:left-10 left-4 px-10 py-3 rounded-full bg-my-blue text-white flex items-center space-x-4 hover:bg-opacity-100 duration-300 ease-in-out z-50"
        onClick={() => router.back()}
      >
        <FaArrowLeft size={18} />
        <span className="text-base">Go back</span>
      </button>

      <div className="fixed z-40 inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col h-screen max-h-[100vh] overflow-y-scroll">
        <div className="w-full min-h-[15vh]" />
        <div className="bg-[#CCCCCC] dark:bg-black w-full flex-grow rounded-t-2xl pb-10 flex flex-col">
          <div className="flex w-full min-h-20 bg-white items-center justify-center rounded-t-2xl">
            <div className="xl:w-1/3 lg:w-2/5 md:w-3/5 w-4/5 flex items-center space-x-2">
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
            <div className="xl:w-1/3 lg:w-2/5 md:w-3/5 w-4/5 mt-10">
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

                {rating > 0 && (
                  <>
                    <div className="mb-5">
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

                    <div className="mb-5">
                      <p className="text-black text-base">Your full name</p>
                      <input
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-3 text-base text-black bg-transparent w-full outline-none border border-black border-opacity-50 focus:border-opacity-100 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="mb-7">
                      <p className="text-black text-base">
                        Your Company{" "}
                        <span className="opacity-70">(optional)</span>
                      </p>
                      <input
                        placeholder="Enter your company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-3 text-base text-black bg-transparent w-full outline-none border border-black border-opacity-50 focus:border-opacity-100 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="mt-14 w-full">
                      <Button
                        text="Leave review"
                        isDark
                        handleClick={() => {}}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewPage;
