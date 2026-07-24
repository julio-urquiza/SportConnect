import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import ProfileButton from "./ProfileButton.jsx"
import { CalendarCheck } from "lucide-react";


function Navbar() {
  const { user } = useContext(AuthContext)


  return (
    <nav className="flex h-16 w-full items-center border-b border-[#1a1a3a] bg-[#00001a] px-8 justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="font-jura text-3xl font-bold text-[#ff5a00]"
      >
        SportConnect
      </Link>

      <div className="flex gap-6 items-center">
        {
          !user && (
            <>
              <button className="relative flex items-center gap-2 py-1 text-white transition-opacity hover:opacity-80">
                <span className="text-base">
                  Inicio
                </span>
                {/* <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" /> */}
              </button>

              <button className="relative flex items-center gap-2 py-1 text-white transition-opacity hover:opacity-80">
                <CalendarCheck className="h-4 w-4 text-orange-500" />
                <span className="text-base font-bold text-orange-500">
                  Mis Reservas
                </span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
              </button>

              <ProfileButton />
            </>

          )
        }

      </div>
    </nav>
  )
}

export default Navbar;