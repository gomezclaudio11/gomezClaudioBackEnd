const express = require('express');
//const logRequestInfo = require('./middlewares/logRequestInfo');

const productRouter = require('./router/user');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("public"));

app.use('/api/products', productRouter);

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
})

app.on('error', (error) => {
  console.log("Error 404")
})
;


  

