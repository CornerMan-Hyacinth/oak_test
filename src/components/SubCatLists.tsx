import Image from "next/image";
import { BodyText } from "./Text";
import { useState } from "react";
import Link from "next/link";

const SubCat = ({ category }: { category: string }) => {
  const renderSubCat = () => {
    switch (category) {
      case "science laboratory":
        return <ScienceSubCat />;

      case "agriculture":
        return <AgricSubCat />;

      case "research & analytics":
        return <ResearchSubCat />;

      case "industrial laboratory":
        return <IndustrialSubCat />;

      case "uncategorized":
        return <GeneralSubCat />;

      default:
        break;
    }
  };

  return (
    <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-y-10 xl:gap-x-20 lg:gap-x-14 md:gap-x-7 gap-x-4 justify-items-center mt-5">
      {renderSubCat()}
    </div>
  );
};

export default SubCat;

const ScienceSubCat = () => {
  return (
    <>
      <SubCatBox
        link="/shop/science laboratory/chemistry"
        imgUri="/images/subcat-images/chemistry_bg.png"
        text="Chemistry"
      />
      <SubCatBox
        link="/shop/science laboratory/chemistry (meters)"
        imgUri="/images/subcat-images/chemistry_meters_bg.png"
        text="Chemistry (Meters)"
      />
      <SubCatBox
        link="/shop/science laboratory/chemistry models"
        imgUri="/images/subcat-images/chemistry_models_bg.png"
        text="Chemistry Models"
      />
      <SubCatBox
        link="/shop/science laboratory/biology"
        imgUri="/images/subcat-images/biology_bg.png"
        text="Biology"
      />
      <SubCatBox
        link="/shop/science laboratory/physics"
        imgUri="/images/subcat-images/physics_bg.png"
        text="Physics"
      />
      <SubCatBox
        link="/shop/science laboratory/physics laboratory equipments (meters)"
        imgUri="/images/subcat-images/physics_meters_bg.png"
        text="Physics Laboratory Equipments (Meters)"
      />
      <SubCatBox
        link="shop/science laboratory/physics laboratory equipments (lights & optics)"
        imgUri="/images/subcat-images/physics_lights_bg.png"
        text="Physics Laboratory Equipments (Lights & Optics)"
      />
      <SubCatBox
        link="shop/science laboratory/physics laboratory equipments (prop & matter)"
        imgUri="/images/subcat-images/physics_prop_bg.jpg"
        text="Physics Laboratory Equipments (Prop & Matter)"
      />
      <SubCatBox
        link="shop/science laboratory/physics laboratory equipments (applied mech)"
        imgUri="/images/subcat-images/physics_mech_bg.jpg"
        text="Physics Laboratory Equipments (Applied Mech)"
      />
      <SubCatBox
        link="shop/science laboratory/distillers and mixers"
        imgUri="/images/subcat-images/distillers_bg.png"
        text="Distillers and Mixers"
      />
      <SubCatBox
        link="shop/science laboratory/laboratory consumables"
        imgUri="/images/subcat-images/consumables_bg.png"
        text="Laboratory Consumables"
      />
      <SubCatBox
        link="shop/science laboratory/general school laboratory equipments"
        imgUri="/images/subcat-images/school_bg.png"
        text="General School Laboratory Equipments"
      />
      <SubCatBox
        link="shop/science laboratory/laboratory chemicals"
        imgUri="/images/subcat-images/chemicals_bg.png"
        text="Laboratory Chemicals"
      />
    </>
  );
};

const AgricSubCat = () => {
  return (
    <>
      <SubCatBox
        link="/shop/agriculture/agricultural testing machines"
        imgUri="/images/subcat-images/agric_test_bg.jpg"
        text="Agricultural Testing Machines"
      />
      <SubCatBox
        link="/shop/agriculture/agriculture chemicals"
        imgUri="/images/subcat-images/agric_chemistry_bg.jpg"
        text="Agriculture Chemicals"
      />
    </>
  );
};

const ResearchSubCat = () => {
  return (
    <>
      <SubCatBox
        link="/shop/research & analytics/research & analytics"
        imgUri="/images/subcat-images/res_ana_bg.jpg"
        text="Research & Analytics"
      />
      <SubCatBox
        link="/shop/research & analytics/lab sampling equipment"
        imgUri="/images/subcat-images/res_lab_bg.pg"
        text="Lab Sampling Equipment"
      />
    </>
  );
};

const IndustrialSubCat = () => {
  return (
    <>
      <SubCatBox
        link="/shop/industrial laboratory/scientific laboratory equipment"
        imgUri="/images/subcat-images/ind_sci_bg.jpg"
        text="Scientific Laboratory Equipment"
      />
      <SubCatBox
        link="/shop/industrial laboratory/precision laboratory equipment"
        imgUri="/images/subcat-images/ind_pre_bg.jpg"
        text="Precision Laboratory Equipment"
      />
      <SubCatBox
        link="/shop/industrial laboratory/microwave"
        imgUri="/images/subcat-images/ind_micro_bg.jpg"
        text="Microwave"
      />
    </>
  );
};

const GeneralSubCat = () => {
  return (
    <>
      <SubCatBox
        link="/shop/uncategorized/measuring"
        imgUri="/images/subcat-images/gen_measure_bg.jpg"
        text="Measuring"
      />
      <SubCatBox
        link="/shop/uncategorized/overhead projector"
        imgUri="/images/subcat-images/gen_overhead_bg.jpg"
        text="Overhead Projector"
      />
      <SubCatBox
        link="/shop/uncategorized/mathematics"
        imgUri="/images/subcat-images/gen_maths_bg.jpg"
        text="Mathematics"
      />
    </>
  );
};

const SubCatBox = ({
  imgUri,
  text,
  link,
}: {
  imgUri: string;
  text: string;
  link: string;
}) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <Link href={link}>
      <div
        className="lg:w-52 md:w-44 w-40 cursor-pointer"
        onMouseEnter={() => setHoveredOn(true)}
        onMouseLeave={() => setHoveredOn(false)}
      >
        <div className="w-full lg:h-44 md:h-40 h-28 relative rounded-2xl bg-gray-400 overflow-hidden">
          <Image
            alt="conical glass flasks containing chemicals"
            src={imgUri}
            fill
            className="object-cover"
          />
        </div>

        <BodyText
          weight="medium"
          className={`mt-5 md:text-sm text-xs text-center w-full block duration-300 ease-in-out ${
            isHoveredOn ? "underline text-my-blue" : "no-underline text-black"
          }`}
        >
          {text}
        </BodyText>
      </div>
    </Link>
  );
};
