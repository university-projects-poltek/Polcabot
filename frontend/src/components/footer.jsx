import Logo from "../assets/logo-v1.png";

export const Footer = () => {
  return (
    <footer className=" text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <img src={Logo} alt="PolCaBot" />
            </div>
            <span className="text-xl font-bold">PolCaBot</span>
          </div>
          <p className="text-gray-400 text-sm">
            Asisten virtual cerdas untuk mahasiswa Polibatam
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Fitur</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Info Akademik
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Jadwal Kuliah
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Data KRS
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Dukungan</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Panduan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Kontak
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Polibatam</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Website Resmi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Portal Akademik
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                E-Learning
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PolCaBot. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
};
