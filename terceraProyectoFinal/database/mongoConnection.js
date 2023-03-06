//configuracion para mongoose
export default {
    mongodb: {
        //url: 'mongodb://localhost/ecommerce', // base de datos Claudio
        url: "mongodb+srv://ecommerce:ecommerce@cluster0.e0dov1u.mongodb.net/?retryWrites=true&w=majority", 
        //"mongodb+srv://cluster0.e0dov1u.mongodb.net/ecommerce?appName=mongosh+1.6.1",// mongo atlas
        //url: 'mongodb://localhost/coderhouse', // base de datos Daniel
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}
