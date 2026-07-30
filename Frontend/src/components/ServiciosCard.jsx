import { CircleCheck } from "lucide-react";

const ServiciosCard = ({ servicios }) => {
    return (
        <div className="rounded-2xl border border-gray-700 bg-[#00001A]/60 p-5">
            <h3 className="mb-4 text-lg font-bold text-white">
                INSTALACIONES
            </h3>

            <div className="flex flex-wrap gap-2">
                {servicios.map((item,index) => {
                    return (
                        <div key={index} className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm text-orange-500">
                            <CircleCheck className="h-4 w-4" />
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiciosCard