import { ChevronRight } from "lucide-react";

export default function RoleCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
    >
      <div className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-[#ff5a00]/15">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-jura text-base font-bold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-white/45">
          {description}
        </p>
      </div>

      <ChevronRight className="mt-2 size-4 text-white/30" />
    </button>
  );
}