import knex from "knex";

class ProductContenedorSQL {
  constructor(config, table) {
    this.database = knex(config);
    this.table = table;
  }

  async save(product) {
    const id = await this.database(this.table).insert(product, ['id']);
    return id;
  }

  // Metodo getById no esta devolviendo nada
  // async getById(id) {
  //   await this.database.select().from(this.table).where('id', parseInt(id));
  //   return;
  // }
  // >> correccion >>:
  async getById(id) {
    return await this.database.select().from(this.table).where('id', parseInt(id));
  }

  // Metodo getAll no esta devolviendo nada
  // async getAll() {
  //   await this.database.select().from(this.table);
  //   return;
  // }
  // >> correccion >>:
  async getAll() {
    return await this.database.select().from(this.table);
  }

  async deleteById(id) {
    await this.database(this.table).where('id', id).del();
    return ;
  }

  async deleteAll() {
    await this.database(this.table).del();
    return ;
  }

  async update(id, product) {
    await this.database(this.table).where('id', id).update(product);
    return ;
  }
}

export default ProductContenedorSQL;