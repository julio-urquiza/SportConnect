import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import ProfileButton from "./ProfileButton.jsx";
import {
  CalendarCheck,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const { user, logoutRequest } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isOwner = user?.rol === "owner" || user?.role === "owner";

  const userName =
    user?.username ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Usuario";

  const formattedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const desktopLinkClass = (path) =>
    `relative flex items-center gap-2 py-1 transition-opacity hover:opacity-80 ${
      isActive(path) ? "text-orange-500" : "text-white"
    }`;

  const mobileLinkClass = (path) =>
    `block w-full rounded-xl px-4 py-3 text-left text-base transition ${
      isActive(path)
        ? "bg-orange-500/10 font-bold text-orange-500"
        : "text-white hover:bg-white/5"
    }`;

  const handleMobileLogout = async () => {
    await logoutRequest();
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="relative z-50 flex h-16 w-full items-center justify-between border-b border-[#1a1a3a] bg-[#00001a] px-4 md:px-8">
      {/* Logo */}
      <Link
        to="/"
        className="font-jura text-2xl font-bold text-[#ff5a00] sm:text-3xl"
      >
        SportConnect
      </Link>

      {/* Navegación desktop */}
      <div className="hidden items-center gap-6 md:flex">
        {!user &&
          (location.pathname === "/login" ? (
            <Link className={desktopLinkClass("/")} to="/">
              <span className="text-base">Inicio</span>

              {isActive("/") && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
              )}
            </Link>
          ) : (
            <Link className={desktopLinkClass("/login")} to="/login">
              <span className="text-base">Login</span>

              {isActive("/login") && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
              )}
            </Link>
          ))}

        {user && (
          <>
            <Link className={desktopLinkClass("/")} to="/">
              <span className="text-base font-bold">Inicio</span>

              {isActive("/") && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
              )}
            </Link>

            <Link
              className={desktopLinkClass("/reservas")}
              to="/reservas"
            >
              <CalendarCheck className="h-4 w-4" />

              <span className="text-base font-bold">
                Mis Reservas
              </span>

              {isActive("/reservas") && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
              )}
            </Link>

            {isOwner && (
              <Link
                className={desktopLinkClass("/dashboard")}
                to="/dashboard"
              >
                <LayoutDashboard className="h-4 w-4" />

                <span className="font-bold">
                  Mi Dashboard
                </span>

                {isActive("/dashboard") && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-orange-500" />
                )}
              </Link>
            )}

            <ProfileButton />
          </>
        )}
      </div>

      {/* Botón hamburguesa ñam ñam ñam ñam ñam */}
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500 text-orange-500 transition hover:bg-orange-500/10 md:hidden"
        onClick={() => setMobileOpen((value) => !value)}
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-7 w-7" />
        )}
      </button>

      {/* Menú mobile ñam ñam ñam ñam*/}
      <div
        className={`absolute left-0 right-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-[#1a1a3a] bg-[#00001a] shadow-2xl transition-all duration-200 md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="px-4 py-5">
          {!user &&
            (location.pathname === "/login" ? (
              <Link
                className={mobileLinkClass("/")}
                to="/"
                onClick={() => setMobileOpen(false)}
              >
                Inicio
              </Link>
            ) : (
              <Link
                className={mobileLinkClass("/login")}
                to="/login"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            ))}

          {user && (
            <>
              {/* Nombre del usuario mas cool para que no sea todo el correo (queda feo sino)*/}
              <div className="mb-3 border-b border-[#1a1a3a] px-4 pb-4">
                <p className="truncate font-jura text-lg font-bold text-orange-500">
                  {formattedUserName}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <Link
                  className={mobileLinkClass("/")}
                  to="/"
                  onClick={() => setMobileOpen(false)}
                >
                  Inicio
                </Link>

                {isOwner && (
                  <Link
                    className={mobileLinkClass("/dashboard")}
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mi Dashboard
                  </Link>
                )}

                <Link
                  className={mobileLinkClass("/reservas")}
                  to="/reservas"
                  onClick={() => setMobileOpen(false)}
                >
                  Mis Reservas
                </Link>

                <button
                  type="button"
                  className="mt-2 w-full rounded-xl px-4 py-3 text-left text-base text-red-500 transition hover:bg-red-500/10"
                  onClick={handleMobileLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;