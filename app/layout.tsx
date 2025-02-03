"use client";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar, { SidebarItem } from "./components/SideBar";
import { AutocompleteIcon, UserIcon } from "./components/Icons";
import { FaInfoCircle, FaCogs, FaPhone } from "react-icons/fa";
import Breadcrumb, { BreadcrumbItem } from "./components/Breadcrumb";
import Navbar from "./components/NavBar";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const sidebarItems: SidebarItem[] = [
  { label: "AutoComplete", icon: <AutocompleteIcon />, link: "/autocomplete" },
  { label: "About", icon: <FaInfoCircle />, link: "/about" },
  { label: "Services", icon: <FaCogs />, link: "/services" },
  { label: "Contact", icon: <FaPhone />, link: "/contact" },
];

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: "/dashboard" },
  { label: "Analytics", link: "/dashboard/analytics" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900`}>
        <div className="flex min-h-screen overflow-hidden fixed h-screen w-full">
          {/* Sidebar */}
          <Sidebar
            items={sidebarItems}
            theme={{
              background: "bg-slate-900",
              text: "text-slate-100",
              activeBackground: "bg-indigo-600",
              activeText: "text-white",
              hoverBackground: "bg-slate-700",
              border: "border-slate-700",
            }}
            expandedWidth="280px"
            collapsedWidth="90px"
            enableTouchGestures
            customSubMenuIcon={<UserIcon />}
          
          />

          {/* Main Content */}
          <div className="flex flex-col flex-grow  h-full overflow-auto w-full">
            {/* Navbar & Breadcrumb */}
            <header className="w-full bg-white shadow-md sticky top-0 z-50">
              <Navbar>
                <Breadcrumb
                  items={breadcrumbItems}
                  separator=">"
                  linkClass="text-blue-600 hover:text-blue-800"
                  activeClass="text-gray-800 font-semibold"
                  separatorClass="mx-2 text-gray-500"
                />
              </Navbar>
            </header>

            {/* Page Content */}
            <main className=" mx-auto overflow-scroll w-full mt-20">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingSpinner/>}>
                  {children}
                </Suspense>
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}