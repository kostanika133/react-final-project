async function auth(user, param) {
  const register_url = `https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth/${param}`;
  const response = await fetch(register_url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.msg);
}

export default auth;
