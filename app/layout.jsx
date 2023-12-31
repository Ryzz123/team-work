import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
export const fetchCache = "only-no-store";

export const metadata = {
  title: "RFERTECH | TEAM",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1A202C] p-0 m-0 box-border`}>
        <Provider>
          <Navbar />
          <div className="lg:pt-14 pt-20">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
