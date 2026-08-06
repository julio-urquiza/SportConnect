import { useState } from "react";

const sports = [
  { id: "padel", label: "🎾 Pádel" },
  { id: "tenis", label: "🎾 Tenis" },
  { id: "futbol", label: "⚽ Fútbol" },
];

const zones = [
  "Palermo",
  "Recoleta",
  "Belgrano",
  "Caballito",
  "Nuñez",
  "San Telmo",
  "Villa Urquiza",
  "Barracas",
  "Colegiales",
  "Flores",
  "Almagro",
];

const facilities = [
  "Vestuarios",
  "Estacionamiento",
  "Cafetería",
  "Bar",
  "Buffet",
  "WiFi",
  "Iluminación LED",
  "Aire acondicionado",
  "Cancha cubierta",
  "Quincho",
  "Parrilla",
  "Piscina",
  "Gimnasio",
  "Césped sintético",
];

const hours = Array.from({ length: 16 }, (_, i) =>
  `${String(i + 7).padStart(2, "0")}:00`
);

const inputClass =
  "w-full rounded-xl border border-zinc-700 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none";

const labelClass =
  "mb-2 block text-sm text-zinc-400";

export default function CreateCourt() {
  const [sport, setSport] = useState("padel");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const toggleHour = (hour) => {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour]
    );
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-[#00001A]/60 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Nueva Cancha
      </h2>

      <form className="space-y-5">

        {/* Nombre */}

        <div>
          <label className={labelClass}>Nombre de la cancha *</label>

          <input
            className={inputClass}
            placeholder="Ej: Padel Club Palermo Norte"
          />
        </div>

        {/* Deporte */}

        <div>
          <label className={labelClass}>Deporte *</label>

          <div className="flex gap-2">
            {sports.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSport(item.id)}
                className={`flex-1 rounded-xl border py-2.5 transition ${
                  sport === item.id
                    ? "border-orange-500 bg-orange-500/20 text-orange-500"
                    : "border-zinc-700 bg-white/5 text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zona + Dirección */}

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className={labelClass}>Zona *</label>

            <select className={inputClass}>
              {zones.map((zone) => (
                <option
                  key={zone}
                  value={zone}
                  className="bg-zinc-900"
                >
                  {zone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Dirección *</label>

            <input
              className={inputClass}
              placeholder="Av. Santa Fe 1234"
            />
          </div>

        </div>

        {/* Precio */}

        <div>
          <label className={labelClass}>
            Precio por hora (ARS) *
          </label>

          <input
            type="number"
            className={inputClass}
            placeholder="12000"
          />
        </div>

        {/* Imagen */}

        <div>
          <label className={labelClass}>
            URL de imagen
          </label>

          <input
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        {/* Instalaciones */}

        <div>

          <label className={labelClass}>
            Instalaciones
          </label>

          <div className="flex flex-wrap gap-2">

            {facilities.map((facility) => (
              <button
                key={facility}
                type="button"
                onClick={() => toggleFacility(facility)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedFacilities.includes(facility)
                    ? "border-orange-500 bg-orange-500/20 text-orange-500"
                    : "border-zinc-700 bg-white/5 text-zinc-400"
                }`}
              >
                {facility}
              </button>
            ))}

          </div>

        </div>

        {/* Horarios */}

        <div>

          <label className={labelClass}>
            Horarios disponibles *
          </label>

          <div className="grid grid-cols-4 gap-2">

            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                onClick={() => toggleHour(hour)}
                className={`rounded-xl border py-2 transition ${
                  selectedHours.includes(hour)
                    ? "border-orange-500 bg-orange-500/20 text-orange-500"
                    : "border-zinc-700 bg-white/5 text-zinc-400"
                }`}
              >
                {hour}
              </button>
            ))}

          </div>

        </div>

        {/* Botón */}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-[#00001A] py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02]"
        >
          PUBLICAR CANCHA
        </button>

      </form>

    </div>
  );
}