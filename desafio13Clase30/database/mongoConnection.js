// Cambie el nombre del archivo config.js para guardarlo en la carpeta database junto con los otros archivos de configuracion de base de datos 
// y de esta manera este mas ordenado

//configuracion para mongoose
export default {
    mongodb: {
        url: 'mongodb://localhost/ecommerce', // base de datos Claudio
        //url: 'mongodb://localhost/coderhouse', // base de datos Daniel
        options: {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}
console.log("BASE DE DATOS CONECTADA")