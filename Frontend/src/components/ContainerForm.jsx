import { useState, useContext } from "react";
import { ArrowLeft, Users } from "lucide-react";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
// 1. Importamos el contexto
import { ColorContext } from "../context/ColorContext.jsx";

function ContainerForm({ onclickBack, role }) {
  const [mode, setMode] = useState("login");
  
  // 2. Extraemos el tema actual
  const { theme } = useContext(ColorContext);
  {/* 3. Fondo y borde del contenedor principal dinámicos en el primer div */}

  return (
    <div className={`relative w-full max-w-sm rounded-3xl border p-6 pt-7 transition-colors ${
        theme === 'dark' ? 'border-[#383838] bg-[#00001a]/70' : 'border-gray-200 bg-white shadow-2xl'
    }`}>
      <div className="flex flex-col gap-3">
        
        {/* Header */}
        <div className="mb-1 flex items-center gap-2">
          {/* Botón de volver */}
          <button
            type="button"
            className={`flex items-center p-0 transition-colors ${
              theme === 'dark' ? 'text-neutral-500 hover:text-white' : 'text-gray-500 hover:text-black'
            }`}
            onClick={onclickBack}
          >
            <ArrowLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#ff5a00]/15">
              <Users className="size-3.5 text-[#ff5a00]" />
            </div>

            {/* 4. Título ("Iniciar sesión" / "Registrarse") dinámico */}
            <p className={`font-jura text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {mode === "login" ? "Iniciar sesión" : "Registrarse"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        {/* 5. Fondo de la barra de pestañas dinámico */}
        <div className={`mb-1 flex rounded-xl p-1 ${
          theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
        }`}>
          
          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm transition-all ${
              mode === "login" 
                ? "bg-linear-to-r from-[#ff5a00]/80 to-[#00001a]/70 font-semibold text-white" 
                : (theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-200')
            }`}
            onClick={() => { setMode("login") }}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm transition-all ${
              mode === "register" 
                ? "bg-linear-to-r from-[#ff5a00]/80 to-[#00001a]/70 font-semibold text-white" 
                : (theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-200')
            }`}
            onClick={() => { setMode("register") }}
          >
            Registrarme
          </button>

        </div>

        {/* Renderizado de formularios (Ya están adaptados) */}
        {mode === "login" && (<FormLogin />)}
        {mode === "register" && (<FormRegister role={role} />)}
      </div>
    </div>
  );
}

export default ContainerForm;