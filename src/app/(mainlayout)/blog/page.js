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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
          {/* blog cards start */}
          {/* <div className="grid grid-cols-1 col-span-3 gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
          <div className="grid grid-cols-1 col-span-3 gap-4 md:grid-cols-2 xl:grid-cols-3">
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

          {/* <div className="grid grid-cols-1 col-span-2 space-y-8 sm:grid-cols-2 xl:grid-cols-1 lg:col-span-2"> */}
          <div className="grid content-start grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-8 gap-x-4">
            {/* categories start */}
            <div>
              <h1 className="mb-6 text-2xl font-semibold tracking-widest uppercase">
                Categories
              </h1>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-white shadow-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-lg">
                      <BiArrowToRight className="text-lime-600" />
                      <p className="hover:underline">Web Design</p>
                    </div>
                    <p className="p-2 text-xs font-semibold text-white bg-lime-600">
                      56
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* categories end */}

            {/* recent post & tags start */}
            <div>
              <h1 className="mb-6 text-2xl font-semibold tracking-widest uppercase">
                Recent Post
              </h1>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((e, i) => (
                  <div
                    key={i}
                    className="h-[100px] cursor-pointer overflow-hidden flex items-center gap-2 bg-white shadow-lg"
                  >
                    <img
                      className="w-[120px] transition-transform duration-500 transform hover:scale-110 object-cover h-full"
                      src="/Assets/blog/blog-2.jpeg"
                      alt=""
                    />
                    <div className="p-2 space-y-1">
                      <h1 className="hover:text-lime-600">
                        Sundarban awesome travel guide
                      </h1>
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
    </div>
  );
};

export default Blog;
