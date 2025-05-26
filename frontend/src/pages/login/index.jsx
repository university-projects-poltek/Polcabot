import React from "react";
import Logo from "../../assets/logo-v1.png";
import { Link } from "react-router";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E24]">
      <div className="text-center w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <div className="text-white text-6xl mb-4">
            <img src={Logo} alt="" srcset="" />
          </div>
        </div>
        <h1
          className="text-white text-3xl font-extrabold"
          style={{ fontFamily: "Poppins" }}
        >
          Masuk ke <span className="text-gray-400 font-normal">PolCaBot</span>
        </h1>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            className=" w-full px-4 py-2 rounded-2xl bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full px-4 py-2 rounded-2xl bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-roboto"
            style={{ fontFamily: "Anonymous Pro" }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-2xl border border-purple-600 text-pink-400 hover:bg-linear-to-r from-(--color-left) from-8% via-(--color-mid) via-61% to-(--color-right) to-95% hover:from-purple-600 hover:to-pink-600 hover:text-white transition-colors font-extrabold"
            style={{ fontFamily: "Poppins" }}
          >
            Masuk
          </button>
        </form>
        <div className="text-gray-400 my-4">Atau</div>
        <Link to="/register">
          <button
            className="w-full py-2 rounded-2xl font-extrabold bg-linear-to-r from-(--color-left) from-8% via-(--color-mid) via-61% to-(--color-right) to-95% text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
            style={{ fontFamily: "Poppins" }}
          >
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
};
