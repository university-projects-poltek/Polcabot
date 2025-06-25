import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SuggestionCard } from "../../components/suggestioncard";
import Logo from "../../assets/logo-v1.png";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#1E1E24] text-white flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="flex justify-center items-center gap-3 mb-6">
          <img
            src={Logo}
            alt="PolCaBot Logo"
            className="w-14 h-14 md:w-16 md:h-16 drop-shadow hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            PolCaBot
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
          Tanya Apa Saja Seputar Akademik – PolCaBot Siap Membantu!
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          PolCaBot hadir untuk membantu mahasiswa Polibatam secara cepat,
          akurat, dan 24/7.
        </p>
        <div className="space-x-4">
          <a
            href="#fitur"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition"
          >
            Coba Sekarang!
          </a>
          <a
            href="#fitur"
            className="border border-gray-500 hover:border-white px-8 py-3 rounded-full text-white text-lg font-medium transition"
          >
            Pelajari Fitur
          </a>
        </div>

        {/* Statistik */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">1.500+</h3>
            <p className="text-gray-400">Pertanyaan terjawab</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">24/7</h3>
            <p className="text-gray-400">Dukungan non-stop</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">100%</h3>
            <p className="text-gray-400">Gratis & Mudah</p>
          </div>
        </div>

        {/* Testimoni */}
        <div className="mt-10 bg-gray-800 max-w-md mx-auto p-4 rounded-xl shadow text-left">
          <p className="text-sm text-gray-300 italic">
            “Bot ini sangat membantu saat saya bingung cari jadwal kuliah!”
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            — Sinta, Mahasiswa TI
          </p>
        </div>
      </section>

      {/* Fitur Section */}
      <section id="fitur" className="py-16 bg-gray-800 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          <div className="bg-gray-700 p-6 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">
              Cari Informasi Akademik
            </h3>
            <p className="text-gray-300">
              Tanyakan jadwal, dosen, atau info lainnya. Jawaban instan dari
              PolCaBot.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">Dukungan 24/7</h3>
            <p className="text-gray-300">
              Bot aktif kapanpun kamu butuh, bahkan di tengah malam sebelum
              deadline.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">
              Terintegrasi Sistem Kampus
            </h3>
            <p className="text-gray-300">
              Akses data KRS, jadwal kuliah, dan info lainnya langsung dari
              chatbot.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
