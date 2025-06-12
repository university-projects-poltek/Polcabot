import React, { useState } from "react";
import Logo from "../../assets/logo-v1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, username, password, confirmPassword } = form;

    if (!name || !email || !username || !password || !confirmPassword) {
      return alert("Semua field wajib diisi");
    }

    if (password !== confirmPassword) {
      return alert("Password dan konfirmasi tidak cocok");
    }

    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", form);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E24] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="text-white text-6xl mb-4">
            <img src={Logo} alt="Logo" className="h-20" />
          </div>
          <h1 className="text-white text-3xl font-extrabold" style={{ fontFamily: "Poppins" }}>
            Daftar ke <span className="text-gray-300">PolCaBot</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan nama email"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Masukkan nama pengguna"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan kata sandi"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Masukkan kata konfirmasi sandi"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />

          <button
            type="submit"
            className="w-full py-2 rounded-2xl border border-purple-600 text-pink-400 hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-colors font-extrabold"
            style={{ fontFamily: "Poppins" }}
          >
            Daftar
          </button>

          <div className="text-gray-400 py-1">Atau</div>
          <Link to="/login">
            <button type="button" className="w-full py-2 rounded-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-500 hover:to-purple-500 transition-colors" style={{ fontFamily: "Poppins" }}>
              Masuk
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
