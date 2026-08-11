import cron from "node-cron"
import reserveService from "../services/reserve.service.js"

/**
 * Corre cada 2 minutos: libera reservas pendiente_pago vencidas
 * y sus horas ocupadas.
 */
export const iniciarJobExpiracionReservas = () => {
  cron.schedule("*/2 * * * *", async () => {
    try {
      const resultado = await reserveService.expirarReservasVencidas()
      if (resultado.expiradas > 0) {
        console.log(
          `[job:expirarReservas] ${resultado.expiradas} de ${resultado.revisadas} reserva(s) expirada(s)`
        )
      }
    } catch (error) {
      console.error("[job:expirarReservas] Error general:", error.message)
    }
  })
}