import { writable } from "svelte/store";
import { uploadFilesToS3 } from "./fileUploadHelpers.js";
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

  const addCartItem = async (newItem, newItemKey) => {
    const cart = getCart();
    let newCart = {};

    // If files were uploaded as descriptions
    if (
      newItem["data-description"] &&
      newItem["data-description"].length &&
      newItem["data-description"][0] instanceof File
    ) {
      let files = [];
      for (let i = 0; i < newItem["data-description"].length; i++) {
        files.push(newItem["data-description"][i]);
      }

      let itemLinks = await uploadFilesToS3(
        "test_" + newItem["data-uuid"],
        files,
        files[0].type,
        function (item) {}
      );
      newItem["data-description"] = "";
      itemLinks.forEach((file) => {
        newItem["data-description"] += `${file["link"]} \n`;
      });
      //Remove last newline
      newItem["data-description"] = newItem["data-description"].trim();
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
