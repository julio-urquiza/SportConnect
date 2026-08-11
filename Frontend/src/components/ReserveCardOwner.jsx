import { Clock, User } from "lucide-react";

const ReserveCardOwner = ({ reserve }) => {
    console.log(reserve)
    return (
        <div
            className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-[#00001A]/60 p-4"
        >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                <Clock className="h-5 w-5 text-orange-500" />
            </div>

            <div className="min-w-0 flex-1">

                <div className="mb-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-white">
                        {reserve.usuario.name ? reserve.usuario.name : reserve.usuario.email}
                    </span>
                </div>

                <p className="truncate text-sm text-zinc-400">
                    {/* {reserve.horarios.horas.map(item => `${item}:00-${item}:59 hs, `)} */}
                </p>

                <p className="truncate text-sm text-zinc-400">
                    {new Date(reserve.fecha).toLocaleDateString("es-AR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                    })}
                </p>


            </div>

            <div className="text-right">
                <p className="font-bold text-orange-500">
                    ${reserve.precio} $
                </p>

                <p className="text-xs text-green-400">
                    {reserve.estado ? "Confimada" : "Cancelada"}
                </p>
            </div>

        </div>
    )
}

export default ReserveCardOwner