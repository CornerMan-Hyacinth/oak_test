"use client";

import { useState } from "react";
import { TitleText } from "./Text";

export const TitleComponent = ({
  isH1,
  title,
  color,
}: {
  isH1?: boolean;
  title: string;
  color: string;
}) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <div
      className="w-fit"
      onMouseEnter={() => setHoveredOn(true)}
      onMouseLeave={() => setHoveredOn(false)}
    >
      {isH1 ? (
        <h1 className={`text-${color} text-2xl`}>
          <TitleText weight="regular">{title}</TitleText>
        </h1>
      ) : (
        <h2 className={`text-${color} text-2xl`}>
          <TitleText weight="regular">{title}</TitleText>
        </h2>
      )}
      <div
        style={{ height: "0.15rem" }}
        className={`w-1/2 ${
          color === "white" ? "bg-white" : "bg-my-blue"
        } rounded-full transition-transform mt-1 ${
          isHoveredOn ? "translate-x-full" : ""
        }`}
      />
    </div>
  );
};

export const CenterTitleComponent = ({
  isH1,
  title,
  color,
}: {
  isH1?: boolean;
  title: string;
  color: string;
}) => {
  return (
    <div className="w-fit">
      {isH1 ? (
        <h1 className={`text-${color} text-2xl`}>
          <TitleText weight="regular">{title}</TitleText>
        </h1>
      ) : (
        <h2 className={`text-${color} text-2xl`}>
          <TitleText weight="regular">{title}</TitleText>
        </h2>
      )}
      <div className="w-full flex justify-center mt-2">
        <div
          style={{ height: "0.15rem" }}
          className={`w-[35%] ${color === "white" ? "bg-white" : "bg-my-blue"}`}
        />
      </div>
    </div>
  );
};
