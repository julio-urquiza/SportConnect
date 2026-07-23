import { useState, useRef } from "react";
import FormLogin from "../components/FormLogin.jsx"
import RoleCard from "../components/RoleCard.jsx"
import { Users, Building2 } from "lucide-react";

function Login() {
    const [modal, setModal] = useState(true)
    const userType = useRef(null)
    return (
        <main className="relative flex-1 overflow-hidden ">
            {/* fondo */}
            <img
                src="https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?w=1920&amp;h=1080&amp;fit=crop&amp;crop=center&amp;auto=format"
                alt="Padel"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* sombreado */}
            <div className="absolute inset-0 bg-[#00001a]/70" />

            <div className="relative z-10 flex h-full flex-col min-h-screen items-center justify-center gap-10 px-8 py-10 lg:flex-row lg:justify-between lg:px-24">

                {/* Texto */}
                <section className="text-center lg:text-left">
                    <p className="font-jura text-3xl font-bold text-gray-300">
                        Bienvenido a
                    </p>

                    <h1 className="font-jura text-5xl font-bold text-gray-300 lg:text-7xl">
                        SportConnect
                    </h1>

                    <p className="mt-2 max-w-sm text-white/50">
                        Reservá canchas deportivas de forma rápida y sencilla.
                    </p>
                </section>

                {/* Card */}


                {modal
                    ? (
                        <div className="w-full max-w-sm rounded-3xl border border-[#383838] bg-[#00001a]/70 p-6">

                            <h2 className="font-jura text-2xl font-bold text-white">
                                ¿Cómo querés entrar?
                            </h2>

                            <p className="mb-6 mt-1 text-sm text-white/50">
                                Elegí tu tipo de cuenta para continuar
                            </p>

                            <div className="space-y-3">
                                <RoleCard
                                    icon={<Users className="size-5 text-[#ff5a00]" />}
                                    title="Soy jugador"
                                    description="Buscá y reservá canchas en Buenos Aires"
                                    onClick={() => {
                                        userType.current = "user"
                                        setModal(false)
                                    }}
                                />

                                <RoleCard
                                    icon={<Building2 className="size-5 text-[#ff5a00]" />}
                                    title="Soy dueño de cancha"
                                    description="Publicá tus canchas y gestioná reservas"
                                    onClick={() => {
                                        userType.current = "owner"
                                        setModal(false)
                                    }}
                                />
                            </div>
                        </div>
                    )
                    : (<FormLogin onclickBack={()=>{setModal(true)}} role={userType}/>)
                }

            </div>
        </main>
    )
}
export default Login