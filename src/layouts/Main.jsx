import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import SideBarMenuMovie from "./SideBarMenuMovie";
import Footer from "./Footer";

const Main = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      e.preventDefault();
      if (
        !sidebarRef.current.contains(e.target) &&
        !e.target.matches(".open-sidebar")
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(showSidebar);

  return (
    <>
      <div>
        <div className="flex justify-end px-4 pt-2 md:px-7 md:hidden">
          <span
            className="flex items-center justify-end px-2 py-1 rounded-md cursor-pointer open-sidebar w-max bg-primary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="text-base text-white pointer-events-none bx bx-menu"></i>
          </span>
        </div>

        <div
          className={`md:grid ${
            location.pathname === "/"
              ? "lg:grid-cols-[230px_minmax(0,1fr)320px] md:grid-cols-[250px_minmax(0,1fr)]  "
              : "grid-cols-[250px_minmax(0,1fr)] "
          }`}
        >
          <div
            ref={sidebarRef}
            className={`fixed z-10 top-0 bottom-0 w-[230px] md:relative border-r-2 border-[#363437] bg-gradient-to-r from-[#181818] to-[#181818]/70 px-5 py-5 transition-all duration-500 ease-in-out md:translate-x-0 ${
              showSidebar ? "translate-x-0" : "-translate-x-[100%]"
            }`}
          >
            <SideBar></SideBar>
          </div>
          <div className="w-full px-4 md:px-7">
            <Outlet></Outlet>
          </div>
          {location.pathname === "/" && (
            <div className="border-l-2 border-[#363437] bg-gradient-to-l from-[#181818] to-[#181818]/50 px-5 py-5 hidden lg:block ">
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
