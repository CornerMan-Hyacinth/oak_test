import { useState } from "react";

export const ToolTip = ({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoveredOn(true)}
      onMouseLeave={() => setHoveredOn(false)}
    >
      {children}
      {isHoveredOn && (
        <div className="absolute top-0 right-0 -translate-y-full translate-x-full bg-my-gray px-3 py-1 rounded-md shadow shadow-white min-w-40">
          <p className="text-white text-xs">{tip}</p>
        </div>
      )}
    </div>
  );
};
