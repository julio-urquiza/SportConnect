import { useForm } from "react-hook-form";
import { useContext } from "react"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"

const schema = yup.object({
  correo: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  contrasenia: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres")
}).required()

function FormLogin() {
  const { loginRequest, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const retorno = await loginRequest(data.correo, data.contrasenia)
    if (retorno) navigate('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Iniciar Sesión
      </h2>

      {/* Correo */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Correo electrónico
        </label>

        <input
          type="email"  
          {...register("correo")}
          placeholder="ejemplo@email.com"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.correo?.message}
        </p>
      </div>

      {/* Contraseña */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Contraseña
        </label>

        <input
          type="password"
          {...register("contrasenia")}
          placeholder="********"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.contrasenia?.message}
        </p>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      {error
        ?<p className="text-center text-red-500 mt-4"> El correo o contraseña no es válido</p>
        :null}

      <p className="text-center text-gray-600 mt-4">
        ¿No tenés cuenta?{" "}
        <Link
          to="/register"
          className="text-green-500 cursor-pointer hover:underline">
          Registrate
        </Link>
      </p>
    </form>

  );
}
export default FormLogin