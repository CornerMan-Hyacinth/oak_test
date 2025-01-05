"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { CenterTitleComponent } from "@/components/Title";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogPost = ({ params }: { params: Promise<{ title: string }> }) => {
  const [blogTitle, setBlogTitle] = useState("");

  useEffect(() => {
    const getBlogTitle = async () => {
      const title = decodeURIComponent((await params).title);
      const capTitle = title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setBlogTitle(capTitle);
    };

    getBlogTitle();
  }, [params]);

  return (
    <main className="w-full pb-20 lg:px-14 md:px-10 px-4 flex flex-col">
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center mt-5">
          <CenterTitleComponent isH1 title={blogTitle} color="black" />
        </div>
      </div>

      <span className="text-base text-black mt-10">
        <span className="opacity-70">Last Updated:</span> 24 Dec, 2024
      </span>

      <div className="relative w-2/4 h-[50vh] rounded-xl overflow-hidden self-center mt-10">
        <Image
          alt={`${blogTitle} blog image`}
          src={"/images/catLab.jpg"}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-lg text-black opacity-70 text-center w-2/3 self-center mt-10">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        quis aspernatur odit possimus odio obcaecati facere voluptate vitae
        ipsum eaque quos ea, molestiae inventore, sequi quo. Ipsum aspernatur
        totam dolores.
      </p>
    </main>
  );
};

export default BlogPost;
