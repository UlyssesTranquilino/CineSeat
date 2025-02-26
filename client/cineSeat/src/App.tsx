import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

//Background
import CircleGradient from "./Background/CircleGradient";
function App() {
  return (
    <div className="bg-red-900 w-full max-w-[1200px] mx-auto">
      <div className="relative z-1">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
      <CircleGradient />
    </div>
  );
}

export default App;
