const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const product = {
        title: document.getElementById("nombre").value,
        price: parseInt(document.getElementById("precio").value),
        thumbnail: document.getElementById("categoria").value,
      }
    
      console.log(product);
      fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    })
