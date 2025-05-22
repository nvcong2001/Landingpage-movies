import { NavLink, useNavigate, Link } from "react-router-dom";
import Logo from "../logo/Logo";
import { useEffect, useState, useRef } from "react";
import { categoryAPI, countryAPI } from "../../configAPI/movieTotal";
import useDebounceQuery from "../../hooks/useDebounceQuery";
import { movieSearchAPI } from "../../configAPI/movieTotal";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";

const Header = ({ setShowSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const countryRef = useRef(null);
  const categoryRef = useRef(null);
  const searchMobileRef = useRef(null);

  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFavoritesMenu, setShowFavoritesMenu] = useState(false);
  const userMenuRef = useRef(null);
  const favoritesMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ****
  const debounceValue = useDebounceQuery(query, 600); // 500ms debounce
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  useEffect(() => {
    const fetchSearch = async () => {
      if (!debounceValue.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }
      try {
        const res = await movieSearchAPI(debounceValue.trim());
        setSearchResults(res.data.data.items || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    };
    fetchSearch();
  }, [debounceValue]);
  //*** */

  const handleChangeQuery = (e) => setQuery(e.target.value);

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
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (
        searchMobileRef.current &&
        !searchMobileRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        favoritesMenuRef.current &&
        !favoritesMenuRef.current.contains(event.target)
      ) {
        setShowFavoritesMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/tim-kiem?keyword=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="h-[75px] flex items-center bg-black fixed top-0 left-0 right-0 z-[100] border-b-2 border-[#363437] bg-gradient-to-r from-[#181818] to-[#181818]/70 px-5 py-5">
      <Logo className="!mb-0" />
      <div className="flex justify-between flex-1 items-center">
        {/* Desktop Menu */}
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

          {/* Quốc gia Dropdown */}
          <div className="relative select-none" ref={countryRef}>
            <span
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="cursor-pointer hover:text-primary"
            >
              Quốc gia
            </span>
            {showCountryDropdown && (
              <div className="flex flex-wrap absolute top-[130%] right-0 w-[500px] max-h-[500px] overflow-y-auto bg-[#252328] shadow-md rounded-md z-50">
                {countries.map((country) => (
                  <NavLink
                    key={country.slug}
                    to={`/quoc-gia/${country.slug}`}
                    className="w-1/3 py-2 content-center hover:bg-red-600 hover:white-black text-white text-sm text-center rounded-md p-1"
                    onClick={() => setShowCountryDropdown(false)}
                  >
                    {country.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Thể loại Dropdown */}
          <div className="relative select-none" ref={categoryRef}>
            <span
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="cursor-pointer hover:text-primary"
            >
              Thể loại
            </span>
            {showCategoryDropdown && (
              <div className="flex flex-wrap absolute top-[130%] right-0 w-[500px] max-h-[400px] overflow-y-auto bg-[#252328] shadow-md rounded-md z-50">
                {categories.map((category) => (
                  <NavLink
                    key={category.slug}
                    to={`/the-loai/${category.slug}`}
                    className="w-1/3 py-2 content-center hover:bg-red-600 hover:white-black text-white text-sm text-center rounded-md p-1"
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex pl-8 gap-[20px] text-base font-semibold relative items-center">
          <div className="relative">
            <i className="bx bx-search-alt-2 text-white absolute left-3 top-1/2 -translate-y-1/2 text-2xl"></i>
            <input
              type="text"
              name="keyword"
              className="ring-stone-100 ring-2 focus:outline-none text-base text-white bg-black rounded-full py-2 pl-10 pr-5 font-semibold"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
              value={query}
              onChange={handleChangeQuery}
              onKeyDown={handleKeyDown}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute border top-full -left-20 -right-20 z-50 rounded-md mt-2 max-h-[350px] overflow-y-auto">
                {searchResults.map((movie) => (
                  <NavLink
                    key={movie._id || movie.id}
                    to={`/phim/${movie.slug}`}
                    className="block text-base text-white"
                    onClick={() => {
                      setQuery("");
                      setShowSearchResults(false);
                    }}
                  >
                    <div className="flex p-2 items-center gap-3 hover:bg-gray-200 hover:text-black bg-black text-base">
                      <img
                        src={`https://phimimg.com/${movie.thumb_url}`}
                        alt={movie.name}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <span className="text-sm">{movie.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Icon and Sidebar Button */}
        <div className="flex items-center gap-4 ml-auto md:hidden">
          <i
            className="bx bx-search-alt-2 text-white text-2xl cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          ></i>
          <span
            className="flex items-center justify-center px-2 py-1 rounded-md cursor-pointer open-sidebar w-max bg-primary"
            onClick={() => setShowSidebar(true)}
          >
            <i className="text-base text-white pointer-events-none bx bx-menu"></i>
          </span>
        </div>

        {/* Mobile Search Box */}
        {showSearch && (
          <div
            ref={searchMobileRef}
            className="absolute top-[75px] left-0 right-0 bg-white p-2 rounded-md shadow-md z-50"
          >
            <input
              type="text"
              name="keyword"
              className="w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-base text-black rounded-full py-2 pl-4 pr-5 font-semibold"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
              value={query}
              onChange={handleChangeQuery}
              onKeyDown={handleKeyDown}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute border top-full left-0 right-0 z-50 rounded-md mt-2 max-h-[350px] overflow-y-auto">
                {searchResults.map((movie) => (
                  <NavLink
                    key={movie._id || movie.id}
                    to={`/phim/${movie.slug}`}
                    className="block text-base text-white"
                    onClick={() => {
                      setQuery("");
                      setShowSearchResults(false);
                    }}
                  >
                    <div className="flex p-2 -m-[1px] items-center gap-3 hover:bg-gray-200 hover:text-black bg-black text-base">
                      <img
                        src={`https://phimimg.com/${movie.thumb_url}`}
                        alt={movie.name}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <span className="text-sm">{movie.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="relative" ref={favoritesMenuRef}>
                <button
                  onClick={() => setShowFavoritesMenu(!showFavoritesMenu)}
                  className="block text-white hover:text-red-500 transition relative"
                  title="Phim yêu thích"
                >
                  <i className="bx bxs-heart text-2xl"></i>
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>

                {showFavoritesMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#252328] rounded-md shadow-xl z-50 py-2">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <h3 className="text-white text-sm font-semibold">
                        Phim yêu thích ({favorites.length})
                      </h3>
                    </div>

                    {favorites.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-400">
                        Chưa có phim yêu thích nào
                      </div>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto">
                          {favorites.slice(0, 5).map((movie) => (
                            <Link
                              key={movie.id}
                              to={`/phim/${movie.slug}`}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
                              onClick={() => setShowFavoritesMenu(false)}
                            >
                              <div className="w-8 h-12 flex-shrink-0">
                                {movie.thumb_url && (
                                  <img
                                    src={
                                      movie.thumb_url.includes("http")
                                        ? movie.thumb_url
                                        : movie.thumb_url.includes("/")
                                        ? `https://image.tmdb.org/t/p/w92${movie.thumb_url}`
                                        : `https://phimimg.com/${movie.thumb_url}`
                                    }
                                    alt={movie.name}
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/45x68?text=No+Image";
                                    }}
                                  />
                                )}
                              </div>
                              <div className="flex-grow overflow-hidden">
                                <p className="text-white text-sm truncate">
                                  {movie.name || movie.title}
                                </p>
                                <p className="text-gray-400 text-xs truncate">
                                  {movie.origin_name || movie.original_title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {favorites.length > 5 && (
                          <div className="border-t border-gray-700 mt-1 pt-1">
                            <Link
                              to="/favorites"
                              className="block text-center py-2 text-sm text-gray-300 hover:text-white transition"
                              onClick={() => setShowFavoritesMenu(false)}
                            >
                              Xem tất cả ({favorites.length})
                            </Link>
                          </div>
                        )}
                      </>
                    )}

                    <div className="border-t border-gray-700 mt-1 pt-1">
                      <Link
                        to="/favorites"
                        className="block text-center py-2 text-sm text-gray-300 hover:text-white transition"
                        onClick={() => setShowFavoritesMenu(false)}
                      >
                        Quản lý phim yêu thích
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 overflow-hidden">
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Avatar failed to load:", e.target.src);
                        const fallbackName =
                          user.displayName || user.email?.charAt(0) || "U";
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          fallbackName
                        )}&background=E11D48&color=fff&size=200`;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <span className="text-white text-sm hidden md:inline-block">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#252328] rounded-md shadow-xl z-50">
                    <div className="px-4 py-3 text-sm text-gray-400 border-b border-gray-700">
                      Đã đăng nhập với
                      <div className="font-medium text-white truncate">
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700 rounded-b-md"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Đăng nhập
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
