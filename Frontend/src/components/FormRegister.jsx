import { useContext } from "react"
import { useForm } from "react-hook-form";
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
    .min(8, "Debe tener al menos 8 caracteres"),

  confirmarContrasenia: yup
    .string()
    .required("Debes confirmar la contraseña")
    .oneOf(
      [yup.ref("contrasenia")],
      "Las contraseñas deben coincidir"
    ),
});

function FormRegister() {
  const { registerRequest, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const retorno = await registerRequest(data.correo, data.contrasenia, 'user')
    if (retorno) navigate('/')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Crear Cuenta
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
      <div className="mb-4">
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

      {/* Confirmar contraseña */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Confirmar contraseña
        </label>

        <input
          type="password"
          {...register("confirmarContrasenia")}
          placeholder="********"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.confirmarContrasenia?.message}
        </p>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      {error
        ?<p className="text-center text-red-500 mt-4"> El correo electrónico no es valido</p>
        :null}  

      <p className="text-center text-gray-600 mt-4">
        ¿Ya tenés cuenta?{" "}
        <Link
          to="/login"
          className="text-green-500 hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}

export default FormRegister;