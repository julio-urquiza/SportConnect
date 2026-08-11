import webHookModel from "./models/webhook.model.js"
import webhookEvent from "./models/webhook.model.js"
import MongoDao from "./mongo.dao.js"

class WebhookDao extends MongoDao {
  constructor(model) {
    super(model)
  }

  buscarPorIdNotificacion = async (idNotificacion) => {
    return await this.model.findOne({ idNotificacion })
  }

  /**
   * Crea el registro del evento. Si otra petición concurrente ya lo
   * creó (misma idNotificacion), devuelve el existente en vez de fallar.
   */
  crear = async (datos) => {
    try {
      return await this.model.create(datos)
    } catch (error) {
      if (error.code === 11000) {
        return await this.buscarPorIdNotificacion(datos.idNotificacion)
      }
      throw error
    }
  }

  marcarProcesado = async (id) => {
    return await this.model.findByIdAndUpdate(
      id,
      { procesado: true, procesadoEn: new Date() },
      { new: true }
    )
  }
}

export default new WebhookDao(webHookModel)