import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import { toast } from "react-toastify";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AppRouter from "./router";
import { getAntdTheme } from "../theme/antdTheme";

const { Content } = Layout;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Apply Tailwind dark mode class
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

  // Toggle theme handler
  const handleToggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      toast.success(`Switched to ${newMode ? "Dark" : "Light"} Mode`, {
        autoClose: 2000,
      });
      return newMode;
    });
  };

  return (
    <ConfigProvider theme={getAntdTheme(darkMode)}>
      <BrowserRouter>
        <Layout className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
          {/* Header */}
          <Header />

          {/* Theme Toggle Button */}
          <button
            aria-label="Toggle theme"
            onClick={handleToggleTheme}
            className="fixed top-20 right-6 z-50 p-2 rounded-full
                       bg-gray-200 text-gray-900
                       dark:bg-gray-800 dark:text-gray-300
                       hover:scale-105 transition shadow-lg"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>

          {/* Main Content */}
          <Content className="flex-1">
            <AppRouter />
          </Content>

          {/* Footer */}
          <Footer />
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;


