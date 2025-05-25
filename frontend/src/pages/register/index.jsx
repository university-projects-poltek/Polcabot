import React from "react";

export const Register = () => {
  return (
    <div className="min-h-screen bg-[#1E1E24] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="text-white text-6xl mb-4">
            <span role="img" aria-label="robot">
              🤖
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold">
            Daftar ke <span className="text-gray-300">PolCaBot</span>
          </h1>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan nama email"
            className="w-full px-4 py-2 rounded-md bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            className="w-full px-4 py-2 rounded-md bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full px-4 py-2 rounded-md bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Masukkan kata konfirmasi sandi"
            className="w-full px-4 py-2 rounded-md bg-[#2E2E38] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full py-2 rounded border border-pink-600 text-pink-400 hover:bg-pink-900 hover:text-white transition-colors"
          >
            Daftar
          </button>

          <div className="text-gray-400 py-1">Atau</div>

          <button
            type="button"
            className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};
