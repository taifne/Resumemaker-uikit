import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaSearch, FaBell, FaUserCircle, FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarTheme {
  background: string;
  text: string;
  hoverBackground: string;
  border: string;
}

interface NavbarProps {
  children?: React.ReactNode;
  theme?: "light" | "dark" | NavbarTheme;
  logo?: React.ReactNode;
  onThemeChange?: (isDark: boolean) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  notificationCount?: number;
  userMenuItems?: Array<{
    label: string;
    icon?: React.ReactNode;
    action: () => void;
  }>;
}

const Navbar: React.FC<NavbarProps> = ({
  children,
  theme = "light",
  logo,
  onThemeChange,
  searchPlaceholder = "Search...",
  onSearch,
  notificationCount = 0,
  userMenuItems = [],
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const themeConfig: NavbarTheme =
    typeof theme === "string"
      ? {
          light: {
            background: "bg-white",
            text: "text-gray-800",
            hoverBackground: "hover:bg-gray-100",
            border: "border-gray-200",
          },
          dark: {
            background: "bg-gray-900",
            text: "text-gray-100",
            hoverBackground: "hover:bg-gray-800",
            border: "border-gray-700",
          },
        }[theme]
      : theme;

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
      onThemeChange?.(e.matches);
    });
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    onThemeChange?.(newMode);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <nav
      className={`fixed w-full z-[1000] shadow-sm transition-colors duration-300 ${
        isDarkMode ? themeConfig.background : "bg-white"
      } ${isDarkMode ? themeConfig.border : "border-b border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto mx-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
          {children}
          </div>

          {/* Center Section - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <motion.div className="relative w-full" layout>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all focus:outline-none ${
                  isDarkMode
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500"
                }`}
              />
              <FaSearch
                className={`absolute left-3 top-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full relative ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <FaBell className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                    {notificationCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-1 ${
                      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border"
                    }`}
                  >
                    {/* Notification items would go here */}
                    <div className="px-4 py-2 text-sm">No new notifications</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <FaUserCircle
                  className={`h-7 w-7 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border"
                    }`}
                  >
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-2"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;