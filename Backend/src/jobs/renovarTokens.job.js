import cron from "node-cron"
import mercadoPagoService from "../services/mercadoPago.service.js"

/**
 * Corre todos los días a las 3 AM: renueva proactivamente los
 * access_token de Mercado Pago que vencen dentro de 15 días.
 */
export const iniciarJobRenovacionTokensMP = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      const resultado = await mercadoPagoService.renovarCuentasProximasAVencer(15)
      console.log(
        `[job:renovarTokens] ${resultado.renovadas}/${resultado.revisadas} renovada(s), ${resultado.fallidas} fallida(s)`
      )
    } catch (error) {
      console.error("[job:renovarTokens] Error general:", error.message)
    }
  })
}