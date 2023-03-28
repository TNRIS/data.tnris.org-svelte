import { writable } from "svelte/store";
export let cartOpen = writable(false);
import JSZip from "jszip";
import { genZip64 } from "./zipBase64";

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

  const addCartItem = async (newItem, newItemKey) => {
    const cart = getCart();
    let newCart = {};
    if (newItem["data-description"] && newItem["data-description"].length && newItem["data-description"][0] instanceof File) {
      // We must zip the attachments. Then serialized to base64
      let dfZip = new JSZip();

      for(let i = 0; i < newItem["data-description"].length; i++) {
        dfZip.file(newItem["data-description"][i].name, newItem["data-description"][i]);
      }

      //Zip the uploaded files and convert to base 64 for local storage.
      let b64zip = await genZip64(dfZip);
      newItem["data-description"] = b64zip;
    }
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
