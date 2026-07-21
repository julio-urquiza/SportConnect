import { useState } from "react";

const SPORTS = [
  { id: "futbol5", label: "Fútbol 5", icon: "⚽" },
  { id: "futbol7", label: "Fútbol 7", icon: "⚽" },
  { id: "padel", label: "Pádel", icon: "🎾" },
  { id: "tenis", label: "Tenis", icon: "🎾" },
  { id: "basquet", label: "Básquet", icon: "🏀" },
  { id: "voley", label: "Vóley", icon: "🏐" },
  { id: "techada", label: "Techada", icon: "🏠" },
  { id: "iluminada", label: "Iluminada", icon: "💡" },
];

const MOCK_RESULTS = [
  {
    id: 1,
    name: "Club Deportivo Palermo",
    meta: "Palermo · Fútbol 5 y 7 · Techada",
    badge: "Disponible hoy",
  },
  {
    id: 2,
    name: "Padel Park Soho",
    meta: "Villa Crespo · Pádel · 6 canchas",
    badge: "$8.000/hr",
  },
  {
    id: 3,
    name: "Complejo La Boca Sport",
    meta: "La Boca · Fútbol 5 · Iluminada",
    badge: "Disponible hoy",
  },
];

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Palermo");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSports, setSelectedSports] = useState(["futbol5"]);
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);

  const toggleSport = (id) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredResults =
    query.length >= 2
      ? MOCK_RESULTS.filter(
          (r) =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.meta.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleSearch = () => {
    const params = {
      query,
      location,
      date,
      time,
      price,
      sports: selectedSports,
    };
    if (onSearch) onSearch(params);
    console.log("Búsqueda:", params);
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans p-6 space-y-4">
      {/* Label */}
      <p className="text-xs font-bold tracking-widest uppercase text-gray-400">
        Buscar canchas
      </p>

      {/* Main search bar */}
      <div
        className={`flex items-center gap-2 bg-white rounded-2xl pl-4 pr-2 py-2 border transition-all duration-200 ${
          focused
            ? "border-emerald-500 ring-2 ring-emerald-100"
            : "border-gray-200"
        }`}
      >
        {/* Search icon */}
        <svg
          className="w-5 h-5 text-emerald-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Text input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(e.target.value.length >= 2);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowResults(false), 150);
          }}
          placeholder="Nombre del complejo, barrio o dirección..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 min-w-0"
        />

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 flex-shrink-0" />

        {/* Location pill */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-100 bg-gray-50 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {location}
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 flex-shrink-0" />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-medium transition-all duration-150 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Buscar
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {showResults && filteredResults.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden -mt-2">
          {filteredResults.map((result) => (
            <button
              key={result.id}
              onMouseDown={() => {
                setQuery(result.name);
                setShowResults(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{result.name}</p>
                <p className="text-xs text-gray-400 truncate">{result.meta}</p>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex-shrink-0">
                {result.badge}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Secondary filters row */}
      <div className="flex gap-2.5 flex-wrap">
        {/* Date */}
        <div className="relative flex-1 min-w-[120px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full appearance-none pl-9 pr-8 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
          >
            <option value="">Cualquier día</option>
            <option value="hoy">Hoy</option>
            <option value="manana">Mañana</option>
            <option value="finde">Este fin de semana</option>
            <option value="semana">Esta semana</option>
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Time */}
        <div className="relative flex-1 min-w-[120px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full appearance-none pl-9 pr-8 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
          >
            <option value="">Cualquier hora</option>
            <option value="manana">Mañana (06–12hs)</option>
            <option value="tarde">Tarde (12–18hs)</option>
            <option value="noche">Noche (18–24hs)</option>
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Price */}
        <div className="relative flex-1 min-w-[120px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full appearance-none pl-9 pr-8 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
          >
            <option value="">Cualquier precio</option>
            <option value="low">Hasta $5.000</option>
            <option value="mid">$5.000 – $10.000</option>
            <option value="high">Más de $10.000</option>
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Sport chips */}
      <div className="flex flex-wrap gap-2">
        {SPORTS.map((sport) => {
          const isSelected = selectedSports.includes(sport.id);
          return (
            <button
              key={sport.id}
              onClick={() => toggleSport(sport.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 select-none ${
                isSelected
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <span>{sport.icon}</span>
              {sport.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default SearchBar