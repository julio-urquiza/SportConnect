function CourtCard({ cancha }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl">
      <img
        src={cancha.imagen}
        alt={cancha.nombre}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {cancha.nombre}
            </h3>
            <p className="text-sm text-gray-500">
              {cancha.complejo}
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {cancha.tipo}
          </span>
        </div>

        <p className="mb-4 text-gray-600">
          {cancha.descripcion}
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            📍 <span className="font-medium">{cancha.direccion}</span>
          </p>

          <p>
            👥 Capacidad: <span className="font-medium">{cancha.capacidad}</span>
          </p>

          <p>
            ⭐ {cancha.rating} ({cancha.cantidadResenas} reseñas)
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <span className="text-2xl font-bold text-blue-600">
            ${cancha.precio}
            <span className="text-sm font-normal text-gray-500">
              /hora
            </span>
          </span>

          <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourtCard