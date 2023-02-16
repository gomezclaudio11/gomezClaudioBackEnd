import mysqlConnection from "./database/mysqlConnection"

dotenv.config()

const mongoDb = process.env.mongoDb

const mysqlConnection = process.env.mysqlConnection

console.log({
    mongoDb,
    mysqlConnection
})