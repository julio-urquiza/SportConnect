import { useEffect } from "react"
import { Wallet, CheckCircle2, XCircle } from "lucide-react"
import { useMercadoPago } from "../hooks/useMercadoPago"
import Spinner from "./Spinner"

const ConexionMercadoPago = () => {
    const { estado, loading, error, cargarEstado, conectar, desconectar } = useMercadoPago()

    useEffect(() => {
        cargarEstado()
    }, [cargarEstado])

    const handleDesconectar = () => {
        if (window.confirm("¿Desconectar tu cuenta de Mercado Pago? No vas a poder recibir nuevos pagos hasta que reconectes.")) {
            desconectar()
        }
    }

    return (
        <div className="rounded-2xl border border-gray-700 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">Mercado Pago</h3>
            </div>

            {loading && !estado && <Spinner />}

            {estado && !estado.conectado && (
                <>
                    <p className="mb-4 text-sm text-gray-400">
                        Conectá tu cuenta de Mercado Pago para empezar a recibir los pagos de tus reservas directamente.
                    </p>
                    <button
                        onClick={conectar}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-6 py-3 font-bold text-white hover:opacity-90 disabled:opacity-50"
                    >
                        Conectar Mercado Pago
                    </button>
                </>
            )}

            {estado?.conectado && (
                <>
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <div>
                            <p className="text-sm font-semibold text-green-400">Cuenta conectada</p>
                            {estado.nickname && (
                                <p className="text-xs text-gray-400">{estado.nickname}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleDesconectar}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                    >
                        <XCircle className="h-4 w-4" />
                        Desconectar cuenta
                    </button>
                </>
            )}

            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </div>
    )
}

export default ConexionMercadoPago