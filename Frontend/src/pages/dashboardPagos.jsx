import { ArrowLeft } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import ConexionMercadoPago from "../components/ConexionMercadoPago"
import TablaHistorialPagos from "../components/TablaHistorialPagos"

const DashboardPagos = () => {
    const [searchParams] = useSearchParams()
    const estadoConexion = searchParams.get("estado")

    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
                <Link to="/dashboard" className="mb-2 flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al panel
                </Link>

                <h1 className="text-3xl font-bold text-white">Cobros y pagos</h1>

                {estadoConexion === "error" && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                        {searchParams.get("mensaje") || "No se pudo conectar la cuenta de Mercado Pago"}
                    </div>
                )}

                <ConexionMercadoPago />
                <TablaHistorialPagos />
            </section>
        </main>
    )
}

export default DashboardPagos