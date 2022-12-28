/*
const knex = require('knex');

//mi sql conection + create tables
const mysqlConnection = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
  };
  
  module.exports = mysqlConnection;

const createProductTable = async () => {
  try {
    const database = knex(mysqlConnection);
    await database.schema.dropTableIfExists('productos');
  
    await database.schema.createTable('productos', (table) => {
      table.increments('id').primary()
      table.string('title', 15).notNullable()
      table.float('price', 15).notNullable()
      table.string('thumbnail', 255).notNullable()
    });
  
    console.log('TABLE productos created');
  } catch (error) {
    console.log('TABLE productos error: ', error)
  }
};

const createMessageTable = async () => {
  try {
    const database = knex(mysqlConnection);
    await database.schema.dropTableIfExists('mensajes');
  
    await database.schema.createTable('mensajes', (table) => {
      table.increments('id').primary()
      table.string('email', 50).notNullable()
      table.string('text', 255)
      table.timestamps()
    });
  
    console.log('TABLE mensajes created');
  } catch (error) {
    console.log('TABLE mensajes error: ', error)
  }
};

const createTables = async () => {
  await createProductTable();
  await createMessageTable();
}
createTables();
*/

//mongoose
export default {
  mongodb: {
      url: 'mongodb://localhost/ecommerce',
      options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          serverSelectionTimeoutMS: 5000,
      }
  }
}