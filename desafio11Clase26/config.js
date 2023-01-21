//mongoose
export default {
    mongodb: {
        url: 'mongodb://localhost/ecommerce',
        options: {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}
console.log("BASE DE DATOS CONECTADA")