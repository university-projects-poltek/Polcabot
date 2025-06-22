import React, { useState } from "react";
import Logo from "../../assets/logo-v1.png";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
        console.log("Role user yang login:", data.user.role); // ← Tambahkan ini
        alert("Login berhasil!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); // simpan role
        localStorage.setItem("name", data.user.name); //
        // Arahkan ke halaman sesuai role
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/chatroom");
        }
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("❌ Error saat login:", err);
      alert("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E24]">
      <div className="text-center w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <div className="text-white text-6xl mb-4">
            <img src={Logo} alt="PolCaBot Logo" />
          </div>
        </div>
        <h1
          className="text-white text-3xl font-extrabold"
          style={{ fontFamily: "Poppins" }}
        >
          Masuk ke <span className="text-gray-400 font-normal">PolCaBot</span>
        </h1>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-2xl border border-purple-600 text-pink-400 hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-colors font-extrabold"
            style={{ fontFamily: "Poppins" }}
          >
            Masuk
          </button>
        </form>
        <div className="text-gray-400 my-4">Atau</div>
        <Link to="/register">
          <button
            className="w-full py-2 rounded-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-colors"
            style={{ fontFamily: "Poppins" }}
          >
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
};
