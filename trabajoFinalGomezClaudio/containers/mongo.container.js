import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { loggerDefault, loggerError } from "../config/logger.config.js"
import { asPOJO, renombrarCampo, eliminarCampo } from '../utils/object.utils.js'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  serverSelectionTimeoutMS: 5000
};

dotenv.config();

await mongoose.connect(process.env.MONGOBD_CONNECTION_STRING, options)
.then ((db) => loggerDefault.info( "Mongodb conectado", db.connection.host))
.catch ((error) => loggerError.error (error.message))

export default class MongoDbContainer {
  constructor(collectionString, schema) {
    this.coleccion = mongoose.model(collectionString, schema);
  }

  async getById(id) {
    try {
      const docs = await this.coleccion.find({ _id: id }, { __v: 0 })
      if (docs.length == 0) {
        loggerError.error('Error al listar por id: no encontrado')
        return 
      } else {
        const result = renombrarCampo(asPOJO(docs[0]), '_id', 'id')
        return result
      }
    } catch (error) {
      loggerError.error(`Error al listar por id: ${error}`)
    }
  }

  async getAll() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 }).lean()
      docs = docs.map(asPOJO)
      docs = docs.map((doc) => renombrarCampo(doc, '_id', 'id'))
      return docs
    } catch (error) {
      loggerError.error(`Error al listar todo: ${error}`)
    }
  }

  async save(nuevoElem) {
    try {
      let doc = await this.coleccion.create(nuevoElem)
      doc = asPOJO(doc)
      renombrarCampo(doc, '_id', 'id')
      eliminarCampo(doc, '__v')
      return doc
    } catch (error) {
      loggerError.error(`Error al guardar: ${error}`)
    }
  }

  async updateById(id, itemData) {
    try {
      await this.coleccion.updateOne({ _id: id }, { $set: { ...itemData } });
    } catch (error) {
      loggerError.error(error);
    }
  }

  async actualizar(nuevoElem) {
    try {
      renombrarCampo(nuevoElem, 'id', '_id')
      const { n, nModified } = await this.coleccion.replaceOne(
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
      await this.coleccion.deleteOne({ _id: id });
    } catch (error) {
      loggerError.error(error);
    }
  }
  async getByField(field, criteria) {
    try {
        const data = await this.coleccion.findOne().where(field).equals(criteria);
        return data;
    } catch (error) {
      loggerError.error(error);
    }
  }
  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      console.error(error);
    }
  }
}