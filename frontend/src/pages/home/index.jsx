import { useState, useEffect } from "react";
import {
  ChevronDown,
  MessageCircle,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

import Logo from "../../assets/logo-v1.png";
import { Link } from "react-router";

export const Home = () => {
  const [visibleStats, setVisibleStats] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Bot ini sangat membantu saat saya bingung cari jadwal kuliah!",
      author: "Sinta, Mahasiswa TI",
      rating: 5,
    },
    {
      text: "Respon cepat dan akurat. Sangat membantu untuk info akademik!",
      author: "Budi, Mahasiswa Teknik Mesin",
      rating: 5,
    },
    {
      text: "Fitur KRS online sangat memudahkan proses registrasi.",
      author: "Ani, Mahasiswa Akuntansi",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observeStats = () => {
      const statElements = document.querySelectorAll(".stat-counter");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setVisibleStats((prev) => ({ ...prev, [id]: true }));
          }
        });
      });

      statElements.forEach((el) => observer.observe(el));
    };

    observeStats();

    // Testimonial rotation
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(testimonialTimer);
    };
  }, []);

  const StatCounter = ({ end, suffix = "", id, delay = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (visibleStats[id]) {
        setTimeout(() => {
          const timer = setInterval(() => {
            setCount((prev) => {
              if (prev >= end) {
                clearInterval(timer);
                return end;
              }
              return prev + Math.ceil(end / 50);
            });
          }, 50);
        }, delay);
      }
    }, [visibleStats[id], end, delay]);

    return (
      <span className="text-3xl font-bold text-yellow-400">
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <Header />

      {/* Hero Section */}
      <section className=" h-screen pt-24 pb-20 px-4  text-white overflow-hidden flex justify-center items-center">
        <div>
          <div className=" text-center max-w-5xl mx-auto">
            {/* Logo and Title */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20  rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                  <img src={Logo} alt="PolCaBot" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                PolCaBot
              </h1>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-yellow-300">
                Tanya Apa Saja Seputar Akademik
              </span>
              <br />
              <span className="text-white">PolCaBot Siap Membantu!</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              PolCaBot hadir untuk membantu mahasiswa Polibatam secara cepat,
              akurat, dan
              <span className="text-yellow-300 font-semibold"> 24/7</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                id="try-chat"
                to={"/login"}
                className="group bg-yellow-400 text-blue-900 px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Coba Sekarang!
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div
                className="stat-counter bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                data-id="questions"
              >
                <StatCounter end={1500} suffix="+" id="questions" />
                <p className="text-blue-100 mt-2">Pertanyaan terjawab</p>
              </div>
              <div
                className="stat-counter bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                data-id="support"
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-8 h-8 text-yellow-300" />
                  <span className="text-3xl font-bold text-yellow-300">
                    24/7
                  </span>
                </div>
                <p className="text-blue-100 mt-2">Dukungan non-stop</p>
              </div>
              <div
                className="stat-counter bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                data-id="free"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-8 h-8 text-yellow-300" />
                  <span className="text-3xl font-bold text-yellow-300">
                    100%
                  </span>
                </div>
                <p className="text-blue-100 mt-2">Gratis & Mudah</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-blue-200" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              <span className="text-white">Fitur Unggulan</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Solusi lengkap untuk kebutuhan informasi akademik mahasiswa
              Polibatam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Cari Informasi Akademik",
                description:
                  "Tanyakan jadwal, dosen, atau info lainnya. Jawaban instan dari PolCaBot.",
                color: "bg-blue-600",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Dukungan 24/7",
                description:
                  "Bot aktif kapanpun kamu butuh, bahkan di tengah malam sebelum deadline.",
                color: "bg-yellow-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Terintegrasi Sistem Kampus",
                description:
                  "Akses data KRS, jadwal kuliah, dan info lainnya langsung dari chatbot.",
                color: "bg-green-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm border  rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                  {feature.title}
                </h3>
                <p className="text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-20 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            <span className="text-white">Apa Kata Mahasiswa</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Testimoni dari pengguna yang sudah merasakan manfaat PolCaBot
          </p>

          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-lg">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map(
                (_, i) => (
                  <div key={i} className="w-6 h-6 text-yellow-400 mr-1">
                    ⭐
                  </div>
                )
              )}
            </div>
            <p className="text-lg md:text-xl text-white italic mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="text-yellow-500 font-semibold text-lg">
              {testimonials[currentTestimonial].author}
            </p>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-yellow-400"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6  text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Memulai Percakapan?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Bergabunglah dengan ribuan mahasiswa Polibatam yang sudah merasakan
            kemudahan PolCaBot
          </p>
          <Link
            to={"/login"}
            className="bg-yellow-400 text-blue-900 px-12 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Mulai Chat Gratis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
