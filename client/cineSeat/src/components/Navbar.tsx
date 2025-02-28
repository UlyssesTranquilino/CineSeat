import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../global/mode";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import Logo from "../assets/Logo/CineSeatRed.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";

const drawerWidth = 240;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  //Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="flex items-center justify-between px-2 h-14  text-white light:text-black">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="CineSeat Logo" className="w-10" />
          <h1 className="font-bold text-lg ">CineSeat</h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-5">
        <Link to="/signup">
          <h1 className="border-[#FD1513] hover:border-b-1">Sign up</h1>
        </Link>
        <Link to="login">
          <h1 className="border-[#FD1513] hover:border-b-1">Log in</h1>
        </Link>

        <div onClick={toggleTheme} className="cursor-pointer">
          {isDarkMode ? (
            <LightModeOutlinedIcon className="pages  hover:text-yellow-500  light:hover:text-[#3c73ff] transition-colors duration-200" />
          ) : (
            <DarkModeOutlinedIcon className="pages light:hover:text-[#3c73ff] transition-colors duration-200" />
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
            backgroundColor: isDarkMode ? "rgba(4, 10, 25, 0.7)" : "white",
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
              <LightModeOutlinedIcon className="text-white pages hover:text-yellow-500  light:hover:text-[#3c73ff] transition-colors duration-200" />
            ) : (
              <DarkModeOutlinedIcon className="pages light:text-black light:hover:text-[#FD1513] transition-colors duration-200" />
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
