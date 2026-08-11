import oauthStateModel from "./models/oauthState.model.js";
import MongoDao from "./mongo.dao.js";

class oauthStateDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  async crearOAuthState(usuarioId, state) {
    return await this.model.create({
      usuario: usuarioId,
      state
    });
  }

  async consumirOAuthState(state) {
    return await this.model.findOneAndDelete({
      state
    });
  }
}

export default new oauthStateDao(oauthStateModel);