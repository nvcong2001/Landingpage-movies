import Title from "./Title";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  return (
    <>
      <Title>MENU</Title>
      <div className="flex flex-col gap-[20px] text-base font-semibold p-3">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-home-alt-2"></i>
          Home
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-tv"></i>
          TV Shows
        </NavLink>
        <NavLink
          to="/movie"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-movie"></i>
          Movies
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-user"></i>
          Actors
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-user"></i>
          Phim bộ
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-user"></i>
          Phim lẻ
        </NavLink>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <i className="pr-3 text-lg bx bx-user"></i>
          Hoạt hình
        </NavLink>
      </div>
    </>
  );
};

export default SidebarMenu;
