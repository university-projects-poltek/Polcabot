import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo-v1.png";

export const Header = () => {
  const { pathname = "" } = useLocation();

  return (
    <header className="p-4 flex justify-between mx-5">
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="PolCaBot" className="w-6 h-6 mr-2" />
        <span className="font-bold" style={{ color: "var(--color-text)" }}>
          PolCaBot
        </span>
      </Link>

      {pathname === "/" && (
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button
              id="login-button"
              className="py-2 px-4 rounded-2xl font-semibold border transition-colors"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
                fontFamily: "Poppins",
              }}
            >
              Masuk
            </button>
          </Link>
          <Link to="/register">
            <button
              id="register-button"
              className="py-2 px-4 rounded-2xl font-semibold transition-colors"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))",
                color: "var(--color-text)",
                fontFamily: "Poppins",
              }}
            >
              Daftar
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};
