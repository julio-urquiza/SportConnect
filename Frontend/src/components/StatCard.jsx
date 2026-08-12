import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";

function StatCard({ value, label, color }) {
  const { theme } = useContext(ColorContext);
  const isDark = theme === "dark";

  return (
    <div className={`rounded-2xl border p-4 text-center ${isDark ? "border-gray-700 bg-[#00001A]/60" : "border-slate-200 bg-white shadow-sm"}`}>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

      <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
        {label}
      </p>
    </div>
  );
}   

export default StatCard
