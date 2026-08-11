import {
  ChevronDown,
  ChevronUp,
  CalendarCheck,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ColorContext } from "../context/ColorContext.jsx"; // 1. Importamos ColorContext

const ProfileButton = () => {
  const navigate = useNavigate();
  const { user, logoutRequest } = useContext(AuthContext);
  const { theme } = useContext(ColorContext); // 2. Consumimos el estado del tema
  const [open, setOpen] = useState(false);

  const isOwner = user?.rol === "owner" || user?.role === "owner";

  const userLabel =
    user?.email || user?.username || user?.name || "Mi perfil";

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    await logoutRequest();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Botón de perfil */}
      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-[#00001A] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="max-w-40 truncate">{userLabel}</span>

        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Menú desplegable adaptado al tema */}
      <div
        className={`absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border shadow-2xl transition-all duration-150 ${
          theme === "dark"
            ? "border-gray-700 bg-[#000030] text-white"
            : "border-gray-200 bg-white text-gray-900"
        } ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* Información del usuario */}
        <div
          className={`border-b px-4 py-3 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Sesión iniciada como
          </p>

          <p
            className={`truncate font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {userLabel}
          </p>
        </div>

        {/* Visible para usuario común y owner */}
        <button
          type="button"
          className={`flex w-full items-center gap-2 px-4 py-3 text-left transition ${
            theme === "dark"
              ? "text-white hover:bg-white/5"
              : "text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleNavigate("/reservas")}
        >
          <CalendarCheck className="h-4 w-4" />
          Mis Reservas
        </button>

        {/* Visible solamente para owner */}
        {isOwner && (
          <button
            type="button"
            className={`flex w-full items-center gap-2 px-4 py-3 text-left transition ${
              theme === "dark"
                ? "text-white hover:bg-white/5"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigate("/dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" />
            Mi Dashboard
          </button>
        )}

        <button
          type="button"
          className={`flex w-full items-center gap-2 px-4 py-3 text-left text-red-500 transition ${
            theme === "dark" ? "hover:bg-red-500/10" : "hover:bg-red-50"
          }`}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileButton;