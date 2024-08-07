const updateCart = (state) => {
  //calculate items price of each items
  state.itemsPrice = state.cartItems
    .reduce(
      (acc, currentItem) => acc + currentItem.price * Number(currentItem.qty),
      0
    )
    .toFixed(2);

  //calculate tax price of each items
  state.taxPrice = (state.itemsPrice * 0.13).toFixed(2);

  //calculate shipping price of each items
  state.shippingPrice = state.itemsPrice > 1000 ? 0 : 10;

  //calculate total price of each items
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

export default updateCart;
