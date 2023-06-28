"use client";
import { useData } from "@/context/PostContext";
import React, { useState } from "react";
import CardPost from "./CardPost";
import { motion } from "framer-motion";

export default function PostHero() {
  const { posts, loading } = useData();
  const [pageSekarang, setPageSekarang] = useState(1);
  const [postPerPage] = useState(6);

  const indexAkhirPost = pageSekarang * postPerPage;
  const indexAwalPost = indexAkhirPost - postPerPage;
  const PostSekarang = posts.slice(indexAwalPost, indexAkhirPost);

  const nextClick = () => {
    window.scrollTo(0, 0);
    setPageSekarang(pageSekarang + 1);
  };

  const backClick = () => {
    window.scrollTo(0, 0);
    setPageSekarang(pageSekarang - 1);
  };

  return (
    <div className="border-b-2 border-gray-800 pb-5 lg:py-5">
      <h2 className="mt-10 mx-3 text-center font-inter font-bold text-3xl lg:text-4xl text-[#FBFBFB]">
        Eksplor To Our Project
      </h2>
      <p className="mt-3 mb-28 mx-3 text-center font-inter font-bold text-sm lg:text-xl text-[#FBFBFB]">
        Wheter you’re a new sessoned designer explore resource to grow your
        carreer
      </p>

      <div className="absolute ml-10 -mt-[5rem] lg:hidden">
        <span className="absolute inset-y-0 right-3 flex items-center">
          <label for="seearch">
            <svg
              className="w-5 h-5 text-[#87898D] cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </label>
        </span>

        <input
          className="py-2 pl-5 pr-12 text-Poppins text-lg text-white bg-[#242D3B] rounded-lg focus:ring-[#39d0ce] focus:outline-none focus:ring"
          type="text"
          placeholder="Search"
          id="seearch"
        />
      </div>

      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="container lg:-mt-16 px-6 font-inter mx-auto sm:flex sm:flex-wrap sm:gap-6 sm:justify-evenly">
            {PostSekarang.map((data) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 2.2 }}
                exit={{ opacity: 0 }}
              >
                <CardPost key={data._id} post={data} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 justify-center space-x-16 lg:space-x-[48rem] flex">
            {pageSekarang !== 1 && (
              <button onClick={backClick} className="px-4 py-2 mx-1 font-inter font-semibold lg:text-lg text-[#319795] border border-[#03FAEB]">
                <div className="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>

                  <span className="mx-1">Preview</span>
                </div>
              </button>
            )}

            {PostSekarang.length > postPerPage && (
              <button onClick={nextClick} className="px-4 py-2 mx-1 font-inter font-semibold lg:text-lg text-[#319795] border border-[#03FAEB]">
                <div className="flex items-center -mx-1">
                  <span className="mx-1">Next page</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
