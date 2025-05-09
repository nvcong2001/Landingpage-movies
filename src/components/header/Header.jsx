import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";

const Header = ({ setShowSidebar }) => {
  return (
    <div className="h-[75px] flex items-center bg-black fixed top-0 left-0 right-0 z-[100] border-b-2 border-[#363437] bg-gradient-to-r from-[#181818] to-[#181818]/70 px-5 py-5">
      <Logo className="!mb-0" />
      <div className="flex justify-between flex-1">
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold p-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            TV Shows
          </NavLink>

          <NavLink
            to="/phim-bo"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Phim bộ
          </NavLink>
          <NavLink
            to="/phim-le"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Phim lẻ
          </NavLink>
          <NavLink
            to="/hoat-hinh"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Hoạt hình
          </NavLink>
        </div>
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold p-3">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Đăng nhập
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Đăng ký
          </NavLink>
        </div>
      </div>
      <div className="flex justify-end px-4 pt-2 ml-auto md:px-7 md:hidden">
        <span
          className="flex items-center justify-end px-2 py-1 rounded-md cursor-pointer open-sidebar w-max bg-primary"
          onClick={() => setShowSidebar(true)}
        >
          <i className="text-base text-white pointer-events-none bx bx-menu"></i>
        </span>
      </div>
    </div>
  );
};

export default Header;
