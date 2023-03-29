import mongoose from "mongoose";
import * as dotenv from "dotenv";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

dotenv.config();

await mongoose.connect(process.env.MONGOBD_CONNECTION_STRING, options);

export default class MongoDbContainer {
  constructor(collectionString, schema) {
    this.model = mongoose.model(collectionString, schema);
  }

  async getById(id) {
    try {
      const item = await this.model.findOne({ _id: id });
      return item;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async save(itemData) {
    try {
      const data = await this.model.create(itemData);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateById(id, itemData) {
    try {
      await this.model.updateOne({ _id: id }, { $set: { ...itemData } });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      console.error(error);
    }
  }
  async getByField(field, criteria) {
    try {
      const data = await this.model.findOne().where(field).equals(criteria);
     return data;
    } catch (error) {
      console.error(error);
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