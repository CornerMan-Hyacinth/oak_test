import Image from "next/image";
import { TitleComponent } from "./Title";
import { BodyText } from "./Text";
import FaqBox from "./FaqBox";

export const Faq = () => {
  return (
    <div className="w-full relative pt-20">
      <Image
        alt="a mesh background image"
        src={"/images/meshBg.png"}
        fill
        className="object-cover"
      />
      <div className="bg-white bg-opacity-100 pt-10 pb-20 lg:px-14 md:px-10 px-4">
        <TitleComponent title="FAQs" color="black" />
        <div className="flex flex-col items-center justify-center mt-5">
          <h4 className="lg:text-3xl text-2xl text-black text-center">
            Frequently Asked Questions
          </h4>

          <BodyText
            weight="medium"
            className="lg:text-lg text-base text-black opacity-70 lg:w-2/3 md:w-3/4 text-center mt-10"
          >
            This section is necessary for quick, self service to new and
            first-time visitors to get access to product information,
            specifications and after Sales support.
          </BodyText>

          <div className="lg:w-2/3 md:w-3/4 w-full mt-10 self-center">
            {[...Array(5)].map((item, index) => (
              <FaqBox
                key={index}
                question="How are you to be trusted?"
                answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sint odit, molestias quibusdam dolorem fuga non facere fugiat autem exercitationem deserunt quasi itaque similique sapiente rerum aperiam rem sunt! Consequuntur."
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
