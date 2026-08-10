import reserveDao from "../daos/mongoDB/reserve.dao.js";
import courtDao from "../daos/mongoDB/court.dao.js";
import CustomError from "../utils/customError.js";
import userDao from "../daos/mongoDB/usuario.dao.js";

class ReserveService {
    constructor(dao) {
        this.dao = dao;
    }

    crearReserva = async (idUsuario, IdCancha, fecha, horarios, precio) => {
        if (!idUsuario) throw new CustomError(400, "ID de usuario es requerido");

        const usuarioExistente = await userDao.getById(idUsuario);
        if (!usuarioExistente) throw new CustomError(404, "Usuario no encontrado");

        if (!IdCancha) throw new CustomError(400, "Cancha es requerida");

        const canchaExistente = await courtDao.getById(IdCancha);
        if (!canchaExistente) throw new CustomError(404, "Cancha no encontrada");

        if (!fecha) throw new CustomError(400, "Fecha es requerida");
        if (!horarios || horarios.length === 0)
            throw new CustomError(400, "Horarios son requeridos");
        if (!precio || precio <= 0)
            throw new CustomError(400, "Precio debe ser mayor a 0");

        const conflicto = await this.dao.model.exists({
            cancha: IdCancha,
            fecha,
            "horarios.dia": horarios.dia,
            "horarios.horas": {
                $in: horarios.horas,
            },
        });
        if (conflicto)
            throw new CustomError(409, "La fecha y horario ya están reservados");

        const nuevaReserva = await this.dao.create({
            usuario: idUsuario,
            cancha: IdCancha,
            fecha: fecha,
            horarios: horarios,
            precio: precio,
            estado: "confirmada",
        });
        return nuevaReserva;
    };

    cancelarReserva = async (idReserva) => {
        if (!idReserva) throw new CustomError(400, "No se recibio la informacion");
        const reserva = await this.dao.getById(idReserva);
        if (!reserva)
            throw new CustomError(
                404,
                "No se encontro una reserva con esa información",
            );
        return await this.dao.update(idReserva, {estado: "cancelada",});
    };

    getHorarios = async (IdCancha, fecha) => {
        if (!IdCancha) throw new CustomError(400, "Cancha es requerida");
        if (!fecha) throw new CustomError(400, "Fecha es requerida");

        const canchaExistente = await courtDao.getById(IdCancha);
        if (!canchaExistente) throw new CustomError(404, "Cancha no encontrada");

        const horariosCancha = canchaExistente.horariosDisponibles;

        const reservas = await this.dao.model
            .find({
                cancha: IdCancha,
                fecha,
                estado: "confirmada",
            })
            .select("horarios.horas -_id")
            .lean();
        console.log(reservas)

        const horasReservadas = reservas.flatMap((r) => r.horarios.horas);

        const fechaConvertida = new Date(fecha);

        const horasDisponiblesTotales = horariosCancha.reduce((acc, item) => {
            if (item.dia == fechaConvertida.getDay()) {
                acc.push(...item.horas);
            }
            return acc;
        }, []);

        let retorno = horasDisponiblesTotales.map((hora) => {
            return {
                hora: hora,
                isReserved: horasReservadas.includes(hora),
            };
        });

        const fechaActual = new Date();

        if (fechaActual.getDate() == fechaConvertida.getDate()) {
            retorno = retorno.map((item) => {
                if (item.hora <= fechaActual.getHours()) {
                    item.isReserved = true;
                }
                return item;
            });
        }

        return retorno;
    };

    obtenerReservas = async (filtros = {}) => {
        const query = {};
        if (filtros.usuario) query.usuario = filtros.usuario;
        if (filtros.cancha) query.cancha = filtros.cancha;
        if (filtros.fecha) query.fecha = filtros.fecha;
        if (filtros.estado) query.estado = filtros.estado;
        if (filtros.horarios) {
            const horas = Array.isArray(filtros.horarios)
            ? filtros.horarios
            : [filtros.horarios];
            query["horarios.horas"] = { $in: horas };
        }
        
        return await this.dao.getAllReserves(query);
    };

    obtenerReservasDuenio = async (idDuenio, filtros = {}) => {
        if (!idDuenio) throw new CustomError(401, "Usuario no autenticado");

        const duenio = await userDao.getById(idDuenio);
        if (!duenio) throw new CustomError(404, "Usuario no encontrado");
        if (duenio.role !== "owner") {
            throw new CustomError(403, "Solo los dueños de cancha pueden consultar sus reservas");
        }

        const canchas = await courtDao.model.find({ duenio: idDuenio }).select("_id").lean();
        const idsCanchas = canchas.map((cancha) => cancha._id);

        if (idsCanchas.length === 0) return [];

        const query = { cancha: { $in: idsCanchas } };
        if (filtros.fecha) query.fecha = filtros.fecha;
        if (filtros.estado) query.estado = filtros.estado;
        if (filtros.usuario) query.usuario = filtros.usuario;

        return await this.dao.getAllReserves(query);
    };

    modificarReservas = async (id, data ) => {
        return this.dao.update(id, data )
    }  
}

export default new ReserveService(reserveDao);
