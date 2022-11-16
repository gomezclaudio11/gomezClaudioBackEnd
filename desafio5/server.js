const express = require ("express");

const app = express();

app.use (express.urlencoded({ extended: true}));

app.use(express.json());

app.set('view engine', 'ejs');

const ProductContenedor = require("../desafio5/src/contenedor");
const productContenedor = new ProductContenedor();

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

app.get('/', (req, res) => {
   // ProductContenedor.save(req.body);
    const personList = [];
  res.render('pages/index', { list: personList });
});

app.get('/products', (req, res) => {
    const productsList = productContenedor.getAll()
    res.render('pages/products', {list: productsList});
  });

app.post('/products', (req, res) => {
    console.log(req.body);
    productContenedor.save(req.body);
    
    res.redirect('/products'); // TODO enviar datos del historial
  });