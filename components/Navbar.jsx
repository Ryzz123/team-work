"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState();

  const searchOnchange = () => {};

  return (
    <header className="bg-[#1A202C] fixed z-10 top-0 left-0 w-full flex items-center border-b-2 border-gray-800">
      <div className="container flex">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center ml-10 py-6">
            <Link href="/create-post">
              <h1 className="font-ArchivoBlack font-normal lg:text-2xl text-[#FBFBFB]">
                RFER<span className="text-[#319795]">TECH</span>
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative ml-14 mr-28 mt-4 md:mt-0 hidden lg:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="w-5 h-5 text-[#87898D]"
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
        </span>

        <input
          className="w-[40rem] py-2 pl-12 pr-4 text-Poppins text-lg text-[#898A8E] bg-[#242D3B] rounded-lg"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center mt-0 mr-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <button
            className="lg:hidden text-white transition-colors duration-500 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
            aria-label="show notifications"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {session?.user && (
            <>
              <div className="flex flex-col text-end">
                <p className="text-white font-bold hidden lg:block">
                  {session?.user?.name}
                </p>
                <p className="text-[#718096] text-sm hidden lg:block">
                  {session?.user?.email}
                </p>
              </div>
              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                  onClick={() => router.push("/profile")}
                  className="object-cover w-full h-full"
                  src={session?.user?.image}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
