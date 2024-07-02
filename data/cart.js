export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const addedMessageTimeout = {};

// Add cartItems to the cart array in cart.js
export function addToCart(productId) {
  let matchingItem;

  // make dropdown interactive
  const quantitySelectorValue = document.querySelector(`.js-quantity-selector-${productId}`)
    .value;

  const quantity = Number(quantitySelectorValue);

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  // Show added message when click on add to cart button
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add("added-to-cart-visible");

  // Add timeout to remove added message after 2 seconds.
  const previousTimeoutId = addedMessageTimeout[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000)

  addedMessageTimeout[productId] = timeoutId;
    
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}