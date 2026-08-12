import { ChevronRight } from "lucide-react";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";

export default function RoleCard({
  icon,
  title,
  description,
  onClick,
}) {
  const { theme } = useContext(ColorContext);
  const isDark = theme === "dark";

  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
    >
      <div className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-[#ff5a00]/15">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className={`font-jura text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>

        <p className={`mt-1 text-xs ${isDark ? "text-white/45" : "text-slate-500"}`}>
          {description}
        </p>
      </div>

      <ChevronRight className={`mt-2 size-4 ${isDark ? "text-white/30" : "text-slate-400"}`} />
    </button>
  );
}
