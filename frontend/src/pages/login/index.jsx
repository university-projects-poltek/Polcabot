import React from "react";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E24]">
      <div className="text-center w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="text-white text-6xl mb-4">
            <span role="img" aria-label="robot">
              🤖
            </span>
          </div>
        </div>
        <h1 className="text-white text-2xl font-semibold">
          Masuk ke <span className="text-gray-400 font-normal">PolCaBot</span>
        </h1>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            className="w-full px-4 py-2 rounded bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full px-4 py-2 rounded bg-[#2D2D34] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full py-2 rounded border border-pink-600 text-pink-400 hover:bg-pink-900 hover:text-white transition-colors"
          >
            Masuk
          </button>
        </form>
        <div className="text-gray-400 my-4">Atau</div>
        <button className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors">
          Daftar
        </button>
      </div>
    </div>
  );
};
