import React, { useState } from "react";
import Logo from "../../assets/logo-v1.png";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Validasi sesuai test case L001 - L008
    if (!username && !password) {
      enqueueSnackbar("Semua field wajib diisi", { variant: "error" });
      return;
    }

    if (!username) {
      enqueueSnackbar("Username tidak boleh kosong", { variant: "error" });
      return;
    }

    if (!password) {
      enqueueSnackbar("Password tidak boleh kosong", { variant: "error" });
      return;
    }

    if (password.length < 6) {
      enqueueSnackbar("Password minimal 6 karakter", { variant: "error" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        enqueueSnackbar("Login berhasil!", { variant: "success" });

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("name", data.user.name);

        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/chatroom");
        }
      } else {
        enqueueSnackbar(data.message || "Login gagal", { variant: "error" });
      }
    } catch (err) {
      console.error("❌ Error saat login:", err);
      enqueueSnackbar("Error saat login", { variant: "error" });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="text-center w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="PolCaBot Logo" className="h-20" />
        </div>
        <h1
          className="text-3xl font-extrabold"
          style={{ fontFamily: "Poppins", color: "var(--color-text)" }}
        >
          Masuk ke{" "}
          <span style={{ color: "var(--color-muted)", fontWeight: "normal" }}>
            PolCaBot
          </span>
        </h1>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl border focus:outline-none focus:ring-2"
            style={{
              fontFamily: "Anonymous Pro",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              borderColor: "#4b5563",
              caretColor: "var(--color-primary)",
              outline: "none",
              boxShadow: "none",
              transition: "all 0.2s ease",
            }}
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl border focus:outline-none focus:ring-2"
            style={{
              fontFamily: "Anonymous Pro",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              borderColor: "#4b5563",
              caretColor: "var(--color-primary)",
            }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-2xl transition-colors font-extrabold"
            style={{
              fontFamily: "Poppins",
              border: "2px solid var(--color-primary)",
              color: "var(--color-primary)",
              background: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
          >
            Masuk
          </button>
        </form>

        <div style={{ color: "var(--color-muted)" }} className="my-4">
          Atau
        </div>

        <Link to="/register">
          <button
            className="w-full py-2 rounded-2xl font-extrabold text-white transition-colors"
            style={{
              fontFamily: "Poppins",
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))",
            }}
          >
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
};
