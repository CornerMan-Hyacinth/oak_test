import Breadcrumb from "@/components/Breadcrumb";
import { Faq } from "@/components/Faq";
import FaqBox from "@/components/FaqBox";
import { BodyText, TitleText } from "@/components/Text";
import { CenterTitleComponent, TitleComponent } from "@/components/Title";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <main className="w-full">
      <div className="lg:px-14 md:px-10 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="About Us" color="black" />
        </div>
      </div>

      <div className="flex flex-col items-center lg:px-14 md:px-10 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-10 mt-16 w-full">
          <h2 className="text-black md:text-3xl text-2xl lg:w-1/3 md:w-1/2 w-full text-center lg:text-start mb-5 lg:mb-0">
            <TitleText weight="bold">
              We are a Company Dedicated to Serving you
            </TitleText>
          </h2>

          <p className="lg:w-1/2 md:w-full text-black lg:text-xl text-lg opacity-70 lg:leading-loose leading-relaxed text-center lg:text-start">
            At Oak Scientifics, we are ever ready to give you the best equipment
            for your needs sourced from our catalog of manufacturers to satisfy
            your needs. Founded in 2024, we are fully engaged in the supply,
            installtion and maintenance of scientific and Agricultural
            equipments across Africa and beyond.
          </p>
        </div>

        <div className="lg:w-3/5 md:w-4/5 w-full lg:h-[70vh] md:h-[55vh] h-[50vh] rounded-2xl overflow-hidden relative mt-20 flex self-center">
          <Image
            alt="about us team image"
            src={"/images/team-vision.jpg"}
            fill
            className="object-top"
          />
        </div>

        <h3 className="text-black text-3xl mt-20">
          <CenterTitleComponent title="Our Vision" color="black" />
        </h3>
        <p className="text-lg text-black opacity-70 mt-10 lg:w-3/5 md:w-4/5 text-center">
          To become a global leader in scientific innovation, empowering
          discoveries, advancing education, and promoting sustainability with
          cutting-edge solutions.
        </p>

        <h3 className="text-black text-3xl mt-20">
          <CenterTitleComponent title="Our Mission" color="black" />
        </h3>
        <p className="text-lg text-black opacity-70 mt-10 lg:w-3/5 md:w-4/5 text-center">
          Empowering innovation and discovery by providing precision scientific
          equipment and tailored solutions. We are dedicated to supporting
          researches, educators, and professionals across diverse fields,
          driving advancements in science, sustainability, and education through
          excellence in quality and service.
        </p>

        <h2 className="text-lg w-full mt-32">
          <TitleComponent
            title="Meet Our Team of Professionals"
            color="black"
          />
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-2 gap-y-10 lg:gap-x-20 gap-x-10 mt-10">
          <TeamBox
            img="/images/team-images/ceo.png"
            name="Harry Potter"
            role="CEO"
          />
          <TeamBox
            img="/images/team-images/cto.png"
            name="Jon Snow"
            role="CTO"
          />
          <TeamBox
            img="/images/team-images/project-manager.png"
            name="Kanye West"
            role="Project Manager"
          />
          <TeamBox
            img="/images/team-images/lead-engineer.png"
            name="Dom Toretto"
            role="Family Guy"
          />
          <TeamBox
            img="/images/team-images/ceo.png"
            name="Thor Odinson"
            role="Lead Engineer"
          />
          <TeamBox
            img="/images/team-images/cto.png"
            name="Mark Zuckerberg"
            role="Engineer"
          />
        </div>
      </div>

      <div className="w-full py-20 mt-20 rounded-t-3xl bg-my-light-yellow flex flex-col items-center lg:px-14 md:px-8 px-4">
        <h3 className="text-xl">
          <CenterTitleComponent title="Join Our Team" color="black" />
        </h3>
        <p className="mt-10 text-black lg:text-xl md:text-lg text-base xl:w-2/5 lg:w-3/5 md:w-4/5 w-full text-center leading-relaxed opacity-70">
          We are looking for Professionals to help drive the vision of Oak
          Scientifics. We are particular about the best and highly-skilled
          individuals to fill in these open positions.
        </p>
        <Link
          href={"/career"}
          className="text-my-blue text-lg hover:underline mt-10"
        >
          See Open Positions
        </Link>
      </div>

      <Faq />
    </main>
  );
};

export default AboutUs;

const TeamBox = ({
  img,
  name,
  role,
}: {
  img: string;
  name: string;
  role: string;
}) => {
  return (
    <div className="xl:w-[20vw] lg:w-[23vw] md:w-[27vw] w-[35vw]">
      <div className="w-full md:h-60 h-44 rounded-xl overflow-hidden relative">
        <Image
          alt="oak scientific team member"
          src={img}
          fill
          className="object-top"
        />
      </div>

      <p className="md:text-lg text-base text-black mt-4 line-clamp-1 text-ellipsis overflow-hidden text-nowrap">
        {name}
      </p>
      <p className="md:text-base text-sm text-black mt-2 opacity-70">{role}</p>
    </div>
  );
};
