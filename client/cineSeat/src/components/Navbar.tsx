import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../global/mode";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import Logo from "../assets/Logo/CineSeatRed.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Drawer, IconButton } from "@mui/material";

import { useMovieStore } from "../global/mode";

const drawerWidth = 240;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Check if in auth route
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  //Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const { movies } = useMovieStore();

  const [isClearVisible, setIsClearVisible] = useState(false);

  const [query, setQuery] = useState("");
  const [moviesFind, setMoviesFind] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query) {
      const filtered = movies.filter((movie: any) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      setIsClearVisible(true);
      setMoviesFind(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setIsClearVisible(false);
      setMoviesFind([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSelectMovie = () => {
    setQuery("");
    setMoviesFind([]);
    setShowDropdown(false);
  };

  return (
    <nav className="flex items-center justify-between px-2 h-14  text-white light:text-black  ">
      <Link to="/">
        <div className="flex items-center gap-2 pr-3">
          <img src={Logo} alt="CineSeat Logo" className="w-11 sm:w-10" />
          <h1 className="font-bold text-lg hidden sm:block ">CineSeat</h1>
        </div>
      </Link>

      {!isAuthRoute && (
        <div className="sm:hidden w-full   max-w-110 sm:max-w-70 md:max-w-100 lg:max-w-125 relative">
          <div className="bg-[#363636] light:bg-gray-100 p-1 w-full flex items-center gap-2 rounded-md ">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-gray-200 light:text-gray-800 placeholder-[#9B9B9B] focus:outline-none px-2"
              placeholder="Search Movies"
            />
            {isClearVisible && (
              <CloseOutlinedIcon
                onClick={() => {
                  setQuery("");
                  setIsClearVisible(false);
                }}
                className="text-gray-300 light:text-gray-500 cursor-pointer hover:text-white light:hover:text-black transition-colors duration-300"
              />
            )}
            <SearchOutlinedIcon className="text-gray-300 light:text-gray-500 cursor-pointer hover:text-white light:hover:text-black transition-colors duration-300" />
          </div>
          {showDropdown && (
            <div className="w-full  max-w-110 sm:max-w-80 md:max-w-115 lg:max-w-125  custom-scrollbar max-h-120  overflow-y-auto absolute left-0 mt-1 bg-[#363636] light:bg-gray-100  border-0 rounded-md shadow-lg z-50 overflow-hidden ">
              {moviesFind.map((movie: any) => (
                <Link to={`/movie/${movie._id}`} key={movie._id}>
                  <div
                    className="light:hover:bg-gray-200 hover:bg-[#4C4C4C] flex items-center gap-4 p-2 rounded-md transition-all duration-300 cursor-pointer shadow-sm hover:shadow-sm"
                    onClick={handleSelectMovie}
                  >
                    {/* Movie Poster */}
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-300">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Movie Title */}
                    <h1
                      className="text-left font-medium text-gray-800 dark:text-gray-100 truncate w-full light:text-black"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {movie.title}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-5 w-full justify-end ">
        {!isAuthRoute && (
          <div className="sm:flex items-center gap-5 w-full justify-end ">
            <div className=" w-full   max-w-110 sm:max-w-70 md:max-w-100 lg:max-w-125 relative">
              <div className="bg-[#363636] light:bg-gray-100 p-1 w-full flex items-center gap-2 rounded-md ">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-gray-200 light:text-gray-800 placeholder-[#9B9B9B] focus:outline-none px-2"
                  placeholder="Search Movies"
                />
                {isClearVisible && (
                  <CloseOutlinedIcon
                    onClick={() => {
                      setQuery("");
                      setIsClearVisible(false);
                    }}
                    className="text-gray-300 light:text-gray-500 cursor-pointer hover:text-white light:hover:text-black transition-colors duration-300"
                  />
                )}
                <SearchOutlinedIcon className="text-gray-300 light:text-gray-500 cursor-pointer hover:text-white light:hover:text-black transition-colors duration-300" />
              </div>
              {showDropdown && (
                <div className="w-full  max-w-110 sm:max-w-80 md:max-w-115 lg:max-w-125  custom-scrollbar max-h-120  overflow-y-auto absolute left-0 mt-1 bg-[#363636] light:bg-gray-100  border-0 rounded-md shadow-lg z-50 overflow-hidden ">
                  {moviesFind.map((movie: any) => (
                    <Link to={`/movie/${movie._id}`} key={movie._id}>
                      <div
                        className="light:hover:bg-gray-200 hover:bg-[#4C4C4C] flex items-center gap-4 p-2 rounded-md transition-all duration-300 cursor-pointer shadow-sm hover:shadow-sm"
                        onClick={handleSelectMovie}
                      >
                        {/* Movie Poster */}
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-300">
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Movie Title */}
                        <h1
                          className="text-left font-medium text-gray-800 dark:text-gray-100 truncate w-full light:text-black"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {movie.title}
                        </h1>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/signup">
              <h1 className="border-[#FD1513] hover:border-b-1">Sign up</h1>
            </Link>
            <Link to="login">
              <h1 className="border-[#FD1513] hover:border-b-1">Log in</h1>
            </Link>
          </div>
        )}

        <div onClick={toggleTheme} className="cursor-pointer">
          {isDarkMode ? (
            <LightModeOutlinedIcon className="pages  hover:text-yellow-500  light:hover:text-[#3c73ff] transition-colors duration-200" />
          ) : (
            <DarkModeOutlinedIcon className="pages light:hover:text-blue-800 transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon className="text-white light:text-black" />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: isDarkMode ? "rgba(4, 10, 25, 0.8)" : "white",
          },
        }}
      >
        <div className=" items-center gap-5  flex flex-col pt-10 text-white light:text-black">
          <Link to="/signup">
            <h1 className="border-[#FD1513] hover:border-b-1">Sign up</h1>
          </Link>
          <Link to="login">
            <h1 className="border-[#FD1513] hover:border-b-1">Log in</h1>
          </Link>

          {/* Theme Toggle in Drawer */}
          <div onClick={toggleTheme} className="cursor-pointer">
            {isDarkMode ? (
              <LightModeOutlinedIcon className="text-white pages hover:text-yellow-500   transition-colors duration-200" />
            ) : (
              <DarkModeOutlinedIcon className="pages light:text-black light:hover:text-blue-800 transition-colors duration-200" />
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
