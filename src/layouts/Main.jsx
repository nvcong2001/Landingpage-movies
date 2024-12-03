import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import SideBarMenuMovie from "./SideBarMenuMovie";
import Footer from "./Footer";

const Main = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div>
        <div
          className={`grid ${
            location.pathname === "/"
              ? "grid-cols-[230px_minmax(0,1fr)320px]"
              : "grid-cols-[250px_minmax(0,1fr)] "
          }`}
        >
          <div className="border-r-2 border-[#363437] bg-gradient-to-r from-[#181818] to-[#181818]/50 px-5 py-5">
            <SideBar></SideBar>
          </div>
          <div className=" px-7">
            <Outlet></Outlet>
          </div>
          {location.pathname === "/" && (
            <div className="border-l-2 border-[#363437] bg-gradient-to-l from-[#181818] to-[#181818]/50 px-5 py-5 ">
              <SideBarMenuMovie></SideBarMenuMovie>
            </div>
          )}
        </div>
      </div>
      {visible && (
        <div className="fixed bottom-0 scroll-header right-5 cursor-pointer p-2 h-10 w-10 bg-red-500 z-[1000]">
          <a
            href="#traffic"
            className="flex items-center justify-center w-full h-full"
          >
            <i className="text-3xl bx bx-chevron-up"></i>
          </a>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};

export default Main;
