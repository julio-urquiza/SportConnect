import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import ProfileButton from "./ProfileButton.jsx";
import { CalendarCheck, LayoutDashboard } from "lucide-react";

function Navbar() {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const isOwner = user?.rol === "owner" || user?.role === "owner";

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const linkClass = (path) =>
        `relative flex items-center gap-2 py-1 transition-opacity hover:opacity-80 ${isActive(path) ? "text-orange-500" : "text-white"
        }`;

    return (
        <nav className="flex h-16 w-full items-center justify-between border-b border-[#1a1a3a] bg-[#00001a] px-8">
            {/* Logo */}
            <Link to="/" className="font-jura text-3xl font-bold text-[#ff5a00]">
                SportConnect
            </Link>

            <div className="flex items-center gap-6">
                {!user && (
                    <>
                        {location.pathname === "/login" ? (
                            <Link className={linkClass("/")} to="/">
                                <span className="text-base">Inicio</span>
                                {isActive("/") && (
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                                )}
                            </Link>
                        ) : (
                            <Link className={linkClass("/login")} to="/login">
                                <span className="text-base">Login</span>
                                {isActive("/login") && (
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                                )}
                            </Link>
                        )}
                    </>
                )}

                {user && (
                    <>
                        <Link className={linkClass("/")} to="/">
                            <span className="text-base font-bold">Inicio</span>
                            {isActive("/") && (
                                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                            )}
                        </Link>


                        <Link className={linkClass("/reservas")} to="/reservas">
                            <CalendarCheck className="h-4 w-4" />
                            <span className="text-base font-bold">Mis Reservas</span>
                            {isActive("/reservas") && (
                                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                            )}
                        </Link>


                        {isOwner && (
                            <Link className={linkClass("/dashboard")} to="/dashboard">
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="font-bold">Mi Dashboard</span>
                                {isActive("/dashboard") && (
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                                )}
                            </Link>
                        )}

                        <ProfileButton />
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;