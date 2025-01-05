import Breadcrumb from "@/components/Breadcrumb";
import { BodyText } from "@/components/Text";
import { CenterTitleComponent } from "@/components/Title";
import { positionData } from "@/lib/positionData";
import Link from "next/link";

const CareerPage = () => {
  return (
    <main className="w-full pb-20 lg:px-14 md:px-8 px-4">
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title="Career" color="black" />
        </div>
      </div>

      <div className="mt-5 px-7 py-2 w-fit rounded-full border border-black text-black text-xs">
        We are hiring
      </div>

      <div className="flex flex-col items-center mt-5">
        <BodyText
          weight="medium"
          className="text-center text-black text-xl w-full"
        >
          Be a Part of Our Success
        </BodyText>
        <p className="mt-10 text-black text-lg text-center xl:w-1/2 md:w-2/3 opacity-70 leading-loose">
          We are searching for passionate individuals to join us on our mission.
          <br />
          We value and appreciate clear communicators, team drivers, leaders and
          individuals ready to shoulder great responsibilities.
        </p>

        <hr
          className="bg-black bg-opacity-30 w-full my-20"
          style={{ height: "2px" }}
        />

        <div className="lg:w-1/2 md:w-2/3">
          {positionData.map((item, index) => (
            <CareerBox
              key={index}
              position={item.position}
              status={item.status}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CareerPage;

const CareerBox = ({
  position,
  status,
  description,
}: {
  position: string;
  status: string;
  description: string;
}) => {
  return (
    <div className="flex items-center justify-between space-x-8 mb-8">
      <div className="flex-grow pb-8 border-b border-black border-opacity-30">
        <div className="flex items-start space-x-8">
          <BodyText weight="medium" className="text-black text-xl">
            {position}
          </BodyText>
          <span className="px-4 py-1 rounded-full bg-my-blue text-white text-xs">
            {status}
          </span>
        </div>
        <p className="text-black text-base opacity-70 mt-5">{description}</p>
      </div>

      <Link
        href={`/career/apply?position=${position}`}
        className="text-base text-my-blue hover:underline"
      >
        Apply
      </Link>
    </div>
  );
};
