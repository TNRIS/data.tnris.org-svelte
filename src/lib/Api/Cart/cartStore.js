import { writable } from "svelte/store";

export let cartOpen = writable(false);

function createCart() {
  let cart = localStorage.getItem("data_shopping_cart");
  cart != null ? (cart = cart) : (cart = JSON.stringify({}));
  const { subscribe, set, update } = writable(JSON.parse(cart));

  const getCart = () => {
    if (localStorage.data_shopping_cart) {
      return JSON.parse(localStorage.data_shopping_cart);
    } else {
      return null;
    }
  };

  const setCart = (newCart) => {
    localStorage.setItem("data_shopping_cart", JSON.stringify(newCart));
    const res = getCart();

    update((prev) => res);

    return res;
  };

  const addCartItem = (newItem, newItemKey) => {
    const cart = getCart();
    let newCart = {};

    newCart = { ...cart, [newItemKey]: newItem };

    return setCart(newCart);
  };

  const deleteCartItem = (cartItemId) => {
    const cart = getCart();

    delete cart[cartItemId];
    const newCart = cart;

    return setCart(newCart);
  };

  return {
    subscribe,
    deleteItem: deleteCartItem,
    addItem: addCartItem,
    reset: () => setCart({}),
  };
}

export const cartStore = createCart();