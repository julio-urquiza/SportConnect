import { CircleCheck } from "lucide-react";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";

const ServiciosCard = ({ servicios }) => {
    const { theme } = useContext(ColorContext);
    const isDark = theme === "dark";
    return (
        <div className={`rounded-2xl border p-5 ${isDark ? "border-gray-700 bg-[#00001A]/60" : "border-slate-200 bg-white shadow-sm"}`}>
            <h3 className={`mb-4 text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                INSTALACIONES
            </h3>

            <div className="flex flex-wrap gap-2">
                {servicios.map((item,index) => {
                    return (
                        <div key={index} className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm text-orange-500">
                            <CircleCheck className="h-4 w-4" />
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiciosCard
