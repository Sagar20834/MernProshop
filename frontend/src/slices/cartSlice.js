import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? { ...existingItem, qty: item.qty } : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //update catt utils
      updateCart(state);
    },
    removeCartItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      updateCart(state);
    },
    increaseCartItemQuantity(state, action) {
      console.log(action);
      const id = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item && item.qty < item.countInStock) {
        item.qty++;
      } else {
        return;
      }
      updateCart(state);
    },
    decreaseCartItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((x) => x._id === id);

      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter((x) => x._id !== id);
        }
      }
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
