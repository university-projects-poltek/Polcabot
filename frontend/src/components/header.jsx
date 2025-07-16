import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/logo-v1.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? " shadow-lg" : "bg-transparent"
      }`}
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="PolCaBot" className="w-6 h-6 " />
            </div>
            <span className={`text-xl font-bold text-white`}>PolCaBot</span>
          </Link>

          {userId ? (
            <button
              id="logout-button"
              className="py-2 px-4 rounded-2xl font-semibold border transition-colors"
              onClick={handleLogout}
              style={{
                border: "1px solid var(--color-primary)",
                backgroundColor: "rgba(59, 130, 246, 0.1)", // biru transparan
                color: "var(--color-primary)",
                fontFamily: "Poppins",
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <div className="hidden md:flex space-x-8">
                <a href="#fitur" className={"text-gray-200 hover:text-white"}>
                  Fitur
                </a>
                <a
                  href="#testimonial"
                  className={"text-gray-200 hover:text-white"}
                >
                  Testimoni
                </a>
              </div>

              <Link
                to="/login"
                className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
              >
                Mulai Chat
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
