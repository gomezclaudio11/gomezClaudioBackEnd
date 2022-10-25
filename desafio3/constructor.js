/*
class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return console.log(`Nombre: ${this.nombre}, Apellido: ${this.apellido}, libros: ${JSON.stringify (this.libros)}, Mascotas: ${this.mascotas}`)
    }
    
    
    addMascota(nuevaMascota){
       this.mascotas.push(nuevaMascota); 
       
    }
    
    countMascotas (){
        return console.log(`Cantidad de mascotas: ${this.mascotas.length}`)
    }

    addBook (nuevoLibro){
        this.libros.push(nuevoLibro)
    }

    getBookNames(){
       let arrayConNombres = []
       this.libros.find(cadaLibro => {
        arrayConNombres.push(cadaLibro.nombre)
       })
       return arrayConNombres;
    }
}

let usuario1 = new Usuario ("ricardo", "Centurion",[{nombre: "Harry Potter", autor: "J.K. Rowling"}], ["Perro", " Gato", ])

usuario1.getFullName();
usuario1.addMascota(nuevaMascota = " Raton");
console.log(usuario1.mascotas)
usuario1.countMascotas();
usuario1.addBook({nombre: "El señor de los anillos", autor: "William Golding" })
console.log(usuario1.libros)
console.log(usuario1.getBookNames());
*/

// desafio 2

const fs = require ("fs")

class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(obj){
        try {
            
            let dataArch = await fs.promises.readFile(this.ruta, "utf8")
            
            let dataArchParse = JSON.parse (dataArch)
            
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 } ], null, 2))                              
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{ ...obj, id: 1 }], null, 2))                
            }
             console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log (error)
        }
    }
    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

            let dataArchParse = JSON.parse(dataArch)

            let producto = dataArchParse.find(producto => producto.id === id)

            if (producto) {                
                console.log(producto)
            } else {               
                console.log('No se encontro el producto')  
            }           
        } catch (error) {
            console.log(error)
        }
    }

    async random(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

            let dataArchParse = JSON.parse(dataArch)
           
            function random (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            let producto = dataArchParse.random()

            if (producto) {                
                console.log(producto)
            } else {               
                console.log('No se encontro el producto')  
            }           
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            if (dataArchParse.length) {
                console.log(dataArchParse) 
                return dataArchParse               
            } else {
                console.log('No hay productos')
                return null
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){

        let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

        let dataArchParse = JSON.parse(dataArch)

        let producto = dataArchParse.find(prod => prod.id === id)

        if (producto) {
            const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
            console.log('Producto eliminado')
        }else{
            console.log('no existe el producto')
        }
    }

    
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

//const contenedor = new Contenedor("./desafio3/productos.json")

module.exports = Contenedor



//contenedor.save({nombe: "leche", precio: 20, categoria: "bebida"});

//contenedor.getById(7)

// contenedor.getAll()

//contenedor.delete(5)

//contenedor.deleteAll()
