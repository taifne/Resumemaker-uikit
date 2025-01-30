import React from "react";

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <nav className="bg-white shadow-md p-3 pl-10 fixed  w-full z-[100000]">
      <div className="max-w-6xl  flex justify-start">{children}</div>
    </nav>
  );
};

export default Navbar;
