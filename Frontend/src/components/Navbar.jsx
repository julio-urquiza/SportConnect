import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import ProfileDropdown from "./ProfileDropDown.jsx"

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
          user &&
            <ProfileDropdown />
        }

      </div>
    </nav>
  )
}

export default Navbar;