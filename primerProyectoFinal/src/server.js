const express = require('express');

const productRouter = require('./router/user');
const carritoRouter = require ("./router/carrito");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);

app.use("/api/carrito", carritoRouter)

app.use(express.json())

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
})

app.on('error', (error) => {
  console.log("Error 404")
})
;