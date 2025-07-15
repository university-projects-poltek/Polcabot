import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Logo from "../assets/logo-v1.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="PolCaBot" className="w-6 h-6 " />
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              PolCaBot
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <a
              href="#fitur"
              className={`${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-200 hover:text-white"
              } transition-colors`}
            >
              Fitur
            </a>
            <a
              href="#testimonial"
              className={`${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-200 hover:text-white"
              } transition-colors`}
            >
              Testimoni
            </a>
          </div>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Mulai Chat
          </Link>
        </div>
      </div>
    </nav>
  );
};
