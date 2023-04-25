console.log('Ejecucion de js en el cliente')
const socket = io()

/* PRODUCT */
/* Se recibe el listado de PRODUCTOS y se renderiza en el HTML */
function getProducts () {
  console.log('getProducts...')
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  }
  return fetch('/productos', options)
    .then(response => response.json())
    .then((productos) => {
      const productsListHTML = productos
        .map(
          (product) => `
            <tr>
                <td scope="col">${product.title}</td>
                <td scope="col">${product.price}</td>
                <td scope="col">
                    <img src = ${product.thumbnail} style="height: 80px; width: 80px; border-radius: 20%;"/>
                </td>
                <td scope="col"><button class="btn btn-success" title="Agregar bebida al pedido" id="${drink.id}" onClick="agregarAlPedido(event)">Agregar</button></td>
            </tr>
            `
        )
        .join('')

      const productsList = document.getElementById('productsList')
      productsList.innerHTML = productsListHTML
    })
    .catch((error) => {
      console.log(error)
    })
}

/* PEDIDO */
/* Funciones para agregar un producto al pedido */
function postProductToPedido(idProduct) {
  console.log('postProductToPedido...')
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return fetch(`/carrito/${idProduct}`, options)
    .then(() => {
      getPedido()
    })
    .catch((error) => {
      console.log(error)
    })
}

function agregarAlPedido(event) {
  const idProducts = event.target.id
  postProductToPedido(idProducts)
}

/* Se recibe el pedido y se renderiza en el HTML */
function getPedido() {
  console.log('getPedido...')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return fetch('/carrito', options)
    .then(response => response.json())
    .then((carritos) => {
      const products = carritos.product
      if (products && products != []) {
        const productsPedidoHTML = products
          .map(
            (products) => `
              <tr>
                  <td scope="col">${products.title}</td>
                  <td scope="col">${products.price}</td>
                  <td scope="col">
                      <img src = ${products.thumbnail} style="height: 80px; width: 80px; border-radius: 20%;"/>
                  </td>
                  <td scope="col"><button class="btn btn-danger" title="Quitar bebida del pedido" id="${products.id}" onClick="quitarDelPedido(event)">Eliminar</button></td>
              </tr>
              `
          )
          .join('')
    
        const productsPedido = document.getElementById('productsPedido')
        productsPedido.innerHTML = productsPedidoHTML
      } else {
        const productsPedidoHTML = ''
        const productsPedido = document.getElementById('productsPedido')
        productsPedido.innerHTML = productsPedidoHTML
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

/* Funcion para eliminar un producto del pedido */
function deleteProductFromPedido(idProduct) {
  console.log('deleteProductFromPedido...')
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return fetch(`/pedidos/${idProduct}`, options)
    .then(() => {
      getPedido()
    })
    .catch((error) => {
      console.log(error)
    })
}

function quitarDelPedido(event) {
  const idProduct = event.target.id
  deleteProductFromPedido(idProduct)
}

/* Funcion eliminar todas las productos del pedido */
function vaciarPedido() {
  console.log('vaciarPedido...')
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return fetch('/pedidos', options)
    .then(() => {
      getPedido()
    })
    .catch((error) => {
      console.log(error)
    })
}

/* COMENTARIOS */
/* Se recibe el listado de comentarios y se renderiza en el HTML */
socket.on('conversation', (mensajes) => {
  const mensajesHtml = mensajes
    .map(
      (mensaje) => `
      <div>
        <strong style= "color: blue">${mensaje.author.username}:  </strong>
        <em>[<em style="color:brown">${mensaje.author.date}</em>]: <i style= "color: green">${mensaje.text}</i></em>
      </div>`
    )
    .join(' ')

  document.getElementById('mensajes').innerHTML = mensajesHtml
})

/* Formulario para agregar comentarios */
const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = document.getElementById('text').value
  const username = document.getElementById('username').dataset.username
  const date = new Date().toLocaleString('en-GB')
  const nuevoMensaje = {
    author: { username: username, date: date },
    text: text,
  }
  socket.emit('nuevo-mensaje', nuevoMensaje)
  form.reset()
})

getProducts()
getPedido()