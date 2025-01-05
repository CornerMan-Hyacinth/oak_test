"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface ToastContextType {
  message: string | null;
  setMsg: (m: string | null, s: boolean) => void;
  success: boolean;
}

// Create a Context with the defined type
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface ToastProviderProps {
  children: ReactNode;
}

// Create a Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setMsg = (m: string | null, s: boolean) => {
    setSuccess(s);
    setMessage(m);
  };

  return (
    <ToastContext.Provider value={{ message, setMsg, success }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the ToastContext
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }
  return context;
};
