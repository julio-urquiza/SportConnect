import crypto from "crypto"
import mercadoPagoDao from "../daos/mongoDB/mercadoPago.dao.js"
import oauthStateDao from "../daos/mongoDB/oauthState.dao.js"

const MP_AUTH_URL = "https://auth.mercadopago.com/authorization"
const MP_TOKEN_URL = "https://api.mercadopago.com/oauth/token"
const STATE_MAX_AGE_MS = 10 * 60 * 1000 // 10 minutos

class MercadoPagoService {

  /**
   * Genera la URL de autorización de Mercado Pago para que el dueño
   * conceda permisos, y persiste un "state" de un solo uso asociado
   * a ese dueño.
   *
   * @param {string} usuarioId
   * @returns {Promise<string>}
   */
  async generarUrlDeConexion(usuarioId) {

    const state = crypto.randomBytes(24).toString("hex")

    await mercadoPagoDao.crearOAuthState(usuarioId, state)
    console.log(state)
    const params = new URLSearchParams({
      client_id: process.env.MP_CLIENT_ID,
      response_type: "code",
      platform_id: "mp",
      redirect_uri: process.env.MP_REDIRECT_URI,
      state
    })

    return `${MP_AUTH_URL}?${params.toString()}`
  }


  /**
   * Procesa el callback de Mercado Pago.
   *
   * Valida el state, intercambia el code por tokens
   * y guarda/actualiza la cuenta conectada.
   *
   * @param {string} code
   * @param {string} state
   * @returns {Promise}
   */
  async procesarCallback(code, state) {

    if (!code || !state) {
      throw new Error(
        "Faltan parámetros 'code' o 'state' en el callback de Mercado Pago"
      )
    }

    const oauthState = await mercadoPagoDao.consumirOAuthState(state)

    if (!oauthState) {
      throw new Error(
        "State inválido o ya utilizado. Posible intento de CSRF o link expirado"
      )
    }

    const antiguedadMs =
      Date.now() - oauthState.createdAt.getTime()

    if (antiguedadMs > STATE_MAX_AGE_MS) {
      throw new Error(
        "El proceso de conexión expiró. Iniciá la conexión nuevamente"
      )
    }

    const tokenData = await this.intercambiarCodePorTokens(code)

    const cuenta = await mercadoPagoDao.crearOReemplazarCuenta({
      usuario: oauthState.usuario,
      mpUserId: tokenData.user_id,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      publicKey: tokenData.public_key,
      scope: tokenData.scope,
      tokenType: tokenData.token_type,
      liveMode: tokenData.live_mode,
      expiresAt: new Date(
        Date.now() + tokenData.expires_in * 1000
      ),
      status: "connected",
      connectedAt: new Date()
    })

    return cuenta
  }


  /**
   * Intercambia el authorization code por tokens.
   *
   * @param {string} code
   * @returns {Promise}
   */
  async intercambiarCodePorTokens(code) {

    const response = await fetch(MP_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: process.env.MP_CLIENT_ID,
        client_secret: process.env.MP_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.MP_REDIRECT_URI
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        `Error al intercambiar code por tokens: ${
          data.message || response.statusText
        }`
      )
    }

    return data
  }


  /**
   * Renueva el access_token de una cuenta usando
   * su refresh_token.
   *
   * @param {string} usuarioId
   * @returns {Promise}
   */
  async renovarToken(usuarioId) {

    const cuenta =
      await mercadoPagoDao.buscarCuentaConTokensPorUsuario(usuarioId)

    if (!cuenta) {
      throw new Error(
        "No hay una cuenta de Mercado Pago conectada para este usuario"
      )
    }

    const refreshTokenPlano =
      cuenta.getDecryptedRefreshToken()

    const response = await fetch(MP_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: process.env.MP_CLIENT_ID,
        client_secret: process.env.MP_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshTokenPlano
      })
    })

    const data = await response.json()

    if (!response.ok) {

      // El refresh_token puede haber sido revocado
      // por el dueño desde Mercado Pago.

      await mercadoPagoDao.actualizarTokens(
        cuenta._id,
        {
          status: "error"
        }
      )

      throw new Error(
        `Error al renovar token: ${
          data.message || response.statusText
        }`
      )
    }

    return mercadoPagoDao.actualizarTokens(
      cuenta._id,
      {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(
          Date.now() + data.expires_in * 1000
        ),
        status: "connected"
      }
    )
  }


  /**
   * Obtiene el estado de conexión de Mercado Pago.
   *
   * @param {string} usuarioId
   * @returns {Promise}
   */
  async obtenerEstadoConexion(usuarioId) {

    const cuenta =
      await mercadoPagoDao.buscarCuentaConectadaPorUsuario(usuarioId)

    if (!cuenta) {
      return {
        conectado: false
      }
    }

    return {
      conectado: true,
      nickname: cuenta.nickname,
      email: cuenta.email,
      connectedAt: cuenta.connectedAt,
      liveMode: cuenta.liveMode
    }
  }


  /**
   * Desconecta la cuenta de Mercado Pago.
   *
   * @param {string} usuarioId
   * @returns {Promise}
   */
  async desconectarCuenta(usuarioId) {

    const cuenta =
      await mercadoPagoDao.desconectarCuenta(usuarioId)

    if (!cuenta) {
      throw new Error(
        "No hay una cuenta de Mercado Pago conectada para desconectar"
      )
    }

    return cuenta
  }

  /**
   * Renueva proactivamente todas las cuentas conectadas cuyo
   * access_token vence dentro de los próximos `diasDeAnticipacion` días.
   *
   * @param {number} [diasDeAnticipacion=15]
   * @returns {Promise<{ renovadas: number, fallidas: number, revisadas: number }>}
   */
  async renovarCuentasProximasAVencer(diasDeAnticipacion = 15) {

    const fechaLimite = new Date(
      Date.now() + diasDeAnticipacion * 24 * 60 * 60 * 1000
    )

    const cuentas = await mercadoPagoDao.buscarProximasAVencer(fechaLimite)

    let renovadas = 0
    let fallidas = 0

    for (const cuenta of cuentas) {
      try {
        await this.renovarToken(cuenta.usuario)
        renovadas++
      } catch (error) {
        fallidas++
        console.error(
          `[job:renovarTokens] Error renovando cuenta de usuario ${cuenta.usuario}: ${error.message}`
        )
      }
    }

    return { renovadas, fallidas, revisadas: cuentas.length }
  }
}

export default new MercadoPagoService()