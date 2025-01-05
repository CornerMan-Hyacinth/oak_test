import { FC } from "react";

type TextProps = {
  weight: "bold" | "regular" | "light" | "medium";
  children: React.ReactNode;
  className?: string; // Optional className prop for custom styling
};

export const TitleText: FC<TextProps> = ({ weight, children, className }) => {
  const weightFont = () => {
    switch (weight) {
      case "bold":
        return "font-[family-name:var(--font-inria-bold)]";

      case "light":
        return "font-[family-name:var(--font-inria-light)]";

      case "regular":
        return "font-[family-name:var(--font-inria-regular)]";
    }
  };

  return <span className={`${weightFont()} ${className}`}>{children}</span>;
};

export const BodyText: FC<TextProps> = ({ weight, children, className }) => {
  const weightFont = () => {
    switch (weight) {
      case "bold":
        return "font-[family-name:var(--font-inter-bold)]";

      case "light":
        return "font-[family-name:var(--font-inter-light)]";

      case "regular":
        return "font-[family-name:var(--font-inter-regular)]";

      case "medium":
        return "font-[family-name:var(--font-inter-medium)]";
    }
  };

  return <span className={`${weightFont()} ${className}`}>{children}</span>;
};
