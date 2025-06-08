import { Menu } from "lucide-react";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex py-4 px-6 md:py-6 md:px-8 justify-between lg:justify-center items-center bg-[#131313]">
      <div className="flex justify-between items-center w-full lg:max-w-[1430px]">

        <ul className="hidden lg:flex items-center gap-12 space-x-6 font-lexend font-normal text-[20px] leading-[100%] tracking-[0%] text-[#FFFFFF]">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/buscar">Buscar</Link></li>
          <li><Link to="/library">Minha biblioteca</Link></li>
        </ul>


        <h1 className="font-lexend font-normal text-[20px] md:text-[32px] leading-[100%] tracking-[0%] text-[#EB4848]">
          Music Legends
        </h1>


        <div className="flex items-center space-x-6">
          <Menu />
          <img src="/profile.png" alt="Album" className="w-[32px] h-auto object-cover" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
