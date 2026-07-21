import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import ProfileDropdown from "./ProfileDropDown.jsx"

function Navbar() {
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const linkMap = {
    '/login': { to: '/register', label: 'Register' },
    '/register': { to: '/login', label: 'Login' },
  }
  const currentLink = linkMap[location.pathname] || { to: '/login', label: 'Login' };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-400 hover:text-green-300 transition"
        >
          SportConnect
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-green-400 transition"
          >
            Home
          </Link>
          {
            user
              ? 
              <ProfileDropdown />
              : 
              <Link
                to={currentLink.to}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {currentLink.label}
              </Link>
          }

        </div>
      </div>
    </nav>
  );
}

export default Navbar;