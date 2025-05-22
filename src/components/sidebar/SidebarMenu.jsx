import { NavLink } from "react-router-dom";
import SidebarTraffic from "./SidebarTraffic";
import Title from "./Title";
import { useEffect, useState, useRef } from "react";
import { categoryAPI, countryAPI } from "../../configAPI/movieTotal";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import { toast } from "react-toastify";

const SidebarMenu = ({ show, onClose }) => {
  const [countries, setCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  const countryRef = useRef(null);
  const categoryRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất thành công");
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const responseCountry = await countryAPI();
      setCountries(responseCountry.data.slice(0, -2));
      const responseCategory = await categoryAPI();
      setCategories(responseCategory.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-[250px] h-full z-[1000] bg-[#181818] text-white transition-transform duration-300 ease-in-out transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } md:hidden overflow-auto pb-16`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <i className="text-xl bx bx-x"></i>
        </button>
      </div>

      {/* User Profile Section at top if logged in */}
      {user && (
        <div className="px-4 mb-6 border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 overflow-hidden flex-shrink-0">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email.charAt(0)
                  )}&background=E11D48&color=fff&size=200`
                }
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.email.charAt(0)
                  )}&background=E11D48&color=fff&size=200`;
                }}
              />
            </div>
            <div>
              <p className="font-bold text-white">
                {user.displayName || user.email.split("@")[0]}
              </p>
              <p className="text-sm text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

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

        {/* Quốc gia */}
        <div className="relative select-none" ref={countryRef}>
          <span
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="cursor-pointer hover:text-primary"
          >
            Quốc gia
          </span>
          {showCountryDropdown && (
            <div className="flex flex-wrap w-full bg-[#252328] shadow-md rounded-md mt-2 transition-all duration-300">
              {countries.map((country) => (
                <NavLink
                  key={country.slug}
                  to={`/quoc-gia/${country.slug}`}
                  className="w-1/2 py-2 hover:bg-red-600 hover:white-black text-white text-sm text-center rounded-md"
                  onClick={() => {
                    setShowCountryDropdown(false);
                    onClose();
                  }}
                >
                  {country.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Thể loại */}
        <div className="relative select-none" ref={categoryRef}>
          <span
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="cursor-pointer hover:text-primary"
          >
            Thể loại
          </span>
          {showCategoryDropdown && (
            <div className="flex flex-wrap w-full bg-[#252328] shadow-md rounded-md mt-2 transition-all duration-300">
              {categories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/the-loai/${category.slug}`}
                  className="w-1/2 py-2 hover:bg-red-600 hover:white-black text-white text-sm text-center rounded-md"
                  onClick={() => {
                    setShowCategoryDropdown(false);
                    onClose();
                  }}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Favorites - Only shown when logged in */}
        {user && (
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
            }
            onClick={onClose}
          >
            <span>Yêu thích ({favorites.length})</span>
          </NavLink>
        )}

        {/* Authentication Links */}
        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
            }
            onClick={onClose}
          >
            <i className="bx bx-log-in"></i>
            <span>Đăng nhập</span>
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left"
          >
            <i className="bx bx-log-out"></i>
            <span>Đăng xuất</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default SidebarMenu;
