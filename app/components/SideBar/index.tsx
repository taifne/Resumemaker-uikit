import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronRight, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Use Next.js Link component

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  badge?: number;
  subItems?: SidebarItem[];
}

interface SidebarTheme {
  background: string;
  text: string;
  activeBackground: string;
  activeText: string;
  hoverBackground: string;
  border?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  theme?: "light" | "dark" | SidebarTheme;
  collapsedWidth?: string;
  expandedWidth?: string;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onToggleCollapse?: (isCollapsed: boolean) => void;
  enableTouchGestures?: boolean;
  subMenuOpenDelay?: number;
  customSubMenuIcon?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  theme = "dark",
  collapsedWidth = "80px",
  expandedWidth = "240px",
  logo,
  showLogo = true,
  onToggleCollapse,
  enableTouchGestures = true,
  subMenuOpenDelay = 300,
  customSubMenuIcon,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const themeConfig: SidebarTheme = typeof theme === "string" ? 
    {
      light: {
        background: "bg-white",
        text: "text-gray-800",
        activeBackground: "bg-blue-500",
        activeText: "text-white",
        hoverBackground: "bg-gray-100",
        border: "border-gray-200",
      },
      dark: {
        background: "bg-gradient-to-b from-gray-800 to-gray-700", // Gradient background for dark theme
        text: "text-white",
        activeBackground: "bg-blue-600",
        activeText: "text-white",
        hoverBackground: "bg-gray-700",
        border: "border-gray-700",
      },
    }[theme] : theme;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse?.(!isCollapsed);
    setOpenSubMenu(null);
  };

  const handleSubMenu = (link: string) => {
    if (openSubMenu === link) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(link);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!enableTouchGestures || !sidebarRef.current) return;

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) > 50) {
        setIsCollapsed(deltaX > 0 ? false : true);
      }
    };

    sidebarRef.current.addEventListener("touchstart", handleTouchStart);
    sidebarRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      sidebarRef.current?.removeEventListener("touchstart", handleTouchStart);
      sidebarRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enableTouchGestures]);

  return (
    <motion.div
      ref={sidebarRef}
      className={`flex flex-col h-full shadow-xl ${themeConfig.background} ${themeConfig.text} ${
        themeConfig.border ? `border-r ${themeConfig.border}` : ""
      } rounded-lg`}
      style={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
        minWidth: isCollapsed ? collapsedWidth : expandedWidth,
      }}
      initial={false}
      animate={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Sidebar Header */}
      {showLogo && (
        <motion.div
          className={`flex items-center p-4 ${isCollapsed ? "justify-center" : "justify-between"}`}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold tracking-wide"
            >
              {logo || "MyApp"}
            </motion.div>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-current transition-all"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </motion.div>
      )}

      {/* Sidebar Menu Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.link} className="relative">
              <Link href={item.link} passHref>
                <motion.div
                  className={`flex items-center rounded-lg p-3 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    1
                      ? `${themeConfig.activeBackground} ${themeConfig.activeText} shadow-md`
                      : `hover:${themeConfig.hoverBackground}`
                  }`}
                >
                  <div className="flex items-center w-full">
                    <span className="text-xl mr-3">{item.icon}</span>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 truncate font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {item.badge && !isCollapsed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {item.subItems && !isCollapsed && (
                      <motion.div
                        className="ml-2"
                        animate={{ rotate: openSubMenu === item.link ? 90 : 0 }}
                      >
                        {customSubMenuIcon || <FaChevronRight />}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </Link>

              {/* Subitems */}
              {item.subItems && (
                <AnimatePresence>
                  {openSubMenu === item.link && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-8 pt-1"
                    >
                      <ul className="space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.link}>
                            <Link href={subItem.link} passHref>
                              <motion.div
                                className={`flex items-center rounded-lg p-2 text-sm ${
                                  1
                                    ? "bg-opacity-20 bg-current"
                                    : `hover:${themeConfig.hoverBackground}`
                                }`}
                              >
                                <FaCircle className="w-2 h-2 mr-2" />
                                <span className="truncate">{subItem.label}</span>
                              </motion.div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapsed Tooltips */}
      {isCollapsed && (
        <div className="absolute left-full ml-2">
          {items.map((item) => (
            <motion.div
              key={item.link}
              className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {item.label}
              {item.badge && (
                <span className="ml-2 px-2 py-1 bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
