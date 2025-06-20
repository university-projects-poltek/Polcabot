import Logo from "../../assets/logo-v1.png";

export const Header = () => (
  <header className="p-4 flex items-center">
    <img src={Logo} alt="PolCaBot" className="w-6 h-6 mr-2" />
    <span className="text-white font-bold">PolCaBot</span>
  </header>
);
