import { Link } from "react-router";
import { useLocation } from "react-router-dom";

import Logo from "../assets/logo-v1.png";

export const Header = () => {
  const { pathname = "" } = useLocation();

  return (
    <header className="p-4 flex justify-between mx-5">
      <Link to="/" className="flex">
        <img src={Logo} alt="PolCaBot" className="w-6 h-6 mr-2" />
        <span className="text-white font-bold">PolCaBot</span>
      </Link>

      {pathname === "/" && (
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-2xl border border-purple-600 text-pink-400 hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-colors font-extrabold"
              style={{ fontFamily: "Poppins" }}
            >
              Masuk
            </button>
          </Link>
          <Link to="/register">
            <button
              className="w-full py-2 px-3 rounded-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-colors"
              style={{ fontFamily: "Poppins" }}
            >
              Daftar
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};
