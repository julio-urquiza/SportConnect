import { Star, SlidersHorizontal, Search, MapPin } from "lucide-react";

function Home() {
    return (
        <main className="min-h-screen bg-[#00001A]">
            <section className="relative overflow-hidden border-b border-[#1A1A3A] px-4 py-16">
                {/* Fondo */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1715431900724-6bf15144ae0e?w=1920&h=800&fit=crop&crop=center&auto=format"
                        alt="Tenis"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-br from-[#00001A]/90 via-[#00001A]/75 to-[#00001A]/90" />

                    {/* Indicadores */}
                    <div className="absolute bottom-4 right-6 z-10 flex items-center gap-2">
                        <button className="h-2 w-2 rounded-full bg-white/30 transition-all" />
                        <button className="h-2 w-6 rounded-full bg-orange-500 transition-all" />
                        <button className="h-2 w-2 rounded-full bg-white/30 transition-all" />
                    </div>
                </div>

                <div className="container relative z-10 mx-auto">

                    {/* Título */}
                    <div className="mb-10 text-center">
                        <p className="mb-2 text-gray-400">
                            Bienvenido a
                        </p>

                        <h1 className="mb-2 text-4xl font-bold text-gray-100 md:text-6xl">
                            SportConnect
                        </h1>

                        <p className="mx-auto max-w-md text-gray-400">
                            Encontrá y reservá canchas de padel, tenis y fútbol en toda Buenos Aires.
                        </p>
                    </div>

                    {/* Buscador */}
                    <div className="mx-auto max-w-2xl">
                        <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-[#00001A]/60 p-4 backdrop-blur-xl md:flex-row md:items-center">

                            <div className="flex flex-1 items-center gap-3">
                                <Search className="h-5 w-5 shrink-0 text-orange-500" />

                                <input
                                    type="text"
                                    placeholder="Buscá por nombre ..."
                                    className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="h-4 w-4" />

                                <select className="cursor-pointer bg-transparent text-sm outline-none">
                                    <option className="bg-[#000030] text-white">
                                        Todas las zonas
                                    </option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Deportes */}
                    <div className="mt-6 flex flex-wrap justify-center gap-3">

                        <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105">
                            <span>🏟️</span>
                            Todos
                        </button>

                        <button className="flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white">
                            <span>🎾</span>
                            Padel
                        </button>

                        <button className="flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white">
                            <span>⚽</span>
                            Fútbol
                        </button>

                        <button className="flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white">
                            <span>🎾</span>
                            Tenis
                        </button>

                        <button className="flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white">
                            <span>🏀</span>
                            Básquet
                        </button>

                    </div>

                </div>
            </section>
            <section className="container mx-auto px-4 py-8">
                {/* Encabezado */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">9</span> canchas encontradas
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>Ordenar por relevancia</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {/* Card */}
                    <article className="group overflow-hidden rounded-2xl border border-gray-700 bg-[#00001A]/80 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

                        {/* Imagen */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                                alt="Padel Club Palermo"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#00001A]/90 to-transparent" />

                            <span className="absolute left-3 top-3 rounded-full border border-orange-500/40 bg-black/60 px-3 py-1 text-xs font-medium text-orange-500 backdrop-blur">
                                🎾 Padel
                            </span>

                            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs text-yellow-400 backdrop-blur">
                                <Star className="h-3 w-3 fill-yellow-400" />
                                4.8
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-4">

                            <h3 className="truncate text-xl font-bold text-white">
                                Padel Club Palermo
                            </h3>

                            <div className="mt-1 mb-4 flex items-center gap-2 text-sm text-gray-400">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">
                                    Av. Santa Fe 3500, Palermo
                                </span>
                            </div>

                            <div className="flex items-end justify-between">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Precio / hora
                                    </p>

                                    <p className="text-2xl font-bold text-orange-500">
                                        $12.000
                                    </p>
                                </div>

                                <button className="rounded-xl bg-green-500 px-4 py-2 font-bold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600">
                                    RESERVAR →
                                </button>

                            </div>
                        </div>

                    </article>
                </div>
            </section>
        </main>
    )
}
export default Home