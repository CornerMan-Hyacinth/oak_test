"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface PageContextType {
  message: string | null;
  setMsg: (m: string | null, s: boolean) => void;
  success: boolean;
}

// Create a Context with the defined type
const PageContext = createContext<PageContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface PageProviderProps {
  children: ReactNode;
}

// Create a Provider component
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setMsg = (m: string | null, s: boolean) => {
    setSuccess(s);
    setMessage(m);
  };

  return (
    <PageContext.Provider value={{ message, setMsg, success }}>
      {children}
    </PageContext.Provider>
  );
};

// Custom hook to use the PageContext
export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within an PageProvider");
  }
  return context;
};
