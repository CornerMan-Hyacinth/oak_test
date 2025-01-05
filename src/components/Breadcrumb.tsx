"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Split the path into parts and remove the empty first part
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Build links for each part
  const breadcrumbLinks = pathSegments.map((segment, index) => {
    // Create the full path for the current segment
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    return (
      <span key={href}>
        <Link href={href} className="breadcrumb-link hover:underline">
          {decodeURIComponent(
            segment.charAt(0).toUpperCase() + segment.slice(1)
          ).replace(/-/g, " ")}
        </Link>
        {index < pathSegments.length - 1 && " / "}
      </span>
    );
  });

  return (
    <div className="mt-10 flex items-center space-x-1 text-sm text-black mb-5 lg:mb-0">
      <Link href={"/"} className="text-sm text-black">
        <span className="hover:underline">Home</span> /{" "}
      </Link>
      <span className="text-sm text-black">{breadcrumbLinks}</span>
    </div>
  );
};

export default Breadcrumb;
