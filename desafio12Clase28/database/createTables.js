import knex from 'knex';
import mysqlConnection from './mysqlConnection.js';
import sqliteConnection from './sqliteConnection.js';

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
    const database = knex(sqliteConnection);
    await database.schema.dropTableIfExists('mensajes');
  
    await database.schema.createTable('mensajes', (table) => {
      table.increments('id').primary()
      table.string('email', 50).notNullable()
      table.string('text', 255)
      table.timestamps('date')
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