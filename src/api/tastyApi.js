const KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const HOST = process.env.REACT_APP_RAPIDAPI_HOST;
const URL = "https://tasty.p.rapidapi.com";

export const isTastyApiConfigured = KEY && HOST;

async function tastyApi(endpoint, params = {}) {
  if (!isTastyApiConfigured) {
    throw new Error("API key is missing.");
  }

  const query = new URLSearchParams(params);

  const response = await fetch(`${URL}${endpoint}?${query}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": KEY,
      "X-RapidAPI-Host": HOST,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong while getting recipes.");
  }

  const data = await response.json();

  return data;
}

export default tastyApi;
