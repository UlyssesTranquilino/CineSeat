import { useEffect, createContext } from "react";
import { itemPortal } from "./ItemContext";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

//Navbar
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Seat from "./pages/Seat";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import ProfileTickets from "./pages/Tickets/ProfileTickets";
import ProfileFavorites from "./pages/Favorites/ProfileFavorites";
import { useTheme } from "./global/mode";

import BookTickets from "./pages/BookTickets";

//Background Image
import CineSeatCover from "../src/assets/CineSeatCover.png";

function App() {
  const { isDarkMode } = useTheme();

  // Dynamically update the body class based on the theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }, [isDarkMode]);

  // Check if in auth route
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="relative px-3 w-full max-w-[1200px] mx-autolight:text-black light:bg-white ">
      {/* {isAuthRoute && (
        <img
          src={CineSeatCover}
          alt="CineSeat Cover"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-15"
        />
      )} */}
      <Navbar />
      <div className="relative z-1 ">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/ticket/:id" element={<BookTickets />} />
          <Route path="/movie/seat/:id" element={<Seat />} />
          <Route path="/movie/payment/:id" element={<Payment />} />
          <Route path="/movie/confirmation/:id" element={<Confirmation />} />
          <Route path="/tickets" element={<ProfileTickets />} />
          <Route path="/favorites" element={<ProfileFavorites />} />
          Add 404
        </Routes>
      </div>
      {/* {isDarkMode && <CircleGradient />} */}

      <Footer />
    </div>
  );
}

export default App;
