import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SuggestionCard } from "../../components/suggestioncard";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#1E1E24] text-white flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4 py-10 mt-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-400">
          Tanya Apa Saja Seputar Akademik –{" "}
          <span className="text-pink-400">PolCaBot Siap Membantu!</span>
        </h1>
        <p className="mt-2 text-sm text-center text-gray-400">
          Mahasiswa Polibatam? PolCaBot Jawaban Segala Pertanyaan Akademikmu!
        </p>
        <p className="mt-8 mb-4 text-gray-400">Coba Sekarang!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <SuggestionCard key={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
