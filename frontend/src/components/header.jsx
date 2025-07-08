import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-v1.png";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="p-4 px-6 flex justify-between items-center border-b border-gray-700 w-full">
      {/* KIRI: Logo */}
      <Link to="/" className="flex items-center flex-shrink-0">
        <img src={Logo} alt="PolCaBot" className="w-6 h-6 mr-2" />
        <span className="font-bold" style={{ color: "var(--color-text)" }}>
          PolCaBot
        </span>
      </Link>

      {/* KANAN: Tombol Aksi */}
      <div className="flex items-center gap-4 ml-auto">
        {pathname === "/" ? (
          <>
            <Link to="/login">
              <button
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
                className="py-2 px-4 rounded-2xl font-semibold transition-colors"
                style={{
                  background: "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))",
                  color: "var(--color-text)",
                  fontFamily: "Poppins",
                }}
              >
                Daftar
              </button>
            </Link>
          </>
        ) : (
          userId && (
            <button
              id="login-button"
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
          )
        )}
      </div>
    </header>
  );
};
