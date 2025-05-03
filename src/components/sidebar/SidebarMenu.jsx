import { NavLink } from "react-router-dom";
import SidebarTraffic from "./SidebarTraffic";
import Title from "./Title";

const SidebarMenu = ({ show, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-[250px] h-full z-[1000] bg-[#181818] text-white transition-transform duration-300 ease-in-out transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <i className="text-xl bx bx-x"></i>
        </button>
      </div>
      <div className="px-4 mb-8">
        <SidebarTraffic />
        <Title>MENU</Title>
      </div>
      <nav className="flex flex-col gap-4 px-6 text-base font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Home
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          TV Shows
        </NavLink>
        <NavLink
          to="/phim-bo"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Phim bộ
        </NavLink>
        <NavLink
          to="/phim-le"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Phim lẻ
        </NavLink>
        <NavLink
          to="/hoat-hinh"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          onClick={onClose}
        >
          Hoạt hình
        </NavLink>
      </nav>
    </div>
  );
};

export default SidebarMenu;
