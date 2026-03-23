export const getData = async (user, route) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return ((await response.json()).data);
};
