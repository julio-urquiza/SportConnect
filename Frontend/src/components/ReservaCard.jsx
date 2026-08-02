const ReservaCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden flex flex-col bg-[#00001a]/70 border border-green-400/30 shadow-lg shadow-green-400/10">

                <div className="relative h-36 overflow-hidden bg-[#000030]">
                    <img
                        src="https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80"
                        alt="Tenis Recoleta"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#00001a]/90 to-transparent" />

                    <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs bg-black/70 border border-orange-500/40 text-orange-500">
                        🎾 Tenis
                    </span>

                    <span className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs bg-green-500/15 border border-green-500/40 text-green-400">
                        Confirmada
                    </span>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-white font-bold text-lg">
                        Tenis Recoleta
                    </h3>

                    <p className="text-gray-400 text-sm">
                        📍 Av. Las Heras 2800, Recoleta
                    </p>

                    <p className="text-gray-200 text-sm">
                        📅 Martes, 21 de julio de 2026
                    </p>

                    <p className="text-gray-200 text-sm">
                        🕒 15:00 hs · <span className="text-orange-500 font-semibold">$15.000</span>
                    </p>

                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10">
                            Ver cancha
                        </button>

                        <button className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20">
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ReservaCard