const PortadaCard = ({imagen, nombre}) => {
    return (
        <div className="relative h-80 overflow-hidden rounded-2xl bg-[#000030]">
            <img
                src={imagen}
                alt={nombre}
                className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#00001A]/90 to-transparent" />

            <div className="absolute bottom-5 left-5">
                <span className="mb-2 inline-flex rounded-full border border-orange-500/40 bg-black/60 px-3 py-1 text-sm text-orange-400 backdrop-blur">
                    🎾 Tenis
                </span>

                <h1 className="text-4xl font-bold text-white">
                    {nombre}
                </h1>
            </div>
        </div>
    )
}

export default PortadaCard