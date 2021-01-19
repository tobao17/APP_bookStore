export const UserInfoAsync = async (userId) => {
  const response = await fetch(
    "https://utebookstore.herokuapp.com/user/userdetail/" + userId,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const ForgotPasswordAsync = async (email) => {
  const response = await fetch(
    "https://utebookstore.herokuapp.com/user/forgetpassword",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  )
    .then((response) => response.status)
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const UserOrderAsync = async (token) => {
  const response = await fetch(
    "https://utebookstore.herokuapp.com/order/myorder",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};
