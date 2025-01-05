import { useEffect, useRef, useState } from "react";

// Custom hook to track element position
export const useScrollPosition = (threshold: number = 100) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isAbove = rect.top <= threshold;
        setIsAboveThreshold(isAbove);
      }
    };

    // Check initial position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { elementRef, isAboveThreshold };
};
