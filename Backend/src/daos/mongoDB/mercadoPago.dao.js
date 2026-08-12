import MercadoPagoAccount from "./models/mercadoPagoAccount.model.js"
import MongoDao from "./mongo.dao.js";

class MercadoPagoDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  async buscarCuentaConectadaPorUsuario(usuarioId) {
    return await this.model.findOne({
      usuario: usuarioId,
      status: "connected"
    });
  }

  async buscarCuentaConTokensPorUsuario(usuarioId) {
    return await this.model
      .findOne({
        usuario: usuarioId,
        status: "connected"
      })
      .select("+accessToken +refreshToken");
  }

  async crearOReemplazarCuenta(datos) {
    
      console.log("Edf23")
    await this.model.updateMany(

      {
        usuario: datos.usuario,
        status: "connected"
      },
      {
        $set: {
          status: "disconnected",
          disconnectedAt: new Date()
        }
      }
    );

    console.log("2AcF3d")

    return await this.model.create(datos);
  }

  async actualizarTokens(cuentaId, datos) {
    return await this.model
      .findByIdAndUpdate(
        cuentaId,
        {
          $set: {
            ...datos,
            lastRefreshedAt: new Date()
          }
        },
        {
          new: true
        }
      )
      .select("+accessToken +refreshToken");
  }

  async desconectarCuenta(usuarioId) {
    return await this.model.findOneAndUpdate(
      {
        usuario: usuarioId,
        status: "connected"
      },
      {
        $set: {
          status: "disconnected",
          disconnectedAt: new Date()
        }
      },
      {
        new: true
      }
    );
  }

  buscarProximasAVencer = async (fechaLimite) => {
  return await this.model.find({
    status: "connected",
    expiresAt: { $lte: fechaLimite }
  });
}
}

export default new MercadoPagoDao(MercadoPagoAccount);