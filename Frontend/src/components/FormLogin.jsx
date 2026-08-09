import { useForm } from "react-hook-form";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
// 1. Importamos el ColorContext
import { ColorContext } from "../context/ColorContext.jsx"; 

const schema = yup.object({
  correo: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  contrasenia: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres"),
}).required()

function FormLogin() {
  const { loginRequest, loading, error } = useContext(AuthContext);
  // 2. Extraemos el tema actual
  const { theme } = useContext(ColorContext); 
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const retorno = await loginRequest(data.correo, data.contrasenia)
    if (retorno) navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 " >

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        {/* 3. Color del Label dinámico */}
        <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Email
        </label>

        {/* 4. Fondo y borde del Input dinámicos */}
        <div className={`relative w-full rounded-lg border ${
            theme === 'dark' ? 'border-[#1a1a3a] bg-[#00001a]' : 'border-gray-300 bg-white'
        }`}>
          <input
            type="email"
            {...register("correo")}
            placeholder="ejemplo@email.com"
            /* 5. Color del texto que escribe el usuario dinámico */
            className={`w-full rounded-lg bg-transparent px-3 py-2.5 text-sm outline-none ${
                theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'
            }`}
          />
        </div>

        {errors && (<p className="text-red-500 text-sm mt-1">{errors.correo?.message}</p>)}

      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Contraseña
        </label>

        <div className={`relative w-full rounded-lg border ${
            theme === 'dark' ? 'border-[#1a1a3a] bg-[#00001a]' : 'border-gray-300 bg-white'
        }`}>
          <input
            type="password"
            {...register("contrasenia")}
            placeholder="********"
            className={`w-full rounded-lg bg-transparent px-3 py-2.5 text-sm outline-none ${
                theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'
            }`}
          />
        </div>

        {errors && (<p className="text-red-500 text-sm mt-1">{errors.contrasenia?.message}</p>)}

      </div>

      {/* Submit */}
      {/* El botón se mantiene igual ya que su texto es blanco y contrasta bien con el gradiente de la marca */}
      <button
        type="submit"
        className="flex h-11 w-full items-center justify-center rounded-[14px] bg-linear-to-r from-[#ff5a00]/85 to-[#00001a]/80 transition-opacity hover:opacity-90 mt-2"
      >
        <span className="font-bold text-white">
          {loading ? "Ingresando..." : "Ingresar"}
        </span>
      </button>
      
      {error && (<p className="text-center text-red-500 mt-4"> El correo o contraseña no es válido</p>)}
    </form>
  )
}
export default FormLogin