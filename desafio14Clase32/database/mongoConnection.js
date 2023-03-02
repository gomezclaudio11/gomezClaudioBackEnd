//configuracion para mongoose
export default {
    mongodb: {
        //url: 'mongodb://localhost/ecommerce', // base de datos Claudio
        url: "mongodb+srv://<credentials>@cluster0.e0dov1u.mongodb.net/ecommerce?appName=mongosh+1.6.1",//base de datos mongoatlas
        //url: 'mongodb://localhost/coderhouse', // base de datos Daniel
        options: {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}
