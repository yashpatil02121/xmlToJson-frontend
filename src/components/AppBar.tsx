import React from "react";
import ShinyText from "./ShinyText";

const AppBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1C1421] via-[#22172A] to-[#2D1E2F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-3">
          {/* Logo placeholder */}
          <img src="/public/tags2braceslogo.png" alt="Tags2Braces" className="w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-wide">
            Tags2Braces
          </span>
        </div>

        {/* Right: Nav Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white/80 hover:text-white transition">
          <ShinyText speed={5} text="~ Yash Patil" />
              </a>

        </nav>
      </div>
    </header>
  );
};

export default AppBar;
