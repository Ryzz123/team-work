"use client";
import React from "react";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useData } from "@/context/PostContext";

export const Hero = () => {
  const { data: session } = useSession();
  const [providers, setProvider] = useState(null);
  const router = useRouter();
  const { handleSaveImage } = useData();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setUpProviders();
  }, []);

  const detailPost = () => {
    router.push("/post?id=2");
  };

  return (
    <>
      <div className="container print-content px-6 font-inter max-w-md mx-auto sm:max-w-xl md:max-w-5xl lg:flex lg:max-w-full lg:p-0 bg-[#1A202C]">
        <div className="lg:p-16 lg:flex-1">
          <h3 className="font-inter font-bold mt-10 text-4xl lg:mt-0 lg:text-5xl lg:leading-[70px] text-[#FBFBFB]">
            Welcome To Our <br /> Team{" "}
            <span className="text-[#319795]">Project</span>
          </h3>
          <p className="mt-4 font-inter font-normal lg:text-lg text-justify text-[#718096]">
            Ini adalah website yang kami bangun untuk kalian yang ingin melihat
            project yang kami, yang dimana kami butuh saran dan kritik dari
            review project ini
          </p>
          {!session?.user &&
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider?.name}
                onClick={() => signIn(provider?.id)}
                className="mt-4 sm:mt-6 flex px-5 justify-between py-3 lg:w-[40%] bg-[#2D37487D] rounded-[10px] shadow-lg tracking-wider ring-[0.5px] ring-white items-center duration-300 hover:ring-slate-500 hover:bg-gray-800"
              >
                <img
                  src="images/google-icon.svg"
                  className="w-6 mr-4 lg:mr-0"
                />
                <span className="font-Poppins font-medium text-sm text-[#FFFFFFB2]">
                  Sign in with {provider?.name}
                </span>
              </button>
            ))}
        </div>
        <div className="lg:p-16 hidden lg:flex lg:w-1/2">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="images/hero-image.svg"
          />
        </div>
      </div>
    </>
  );
};
