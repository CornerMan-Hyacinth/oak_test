"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Access document only after the component is mounted
    const root = document.getElementById("portal-root");
    setPortalRoot(root);
  }, []);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
