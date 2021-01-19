import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetBookAsync = async () => {
  const response = await fetch("https://utebookstore.herokuapp.com/books", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const SearchBooksAsync = async (bookName) => {
  const response = await fetch(
    "https://utebookstore.herokuapp.com/books/search",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        keyword: bookName,
      }),
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const BooksByCateAsync = async (cateId) => {
  const response = await fetch(
    "https://utebookstore.herokuapp.com/books/getbookcategory/" + cateId,
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
