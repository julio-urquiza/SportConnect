import mercadoPagoService from "../services/mercadoPago.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class MercadoPagoController {

  conectar = async (req, res) => {
    const url = await mercadoPagoService.generarUrlDeConexion(req.user._id)
    res.status(200).json({ url })
  }

  callback = async (req, res) => {
    const { code, state } = req.query
    const frontendUrl = process.env.FRONTEND_URL

    try {
      await mercadoPagoService.procesarCallback(code, state)
      res.redirect(`${frontendUrl}/dashboard/pagos?estado=conectado`)
    } catch (error) {
        res.redirect(`${frontendUrl}/dashboard/pagos?estado=error&mensaje=${encodeURIComponent(error.message)}`)
    }
  }

  estado = async (req, res) => {
    const estadoConexion = await mercadoPagoService.obtenerEstadoConexion(req.user._id)
    res.status(200).json(estadoConexion)
  }

  desconectar = async (req, res) => {
    await mercadoPagoService.desconectarCuenta(req.user._id)
    res.status(200).json({ mensaje: "Cuenta de Mercado Pago desconectada" })
  }
}

export default wrapRoutes(new MercadoPagoController())