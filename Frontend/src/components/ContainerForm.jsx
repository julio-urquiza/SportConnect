import { useState } from "react"
import { ArrowLeft, Users } from "lucide-react";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";

function ContainerForm({ onclickBack, role}) {
  const [mode, setMode] = useState("login")

  return (
    <div className="relative w-full max-w-sm rounded-3xl border border-[#383838] bg-[#00001a]/70 p-6 pt-7">
      <div className="flex flex-col gap-3 " >
        {/* Header */}
        <div className="mb-1 flex items-center gap-2">
          <button
            type="button"
            className="flex items-center p-0 text-neutral-500"
            onClick={onclickBack}
          >
            <ArrowLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#ff5a00]/15">
              <Users className="size-3.5 text-[#ff5a00]" />
            </div>

            <p className="font-jura text-xl font-bold text-white">
              {mode == "login"
                ? "Iniciar sesión"
                : "Registrarse"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-1 flex rounded-xl bg-white/5 p-1">
          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm text-white transition-all ${mode == "login" && "bg-linear-to-r from-[#ff5a00]/80 to-[#00001a]/70 font-semibold"}`}
            onClick={() => { setMode("login") }}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm text-white transition-all ${mode == "register" && "bg-linear-to-r from-[#ff5a00]/80 to-[#00001a]/70 font-semibold"}`}
            onClick={() => { setMode("register") }}
          >
            Registrarme
          </button>

        </div>

        {mode == "login" && (<FormLogin/>) }
        {mode == "register" && (<FormRegister role={role}/>) }
      </div>
    </div>
  )
}
export default ContainerForm