export const getData = async (user, route) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return (await response.json()).data;
};

export const createRecord = async (user, route, data) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return (await response.json()).data;
};
