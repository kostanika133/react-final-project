async function auth(user, param) {
  const requestUrl = `https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth/${param}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.msg || data.message || "Authentication failed.");
  }

  return data;
}

export default auth;
