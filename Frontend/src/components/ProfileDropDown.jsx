import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ColorContext } from "../context/ColorContext.jsx"; 
// 1. Importamos ColorContext

const menuItems = [
    {
        group: "cuenta",
        items: [
            { label: "Ver perfil", action: "profile" },
            { label: "Configuración", action: "settings" },
            { label: "Notificaciones", action: "notifications" },
        ],
    },
    {
        group: "soporte",
        items: [
            { label: "Ayuda", action: "help" },
            { label: "Términos y privacidad", action: "terms" },
        ],
    },
];

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { user, logoutRequest } = useContext(AuthContext);
    const { theme } = useContext(ColorContext); // 2. Consumimos el tema
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="relative" ref={ref}>

                {/* Avatar button */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className={`
                        relative w-11 h-11 rounded-full overflow-hidden
                        ring-2 ring-offset-2
                        transition-all duration-200 cursor-pointer
                        focus:outline-none
                        ${theme === "dark" ? "ring-offset-zinc-950" : "ring-offset-white"}
                        ${open
                            ? "ring-green-500 scale-95"
                            : theme === "dark"
                                ? "ring-zinc-700 hover:ring-green-400 hover:scale-105"
                                : "ring-zinc-300 hover:ring-green-500 hover:scale-105"
                        }`
                    }
                    aria-label="Abrir menú de usuario"
                    aria-expanded={open}
                >
                    {user?.avatar 
                        ? 
                            (<img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />) 
                        : 
                            (<div className="w-full h-full bg-linear-to-br from-green-700 to-green-400 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold tracking-wide select-none">
                                    {user?.email?.slice(0, 2).toUpperCase() || "US"}
                                </span>
                            </div>)
                    }
                </button>

                {/* Dropdown */}
                <div
                    className={`
                        absolute right-0 mt-3 w-64
                        rounded-2xl shadow-2xl overflow-hidden z-50
                        transition-all duration-200 origin-top-right border
                        ${theme === "dark"
                            ? "bg-zinc-900 border-zinc-800 text-white shadow-black/60"
                            : "bg-white border-zinc-200 text-zinc-900 shadow-zinc-300/50"
                        }
                        ${open
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }
                    `}
                    role="menu"
                >
                    {/* User header */}
                    <div className={`px-4 py-4 border-b flex items-center gap-3 ${
                        theme === "dark" ? "border-zinc-800" : "border-zinc-100"
                    }`}>
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-700 to-green-400 flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-semibold">
                                {user?.email?.slice(0, 2).toUpperCase() || "US"}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className={`text-sm font-medium leading-tight truncate ${
                                theme === "dark" ? "text-white" : "text-zinc-900"
                            }`}>
                                {user?.name || "Usuario"}
                            </p>
                            <p className={`text-xs leading-tight truncate mt-0.5 ${
                                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                            }`}>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Menu groups */}
                    <div className="py-2">
                        {menuItems.map((group, gi) => (
                            <div key={gi}>
                                {group.items.map((item) => (
                                    <button
                                        key={item.action}
                                        role="menuitem"
                                        onClick={() => {
                                            console.log("Acción:", item.action);
                                            setOpen(false);
                                        }}
                                        className={`
                                            w-full flex items-center gap-3
                                            px-4 py-2.5 text-sm transition-colors duration-100 text-left
                                            focus:outline-none
                                            ${theme === "dark"
                                                ? "text-zinc-300 hover:bg-zinc-800 hover:text-white focus:bg-zinc-800"
                                                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100"
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                {gi < menuItems.length - 1 && (
                                    <div className={`my-1.5 mx-3 border-t ${
                                        theme === "dark" ? "border-zinc-800" : "border-zinc-200"
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sign out */}
                    <div className={`border-t py-2 ${
                        theme === "dark" ? "border-zinc-800" : "border-zinc-100"
                    }`}>
                        <button
                            role="menuitem"
                            onClick={() => {
                                logoutRequest();
                                setOpen(false);
                                navigate("/");
                            }}
                            className={`
                                w-full flex items-center gap-3
                                px-4 py-2.5 text-sm text-red-500
                                transition-colors duration-100 text-left
                                focus:outline-none
                                ${theme === "dark"
                                    ? "hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10"
                                    : "hover:bg-red-50 hover:text-red-600 focus:bg-red-50"
                                }
                            `}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}