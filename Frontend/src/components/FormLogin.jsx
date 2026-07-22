import { useForm } from "react-hook-form";
import { useContext, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"
import { ArrowLeft, Users } from "lucide-react";

const schema = yup.object({
  correo: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  contrasenia: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres"),
  confirmarContrasenia: yup
    .string()
    .required("Debes confirmar la contraseña")
    .oneOf(
      [yup.ref("contrasenia")],
      "Las contraseñas deben coincidir"
    ),
}).required()

function FormLogin({ onclickBack, role}) {
  const [mode, setMode] = useState("login")
  const { loginRequest, registerRequest, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    let retorno = null
    if(mode == 'login') {
      retorno = await loginRequest(data.correo, data.contrasenia)
    }
    if(mode == 'register') {
      retorno = await registerRequest(data.correo, data.contrasenia, role.current)
    }
    if (retorno) navigate('/')
  }

  return (
    <div className="relative w-full max-w-sm rounded-3xl border border-[#383838] bg-[#00001a]/70 p-6 pt-7">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 " >
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

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white">
            Email
          </label>

          <div className="relative w-full rounded-lg border border-gray-300 bg-white">
            <input
              type="email"
              {...register("correo")}
              placeholder="ejemplo@email.com"
              className="w-full rounded-lg bg-transparent px-3 py-2.5 text-sm text-black outline-none"
            />
          </div>

          {errors && (<p className="text-red-500 text-sm mt-1">{errors.correo?.message}</p>)}

        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white">
            Contraseña
          </label>

          <div className="relative w-full rounded-lg border border-gray-300 bg-white">
            <input
              {...register("contrasenia")}
              placeholder="********"
              className="w-full rounded-lg bg-transparent px-3 py-2.5 text-sm text-black outline-none"
            />
          </div>

          {errors && (<p className="text-red-500 text-sm mt-1">{errors.contrasenia?.message}</p>)}

        </div>

        {/* Confirm Password */}
        {mode == "register" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">
              Confirmar Contraseña
            </label>

            <div className="relative w-full rounded-lg border border-gray-300 bg-white">
              <input
                {...register("confirmarContrasenia")}
                placeholder="********"
                className="w-full rounded-lg bg-transparent px-3 py-2.5 text-sm text-black outline-none"
              />
            </div>

            {errors && (<p className="text-red-500 text-sm mt-1">{errors.confirmarContrasenia?.message}</p>)}

          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-[14px] bg-linear-to-r from-[#ff5a00]/85 to-[#00001a]/80 transition-opacity hover:opacity-90"
        >
          <span className="font-bold text-white">
            {mode == "login" 
              ? loading 
                ? "Ingresando..." 
                : "Ingresar" 
              : null}
            {mode == "register" 
              ? loading 
                ? "Registrando..." 
                : "Registrar"
              : null}
          </span>
        </button>
        {error && (<p className="text-center text-red-500 mt-4"> El correo o contraseña no es válido</p>)}
      </form>
    </div>
  )
}
export default FormLogin