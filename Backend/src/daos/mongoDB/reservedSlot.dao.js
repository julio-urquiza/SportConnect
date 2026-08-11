import reservedSlotModel from "./models/reservedSlot.model.js"
import MongoDao from "./mongo.dao.js"

class ReservedSlotDao extends MongoDao {
  constructor(model) {
    super(model)
  }

  /**
   * Inserta varios slots dentro de una transacción. Si alguno viola
   * el índice único (hora ya ocupada), Mongo tira un error con
   * code 11000 y ninguno de los documentos queda insertado.
   */
  crearSlots = async (slots, session) => {
    return await this.model.insertMany(slots, { session, ordered: true })
  }

  eliminarSlotsDeReserva = async (idReserva, session) => {
    return await this.model.deleteMany({ reserva: idReserva }, { session })
  }

  buscarHorasOcupadas = async (idCancha, fecha) => {
    return await this.model
      .find({ cancha: idCancha, fecha })
      .select("hora -_id")
      .lean()
  }
}

export default new ReservedSlotDao(reservedSlotModel)