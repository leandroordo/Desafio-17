var cart = [];

var products = [
  {
    id: 0,
    nombre: "Empanadas de carne",
    descripcion: "Empanadas al horno muy jugosas",
    precio: 650,
    imagen: "./img/empanadas_carne.jpg ",
  },
  {
    id: 1,
    nombre: "Empanadas de jamón y queso",
    descripcion: "Empanadas al horno con mucho queso",
    precio: 650,
    imagen: "./img/empanadas_jyq.jpg ",
  },
  {
    id: 2,
    nombre: "Pizza de jamón y morrones",
    descripcion: "Pizza a la piedra",
    precio: 9600,
    imagen: "./img/pizza.jpg ",
  },
  {
    id: 3,
    nombre: "Pizza de calabresa",
    descripcion: "Pizza a la piedra de calabresa",
    precio: 9900,
    imagen: "./img/pizza_calabresa.jpg ",
  },
  {
    id: 4,
    nombre: "Sandwich de milanesa",
    descripcion: "Completo, con papas fritas",
    precio: 6900,
    imagen: "./img/milanesa.jpg ",
  },
  {
    id: 5,
    nombre: "Papas fritas",
    descripcion: "Papas fritas por porción",
    precio: 1800,
    imagen: "./img/papas.jpg ",
  },
  {
    id: 6,
    nombre: "Coca Cola",
    descripcion: "Gaseosa de 1 litro y medio",
    precio: 2500,
    imagen: "./img/coca.jpg ",
  },
  {
    id: 7,
    nombre: "Pepsi",
    descripcion: "Gaseosa en lata",
    precio: 1700,
    imagen: "./img/Pepsi.jpg ",
  },
];

function generateProductCards() {
  const menuDiv = document.getElementById("menu-container");
  menuDiv.innerHTML = generateProductsHtml(products);
}

function generateProductsHtml(products) {
  var productsHtml = "";

  products.forEach((element) => {
    productsHtml += `<div class="card" onClick="addProductToCart(${element.id})">
      <div class="details">
        <div class="card__title">${element.nombre}</div>
        <div class="card__description">${element.descripcion}</div>
        <div class="card__price">$ ${element.precio}</div>
      </div>
      <div class="card__image">
        <img src="${element.imagen}" class="card__image" alt="${element.nombre}" />
      </div>
    </div>`;
  });
  return productsHtml;
}

function addProductToCart(productId) {
  if (!productAlreadyInCart(productId)) {
    const lenght = cart.push(products[productId]);
    cart[lenght - 1].cantidad = 1;

    updateOrderList(cart);
  }
}

function productAlreadyInCart(productId) {
  return cart.some((p) => p.id === productId);
}

function updateOrderList(cart) {
  const orderDiv = document.getElementById("order-container");
  orderDiv.innerHTML = generateOrderList(cart);
}

function generateOrderList(cart) {
  var orderHtml = "";

  cart.forEach((item) => {
    orderHtml += `<div>${item.nombre}</div>
    <input
      type="number"
      class="mipedido__details-cantidad"
      required
      min="0"
      max="99"
      value="${item.cantidad}"
      onblur="onCantidadChanged(this, ${item.id})"
    />
    <div class="mipedido__details-precio">${(
      item.precio * item.cantidad
    ).toFixed(2)}</div>`;
  });

  orderHtml += `<div class="mipedido__details-total">Total</div>
  <div class="mipedido__details-total mipedido__details-precio">
    $ ${orderTotal(cart).toFixed(2)}
  </div>`;

  return orderHtml;
}

function orderTotal(cart) {
  const sum = cart.reduce((accumulator, item) => {
    return accumulator + Number((item.precio * item.cantidad).toFixed(2));
  }, 0);

  return sum;
}

function onCantidadChanged(input, productId) {
  const valor = parseInt(input.value, 10);
  if (Number.isInteger(valor) && valor >= 0 && valor <= 99) {
    const productInCart = cart.find((c) => c.id === productId);

    if (productInCart) {
      if (valor === 0) {
        //Quitar el producto del pedido
        cart = cart.filter((c) => c.id != productId);
      } else {
        productInCart.cantidad = valor;
      }
      updateOrderList(cart);
    }
  }
}

generateProductCards();
