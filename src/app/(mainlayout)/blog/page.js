"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Blog = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="relative">
      {/* blog cover start */}
      <div
        className="bg-cover bg-no-repeat h-[400px] w-full sm:-mt-8 flex justify-center items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Assets/contact.jpg")',
        }}
      >
        <div className="text-white max-w-fit">
          <h1 className="text-6xl font-semibold uppercase">Blog</h1>
          <div className="flex items-center justify-between text-lg">
            <Link href={"/home"}>Home</Link>
            <BiArrowToRight />
            <Link href={"/blog"}>Blog</Link>
          </div>
        </div>
      </div>
      {/* blog cover end */}

      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {/* blog cards start */}
          <div className="grid grid-cols-1 col-span-3 gap-6 sm:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
              <div
                className="w-full overflow-hidden bg-white shadow-lg cursor-pointer "
                key={i}
              >
                <img
                  className="object-cover w-full transition-transform duration-500 transform hover:scale-110 "
                  src="/Assets/destination-5.jpg"
                  alt=""
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-normal uppercase sm:text-base text-lime-600">
                    Admin | Tours & Travels
                  </h3>
                  <h1 className="text-xl sm:text-3xl hover:text-lime-600">
                    Cox's Bazar such a beautiful place look like
                  </h1>
                </div>
              </div>
            ))}
          </div>
          {/* blog cards end */}

          {/* categories start */}

          {/* categories end */}

          {/* recent post & tags start */}
          <div className="col-span-2 p-4 bg-white shadow-lg lg:col-span-1">
            <h1 className="mb-6 text-2xl font-semibold tracking-widest uppercase">
              Recent Post
            </h1>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((e, i) => (
                <div
                  key={i}
                  className="h-[100px] flex items-center gap-2 bg-white"
                >
                  <img className="w-[150px] border h-full" src="" alt="" />
                  <div className="p-2 space-y-1">
                    <h1>Sundarban awesome travel guide for joyful journey</h1>
                    <h3 className="font-light text-lime-600">Jan 1, 2023</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* recent post & tags end */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
