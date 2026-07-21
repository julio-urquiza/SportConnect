import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"

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
                        ring-2 ring-offset-2 ring-offset-zinc-950
                        transition-all duration-200 cursor-pointer
                        focus:outline-none
                        ${open
                            ? "ring-green-500 scale-95"
                            : "ring-zinc-700 hover:ring-green-400 hover:scale-105"
                        }`
                    }
                    aria-label="Abrir menú de usuario"
                    aria-expanded={open}
                >
                    {user.avatar 
                        ? 
                            (<img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />) 
                        : 
                            (<div className="w-full h-full bg-linear-to-br from-green-700 to-green-400 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold tracking-wide select-none">
                                    {user.email.slice(0, 2).toUpperCase()}
                                </span>
                            </div>)
                    }
                </button>

                {/* Dropdown */}
                <div
                    className={`
                        absolute right-0 mt-3 w-64
                        bg-zinc-900 border border-zinc-800
                        rounded-2xl shadow-2xl shadow-black/60
                        overflow-hidden z-50
                        transition-all duration-200 origin-top-right
                        ${open
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }
                    `}
                    role="menu"
                >
                    {/* User header */}
                    <div className="px-4 py-4 border-b border-zinc-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-700 to-green-400 flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-semibold">
                                {user.email.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-medium leading-tight truncate">
                                {user.name}
                            </p>
                            <p className="text-zinc-400 text-xs leading-tight truncate mt-0.5">
                                {user.email}
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
                                        className="
                                            w-full flex items-center gap-3
                                            px-4 py-2.5 text-sm text-zinc-300
                                            hover:bg-zinc-800 hover:text-white
                                            transition-colors duration-100 text-left
                                            focus:outline-none focus:bg-zinc-800
                                            "
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                {gi < menuItems.length - 1 && (
                                    <div className="my-1.5 mx-3 border-t border-zinc-800" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-zinc-800 py-2">
                        <button
                            role="menuitem"
                            onClick={() => {
                                logoutRequest();
                                setOpen(false);
                                navigate("/");
                            }}
                            className="
                                w-full flex items-center gap-3
                                px-4 py-2.5 text-sm text-red-400
                                hover:bg-red-500/10 hover:text-red-300
                                transition-colors duration-100 text-left
                                focus:outline-none focus:bg-red-500/10
                            "
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}