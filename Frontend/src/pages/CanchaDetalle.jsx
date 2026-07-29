import { ArrowLeft } from "lucide-react";
import PortadaCard from "../components/PortadaCard";
import InfoCard from "../components/InfoCard";
import ServiciosCard from "../components/ServiciosCard";
import ReservaForm from "../components/ReservaForm";

const CanchaDetalle = () => {
    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto px-4 py-8">
                <button className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la búsqueda
                </button>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-5 lg:col-span-2">
                        <PortadaCard imagen={"https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&amp;q=80"} nombre={"nombre"}/>
                        <InfoCard ubicacion={"Gerli"} puntuacion={4.5} precioHora={14000}/>
                        <ServiciosCard sericios={["techada","duchas", "parrilla","estacionamiento","luz"]}/>
                    </div>
                    <ReservaForm />
                </div>
            </section>
        </main >
    )
}

export default CanchaDetalle