import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppRouter from "./router";
import { toast } from "react-toastify";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Apply theme + persist it
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);

    toast.success(
      `Switched to ${darkMode ? "Light" : "Dark"} Mode`,
      { autoClose: 2000 }
    );
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Header />

        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className="fixed top-20 right-6 z-50 p-2 rounded-full
                     bg-gray-200 text-gray-900
                     dark:bg-gray-800 dark:text-gray-300
                     hover:scale-105 transition shadow-lg"
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>

        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
