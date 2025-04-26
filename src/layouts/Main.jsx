import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Banner from "../components/banner/Banner";

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

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     e.preventDefault();
  //     if (
  //       !sidebarRef.current.contains(e.target) &&
  //       !e.target.matches(".open-sidebar")
  //     ) {
  //       setShowSidebar(false);
  //     }
  //   };
// 
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div className="p-5 bg-black">
        <Header />
        <div className="flex justify-end px-4 pt-2 md:px-7 md:hidden">
          <span
            className="flex items-center justify-end px-2 py-1 rounded-md cursor-pointer open-sidebar w-max bg-primary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="text-base text-white pointer-events-none bx bx-menu"></i>
          </span>
        </div>
        <div className={`${location.pathname === "/" ? "block" : "hidden"}`}>
          <Banner />
        </div>

        <div
          className={` ${
            location.pathname === "/" ? "pt-[555px]" : "pt-[55px]"
          }`}
        >
          <div className="w-full ">
            <Outlet></Outlet>
          </div>
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
