import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex py-4 px-6 md:py-6 md:px-8 justify-between lg:justify-center items-center bg-[#131313] relative z-50">
      <div className="flex justify-between items-center w-full lg:max-w-[1430px]">

        {/* Menu Desktop */}
        <ul className="hidden lg:flex items-center gap-12 font-lexend text-[20px] text-white">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/library">Minha biblioteca</Link></li>
        </ul>

        {/* Título Central */}
        <h1 className="font-lexend text-[20px] md:text-[32px] text-[#EB4848]">
          Music Legends
        </h1>

        {/* Ícones (menu + perfil) */}
        <div className="flex items-center space-x-4">
          <button
            className="block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
          <img
            src="/profile.png"
            alt="Perfil"
            className="w-[32px] h-auto object-cover"
          />
        </div>
      </div>

      {/* Menu Mobile Animado */}
      <div
        className={`absolute top-full left-0 w-full bg-[#1a1a1a] overflow-hidden flex-col px-6 text-white font-lexend text-lg transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? 'max-h-40 opacity-100 pt-4 pb-6 flex' : 'max-h-0 opacity-0 pt-0 pb-0 pointer-events-none flex'
        }`}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>Início</Link>
        <Link to="/library" onClick={() => setIsOpen(false)}>Minha biblioteca</Link>
      </div>
    </nav>
  );
}

export default Navbar;
