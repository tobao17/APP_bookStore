export function checkoutAsync(cartItems, token) {
  fetch("https://utebookstore.herokuapp.com/cart/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ cartItems }),
  }).then((response) => {
    return response;
  });
}

export function submitOrderAsync(objectValue, token) {
  fetch("https://utebookstore.herokuapp.com/order/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ objectValue }),
  }).then((response) => {
    return response;
  });
}
