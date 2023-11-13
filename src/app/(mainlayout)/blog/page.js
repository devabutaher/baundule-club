"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Image from "next/image";

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
          <h1 className="text-6xl font-semibold uppercase text-center mb-1">Blog</h1>
          <p className="text-center">Don&apos;t focus on having a great blog. Focus on producing a blog that&apos;s great for your readers.</p>
        </div>
      </div>
      {/* blog cover end */}

      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-8">
          {/* blog cards start */}
          {/* <div className="grid grid-cols-1 col-span-3 gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
          <div className="grid grid-cols-1 col-span-3 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
              <article
                class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
                key={i}
              >
                <Image
                  alt="Office"
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  class="h-48 w-full object-cover transition-transform duration-500 transform hover:scale-110"
                  width={800}
                  height={300}
                />

                <div class="p-4 sm:p-6">
                  <h3 class="text-lg font-medium text-gray-900">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>

                  <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                    dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                    sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                    voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                  </p>

                  <Link
                    href={`/blogdetails/${1}`}
                    class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-lime-600"
                  >
                    Find out more

                    <span
                      aria-hidden="true"
                      class="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
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
                    <Image
                      className="w-[90px] transition-transform duration-500 transform hover:scale-110 object-cover h-52"
                      src="/Assets/blog/blog-2.jpeg"
                      alt=""
                      width={500}
                      height={500}
                    />
                    <div className="py-5 px-1 space-y-1">
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
