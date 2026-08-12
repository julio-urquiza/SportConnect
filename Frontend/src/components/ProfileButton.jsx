import {
  ChevronDown,
  ChevronUp,
  CalendarCheck,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ColorContext } from "../context/ColorContext.jsx";

const ProfileButton = () => {
  const navigate = useNavigate();
  const { user, logoutRequest } = useContext(AuthContext);
  const { theme } = useContext(ColorContext);
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

      {/* Menú desplegable */}
      <div
        className={`absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border shadow-2xl transition-all duration-150 ${theme === "dark" ? "border-gray-700 bg-[#000030]" : "border-slate-200 bg-white shadow-slate-300/40"} ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* Información del usuario */}
        <div className={`border-b px-4 py-3 ${theme === "dark" ? "border-gray-700" : "border-slate-200"}`}>
          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
            Sesión iniciada como
          </p>

          <p className={`truncate font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {userLabel}
          </p>
        </div>

        {/* Visible para usuario común y owner */}
        <button
          type="button"
          className={`flex w-full items-center gap-2 px-4 py-3 text-left transition ${theme === "dark" ? "text-white hover:bg-white/5" : "text-slate-800 hover:bg-slate-100"}`}
          onClick={() => handleNavigate("/reservas")}
        >
          <CalendarCheck className="h-4 w-4" />
          Mis Reservas
        </button>

        {/* Visible solamente para owner */}
        {isOwner && (
          <button
            type="button"
            className={`flex w-full items-center gap-2 px-4 py-3 text-left transition ${theme === "dark" ? "text-white hover:bg-white/5" : "text-slate-800 hover:bg-slate-100"}`}
            onClick={() => handleNavigate("/dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" />
            Mi Dashboard
          </button>
        )}

        <button
          type="button"
          className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-500 transition hover:bg-red-500/10"
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
