import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { loggerDefault, loggerError } from "../config/logger.config.js"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

dotenv.config();

await mongoose.connect(process.env.MONGOBD_CONNECTION_STRING, options)
.then ((db) => loggerDefault.info( "Mongodb conectado", db.connection.host))
.catch ((error) => loggerError.error (error.message))

export default class MongoDbContainer {
  constructor(collectionString, schema) {
    this.model = mongoose.model(collectionString, schema);
  }

  async getById(id) {
    try {
      const item = await this.model.findOne({ _id: id });
      return item;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async save(itemData) {
    try {
      const data = await this.model.create(itemData);
      return data;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async updateById(id, itemData) {
    try {
      await this.model.updateOne({ _id: id }, { $set: { ...itemData } });
    } catch (error) {
      loggerError.error(error);
    }
  }

  async actualizar(nuevoElem) {
    try {
      renombrarCampo(nuevoElem, 'id', '_id')
      const { n, nModified } = await this.model.replaceOne(
        { _id: nuevoElem._id },
        nuevoElem
      )
      if (n == 0 || nModified == 0) {
        loggerError.error('Error al actualizar: no encontrado')
      } else {
        renombrarCampo(nuevoElem, '_id', 'id')
        eliminarCampo(nuevoElem, '__v')
        return asPOJO(nuevoElem)
      }
    } catch (error) {
      loggerError.error(`Error al actualizar: ${error}`)
    }
  }


  async deleteById(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      loggerError.error(error);
    }
  }
  async getByField(field, criteria) {
    try {
        const data = await this.model.findOne().where(field).equals(criteria);
        return data;
    } catch (error) {
      loggerError.error(error);
    }
  }
  async deleteAll() {
    try {
      await this.model.deleteMany({});
    } catch (error) {
      console.error(error);
    }
  }
}