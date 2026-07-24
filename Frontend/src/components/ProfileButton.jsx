import { ChevronDown, CalendarCheck, LogOut, ChevronUp } from "lucide-react";
import { useState } from "react";

const ProfileButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            {/* Botón */}
            <button 
                className="flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-[#00001A] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                onClick={() => setOpen((v) => !v)}
            >
                <span className="truncate">julio@gmail.com</span>
                {open 
                    ? (<ChevronUp className="h-4 w-4 rotate-180 transition-transform" />) 
                    : (<ChevronDown className="h-4 w-4 rotate-180 transition-transform" />)
                }
               
                
            </button>

            {/* Menú */}
            <div 
                className={`absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-700 bg-[#000030] shadow-2xl z-50
                    ${open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`
                }
            >

                {/* Header */}
                <div className="border-b border-gray-700 px-4 py-3">
                    <p className="text-xs text-gray-400">
                        Sesión iniciada como
                    </p>

                    <p className="truncate font-medium text-white">
                        julio@gmail.com
                    </p>
                </div>

                {/* Opciones */}
                <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-white transition hover:bg-white/5">
                    <CalendarCheck className="h-4 w-4" />
                    Mis Reservas
                </button>

                <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-500 transition hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                </button>

            </div>
        </div>
    )
}

export default ProfileButton