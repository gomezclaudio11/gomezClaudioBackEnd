// Cambie el nombre del archivo config.js para guardarlo en la carpeta database junto con los otros archivos de configuracion de base de datos 
// y de esta manera este mas ordenado

//configuracion para mongoose
export default {
    mongodb: {
        //url: 'mongodb://localhost/ecommerce', // base de datos Claudio
        url: "mongodb+srv://<credentials>@cluster0.e0dov1u.mongodb.net/ecommerce?appName=mongosh+1.6.1",
        //url: 'mongodb://localhost/coderhouse', // base de datos Daniel
        options: {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}
