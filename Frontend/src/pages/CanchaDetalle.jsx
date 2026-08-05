import { ArrowLeft } from "lucide-react";
import PortadaCard from "../components/PortadaCard";
import InfoCard from "../components/InfoCard";
import ServiciosCard from "../components/ServiciosCard";
import ReservaForm from "../components/ReservaForm";
import { useCourts } from "../hooks/useCourts";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner"
import DescripcionCard from "../components/DescripcionCard"


const CanchaDetalle = () => {
    const { id } = useParams()
    const { court, loading, error } = useCourts({ id })
    console.log(court)
    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto px-4 py-8">
                <button className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la búsqueda
                </button>
                
                {loading && <Spinner />}

                {!loading && error && "error"}

                {!loading && !error && (
                    "Info no encontrada"
                )}

                {!loading && !error &&
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-5 lg:col-span-2">
                            <PortadaCard imagen={court.imagenes[0]} nombre={court.nombre} />
                            <InfoCard ubicacion={`${court.direccion}, ${court.ubicacion}`} puntuacion={4.5} precioHora={court.precioPorHora} />
                            <DescripcionCard descripcion={court.descripcion}/>
                            <ServiciosCard servicios={court.servicios} />
                        </div>
                        <ReservaForm horariosCancha={court.horariosDisponibles} precioPorHora={court.precioPorHora} idCancha={id}/>
                    </div>
                }
            </section>
        </main >
    )
}

export default CanchaDetalle