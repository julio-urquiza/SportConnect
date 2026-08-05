
const DescripcionCard = ({ descripcion }) => {
    return (
        <div className="rounded-2xl border border-gray-700 bg-[#00001A]/60 p-5">
            <h3 className="mb-4 text-lg font-bold text-white">
                Descripción
            </h3>
            <p className="text-white">
                {descripcion}
            </p>
        </div>
    )
}

export default DescripcionCard