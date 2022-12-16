//1 coneccion con mongo desde la CLI
mongosh

//2 chequeo las bases dedatos
//show dbs

//3 creo la base de datos
//use ecommerce

//4 creo las colecciones
db.createCollection("mensajes")

//5
db.createCollection("productos")

//6 agregar documentos
db.productos.insertMany([ 
    {nombre:'cafe', precio: 200}, 
    {nombre:'cafe con leche', precio: 300}, 
    {nombre:'cafe chico', precio: 250}, 
    {nombre: 'cafe late', precio: 310}, 
    { nombre:'te', precio: 230}]);

//7 agregar documentos
db.mensajes.insertMany([ 
    {nombre:'andres', mensaje: 'Hola, todo bien'}, 
    {nombre:'bot', mensaje: 'Hola, en que podemos ayudarte'}, 
    {nombre:'andres', mensaje: 'No me aparece mi producto en el carrito'}, 
    {nombre: 'bot', mensaje: 'Haz creado tu usuario?'}, 
    { nombre:'andres', mensaje: 'NO'}]);

//8 listar documentos de cada colleccion
db.productos.find()
db.mensajes.find()

//9 mostrar la cantidad de documentos

//db.productos.estimatedDocumentCount();
//db.mensajes.estimatedDocumentCount();
db.productos.find().count();
db.mensajes.find().count();

//punto 5.A

db.productos.insertOne({ nombre: 'te helado', precio: 280 });

//5.B.1
db.productos.find({'precio': {$lt: 1000}})

//5.B.2
db.productos.find({'precio': {$gte: 1000, $lte: 3000}})

//5.B.3
db.productos.find({'precio': {$gte: 3000}})

//5.B.4
//LOS ORDENO
db.productos.find().sort({precio: 1}).skip(2).limit(1)

//explicacion del profe
//.sort ordena, concatenamos un .skip para saltarnos dos resultados y con .limit le decimos
// que nos muestre solo uno, o sea que nos mostrara solo el tercero

//5.C
//actualizacion id x id de los productos agragando stock
db.productos.updateMany({}, {$set: {'stock': 100}})

//5.D
//cambiar stock a 0 de los productos mayores a 400

db.productos.updateMany({precio: {$gte: 400}}, {set: {stock: 0}})

//5.E
//borrar los productos con precio menor a 100
db.productos.deleteMany({price: {$lt:1000}})

//6 Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
db.createUser({ user: "pepe",pwd: "asd456", roles: [{ role: "read", db: "ecommerce"}]})