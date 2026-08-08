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

const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none";

const labelClass =
    "mb-2 block text-sm text-zinc-400";

function ImageUpload({ imagePreview, onImageChange }) {
    return (
        <div>
            <input
                id="court-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
            />
            <label
                htmlFor="court-image-upload"
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-white/5 p-4 text-center text-sm text-zinc-400 transition hover:border-orange-500 hover:text-orange-500"
            >
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="h-full w-full rounded-2xl object-cover"
                    />
                ) : (
                    <>
                        <span className="mb-2 text-lg">📷</span>
                        <span>Haz click para subir una imagen</span>
                    </>
                )}
            </label>
        </div>
    );
}

export default function CreateCourt() {

    const [sport, setSport] = useState("padel");
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [facilityInput, setFacilityInput] = useState("");
    const [diaSeleccionado, setDiaSeleccionado] = useState(0);
    const [horarios, setHorarios] = useState([
        { dia: 0, horas: [] },
        { dia: 1, horas: [] },
        { dia: 2, horas: [] },
        { dia: 3, horas: [] },
        { dia: 4, horas: [] },
        { dia: 5, horas: [] },
        { dia: 6, horas: [] },
    ])
    const [imagePreview, setImagePreview] = useState(null);

    const setHoras = (dia, hora) => {
        setHorarios((prev) =>
            prev.map((item) =>
                item.dia === dia
                    ? {
                        ...item,
                        horas: item.horas.includes(hora)
                            ? item.horas.filter((h) => h !== hora)
                            : [...item.horas, hora],
                    }
                    : item
            )
        );
    }

    const addFacility = () => {
        const trimmed = facilityInput.trim();
        if (!trimmed) return;

        setSelectedFacilities((prev) =>
            prev.includes(trimmed) ? prev : [...prev, trimmed]
        );
        setFacilityInput("");
    };

    const removeFacility = (facility) => {
        setSelectedFacilities((prev) => prev.filter((f) => f !== facility));
    };

    const handleFacilityInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addFacility();
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            setImagePreview(null);
            return;
        }

        setImagePreview(URL.createObjectURL(file));
    };

    const onSubmitCreate = () => {

    }

    return (
        <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-[#00001A]/60 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
                Nueva Cancha
            </h2>

            <form
                className="space-y-5"
                onSubmit={onSubmitCreate}
            >

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
                                className={`flex-1 rounded-xl border py-2.5 transition ${sport === item.id
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

                {/* Descripcion */}

                <div>
                    <label className={labelClass}>
                        Descripción
                    </label>
                    <textarea
                        className={`${inputClass} min-h-30 resize-none`}
                        placeholder="Describe la cancha, instalaciones y detalles relevantes"
                    />
                </div>



                {/* Imagen */}

                <div>
                    <label className={labelClass}>
                        Imagen de la cancha
                    </label>
                    <ImageUpload
                        imagePreview={imagePreview}
                        onImageChange={handleImageChange}
                    />
                </div>

                {/* Instalaciones */}

                <div>

                    <label className={labelClass}>
                        Instalaciones
                    </label>

                    <div className="flex gap-2">
                        <input
                            className={`${inputClass} flex-1`}
                            placeholder="Agregar instalación"
                            value={facilityInput}
                            onChange={(e) => setFacilityInput(e.target.value)}
                            onKeyDown={handleFacilityInputKeyDown}
                        />
                        <button
                            type="button"
                            onClick={addFacility}
                            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-xl font-bold text-zinc-400 transition hover:border-orange-500 hover:text-orange-500"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {selectedFacilities.map((facility) => (
                            <button
                                key={facility}
                                type="button"
                                onClick={() => removeFacility(facility)}
                                className="rounded-full border border-orange-500 bg-orange-500/20 px-4 py-2 text-sm text-orange-500 transition"
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

                    <div className="flex flex-wrap mb-2.5 rounded-4xl border border-zinc-700">

                        {days.map((day, index) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => setDiaSeleccionado(index)}
                                className={`flex-1 rounded-4xl py-2.5 transition ${diaSeleccionado == index
                                    ? "border-orange-500 bg-orange-500/50 text-white"
                                    : "border-zinc-700 text-zinc-400"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}

                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {[...Array(24).keys()].map((hour) => (
                            <button
                                key={hour}
                                type="button"
                                onClick={() => setHoras(diaSeleccionado, hour)}
                                className={`rounded-xl border py-2 transition ${horarios[diaSeleccionado].horas.includes(hour)
                                    ? "border-orange-500 bg-orange-500/20 text-orange-500"
                                    : "border-zinc-700 bg-white/5 text-zinc-400"
                                    }`}
                            >
                                {hour} - {hour + 1} hs
                            </button>
                        ))}

                    </div>

                </div>

                {/* Botón */}

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-linear-to-r from-orange-500 to-[#00001A] py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02]"
                >
                    PUBLICAR CANCHA
                </button>

            </form>

        </div>
    );
}