import React from "react";
import Logo from "../../assets/logo-v1.png";
import { Link } from "react-router";

export const Register = () => {
  return (
    <div className="min-h-screen bg-[#1E1E24] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="text-white text-6xl mb-4">
            <img src={Logo} alt="" srcset="" />
          </div>
          <h1
            className="text-white text-3xl font-extrabold"
            style={{ fontFamily: "Poppins" }}
          >
            Daftar ke <span className="text-gray-300">PolCaBot</span>
          </h1>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan nama email"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            placeholder="Masukkan kata konfirmasi sandi"
            className="w-full px-4 py-2 rounded-2xl bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />

          <button
            type="submit"
            className="w-full py-2 rounded-2xl border border-purple-600 text-pink-400 hover:bg-linear-to-r from-(--color-left) from-8% via-(--color-mid) via-61% to-(--color-right) to-95% hover:from-purple-600 hover:to-pink-600 hover:text-white transition-colors font-extrabold"
            style={{ fontFamily: "Poppins" }}
          >
            Daftar
          </button>

          <div className="text-gray-400 py-1">Atau</div>
          <Link to="/login">
            <button
              className="w-full py-2 rounded-2xl font-extrabold bg-linear-to-r from-(--color-left) from-8% via-(--color-mid) via-61% to-(--color-right) to-95% text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
              style={{ fontFamily: "Poppins" }}
            >
              Masuk
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
