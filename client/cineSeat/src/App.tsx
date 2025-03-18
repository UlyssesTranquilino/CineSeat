import { useEffect } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

//Navbar
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

//HomePage
import HomePage from "./pages/HomePage";
//Movie Details
import MovieDetails from "./pages/MovieDetails";
import Seat from "./pages/Seat";

import { useTheme } from "./global/mode";

//Background
import CircleGradient from "./Background/CircleGradient";
import BookTickets from "./pages/BookTickets";
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

  return (
    <div className="px-3 w-full max-w-[1200px] mx-autolight:text-black light:bg-white ">
      <Navbar />
      <div className="relative z-1 ">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/ticket/:id" element={<BookTickets />} />
          <Route path="/movie/seat" element={<Seat />} />
        </Routes>
      </div>
      {/* {isDarkMode && <CircleGradient />} */}

      <Footer />
    </div>
  );
}

export default App;
