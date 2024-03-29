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

  orderHtml += getTotalLine(cart);

  return orderHtml;
}

function orderTotal(cart) {
  const sum = cart.reduce((accumulator, item) => {
    return accumulator + Number((item.precio * item.cantidad).toFixed(2));
  }, 0);

  return sum;
}

function onCantidadChanged(input, productId) {
  var valor = 0;

  if (input.value.trim().length > 0) {
    valor = parseInt(input.value, 10);
  }

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

/*Validaciones*/
function validateString(input) {
  const valor = input.value;

  if (!valor || valor.trim() === "" || valor.length < 4) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

function validateTelephone(input) {
  var regex =
    /^(\+)?(\s{0,3})?(\()?(\s{0,3})?(\d{1,3})?(\s{0,3})?(\))?(\s{0,3})?(-)?(\s{0,3})?(\d+)$/;
  const phoneNumber = input.value;

  const isValid =
    regex.test(phoneNumber) &&
    phoneNumber.length >= 6 &&
    phoneNumber.length <= 14;

  if (!isValid) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

function validateEmail(input) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = String(input.value).toLowerCase();

  const isValid = regex.test(input.value);

  if (!isValid) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

function validateOrder(cart) {
  return cart.length !== 0;
}

function procesarPedido() {
  const nombre = document.getElementById("nombre");
  const direccion = document.getElementById("direccion");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");

  if (
    validateString(nombre) &&
    validateString(direccion) &&
    validateTelephone(telefono) &&
    validateEmail(email)
  ) {
    if (!validateOrder(cart)) {
      window.alert("Asegúrese de haber agregado algún producto en su pedido");
      return;
    }

    showOrderSummaryDialog(true);
  }
}

function showConfirmDialog(show, message) {
  const dialog = document.getElementById("dialogConfirm");
  const msgbox = document.getElementById("mensaje");

  msgbox.innerHTML = message;
  show ? dialog.classList.remove("hidden") : dialog.classList.add("hidden");
}

function showOrderSummaryDialog(show) {
  const dialog = document.getElementById("dialogOrderSummary");
  const ordersummary = document.getElementById("ordersummary");

  ordersummary.innerHTML = generateOrderSummary(cart);
  show ? dialog.classList.remove("hidden") : dialog.classList.add("hidden");
}

function generateOrderSummary(cart) {
  var orderHtml = "";

  cart.forEach((item) => {
    orderHtml += `<div>${item.cantidad}</div>
    <div>${item.nombre}</div>
    <div class="mipedido__details-precio">${(
      item.precio * item.cantidad
    ).toFixed(2)}</div>`;
  });

  orderHtml += getTotalLine(cart);

  return orderHtml;
}

function getTotalLine(cart) {
  return `<div class="mipedido__details-total">Total</div>
  <div class="mipedido__details-total mipedido__details-precio">
    $ ${orderTotal(cart).toFixed(2)}
  </div>`;
}

function confirmOrder() {
  showOrderSummaryDialog(false);
  showConfirmDialog(
    true,
    "Ya hemos enviado su pedido al restaurante. ¡Muchas gracias!"
  );
}

generateProductCards();
