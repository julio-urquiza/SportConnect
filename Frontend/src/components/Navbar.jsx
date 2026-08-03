import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import ProfileButton from "./ProfileButton.jsx"
import { CalendarCheck, LayoutDashboard } from "lucide-react";


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
                    user && (
                        <>

                            <Link
                                className="relative flex items-center gap-2 py-1 text-white transition-opacity hover:opacity-80"
                                to={"/login"}>

                                <span className="text-base">
                                    Login
                                </span>
                                {/* <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" /> */}
                            </Link>
                            <Link
                                className="relative flex items-center gap-2 py-1 text-white transition-opacity hover:opacity-80"
                                to={"/"}>

                                <span className="text-base">
                                    Inicio
                                </span>
                                {/* <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" /> */}
                            </Link>

                            <Link
                                className="relative flex items-center gap-2 py-1 text-white transition-opacity hover:opacity-80"
                                to={"/reservas"}>

                                <CalendarCheck className="h-4 w-4 text-orange-500" />
                                <span className="text-base font-bold text-orange-500">
                                    Mis Reservas
                                </span>
                                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                            </Link>

                            <Link
                                className="relative flex items-center gap-2 py-1 text-orange-500 transition-opacity hover:opacity-80"
                                to={"/dashboard"}>

                                <LayoutDashboard className="h-4 w-4" />

                                <span className="font-bold">
                                    Mi Dashboard
                                </span>

                                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                            </Link>

                            <ProfileButton />
                        </>

                    )
                }

            </div>
        </nav>
    )
}

export default Navbar;