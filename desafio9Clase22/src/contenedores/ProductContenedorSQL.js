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

  async getById(id) {
    await this.database.select().from(this.table).where('id', parseInt(id));
    return;
  }

  async getAll() {
    await this.database.select().from(this.table);
    return;
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