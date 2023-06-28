"use client";

export default function Footer() {
  return (
    <footer className="">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full lg:w-2/5">
            <div className="px-28 lg:px-10">
              <div className="flex items-center py-4">
                <h1 className="font-ArchivoBlack font-normal text-xl lg:text-2xl text-[#FBFBFB]">
                  RFER<span className="text-[#319795]">TECH</span>
                </h1>
              </div>

              <p className="max-w-sm mt-5 font-inter font-normal text-xs lg:text-sm text-[#FFFFFF]">
                &copy; 2023 web design
              </p>

              <p className="max-w-sm mt-10 ml-8 lg:ml-10 font-inter font-normal text-xs lg:text-sm text-[#FFFFFF]">
                Follow Us
              </p>

              <div className="flex mt-10 ml-3 lg:ml-5 space-x-5">
                <button>
                  <img className="w-5" src="images/twiter-icon.svg" />
                </button>

                <button>
                  <img className="w-5" src="images/facebook-icon.svg" />
                </button>

                <button>
                  <img className="w-5" src="images/instagram-icon.svg" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:-ml-36 mb-5 mt-10 lg:mt-16 lg:flex-1 px-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-white hover:text-[#39d0ce] uppercase cursor-pointer">
                  Product
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Overview
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Tutorials
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Career
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Releases
                </a>
              </div>

              <div>
                <h3 className="text-white hover:text-[#39d0ce] uppercase cursor-pointer">
                  Company
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  About us
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Contact us
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Testimonials
                </a>
              </div>

              <div>
                <h3 className="text-white hover:text-[#39d0ce] uppercase cursor-pointer">
                  Support
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Terms of service
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Legal
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:text-[#39d0ce]"
                >
                  Status
                </a>
              </div>

              <div>
                <h3 className="text-white hover:text-[#39d0ce] uppercase cursor-pointer">
                  Stay up to date
                </h3>
                <div className="relative flex items-center mt-3">
                  <span className="absolute right-3 bg-[#47494C] rounded-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>

                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-[9rem] lg:w-[13rem] font-normal font-inter py-2.5 text-white placeholder-[#FFFFFF] bg-[#353941] rounded-xl pl-5 focus:ring-[#39d0ce] focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
