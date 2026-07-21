import courtModel from "./models/court.model.js"
import reservationModel from "./models/reservation.model.js"
import complexModel from "./models/complex.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    async buildQuery({ ubicacion, deporte, hora, dia }) {
        const query = {}

        if (deporte) {
            query.sport = deporte
        }

        if (hora || dia) {
            const scheduleMatch = {}

            if (dia) {
                scheduleMatch.day = dia
            }

            if (hora) {
                scheduleMatch.start = { $lte: hora }
                scheduleMatch.end = { $gte: hora }
            }

            query.availableSchedule = { $elemMatch: scheduleMatch }
        }

        if (ubicacion) {
            const complexes = await complexModel.find({
                ubication: { $regex: `^${ubicacion}$`, $options: "i" }
            }, { _id: 1 })

            query.complex = {
                $in: complexes.map((complex) => complex._id)
            }
        }

        return query
    }

    async getBy(filter = {}) {
        const { fecha, ...queryFilter } = filter
        const query = await this.buildQuery(queryFilter)
        const courts = await this.model.find(query)
        const hora = queryFilter.hora

        if (!fecha || !hora) {
            return courts
        }

        const startDate = new Date(fecha)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + 1)

        const reservedCourtIds = await reservationModel.find({
            date: { $gte: startDate, $lt: endDate },
            timeStart: { $lte: hora },
            timeEnd: { $gte: hora },
            state: { $ne: "cancelada" }
        }).distinct("court")

        return courts.filter((court) =>
            !reservedCourtIds.some((reservedCourtId) =>
                reservedCourtId.equals(court._id)
            )
        )
    }

    async getByUbicacion(ubicacion) {
        return await this.getBy({ ubicacion })
    }

    async getByDeporte(deporte) {
        return await this.getBy({ deporte })
    }

    async getByHorario(hora, dia, fecha) {
        return await this.getBy({ hora, dia, fecha })
    }
}

export default new CourtDao(courtModel)