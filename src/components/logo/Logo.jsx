import { NavLink } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <div className={`mb-[100px] ${className}`}>
      <NavLink to="/" className="flex items-center gap-2 w-max ">
        <i className="text-3xl rotate-45 bx bx-camera-movie text-[#e2d703]"></i>
        <span className="text-xl font-semibold">
          Movie World
          <span className=" text-primary">.</span>
        </span>
      </NavLink>
    </div>
  );
};

export default Logo;
