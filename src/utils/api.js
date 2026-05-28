export const getData = async (user, route) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const parsedResponse = await response.json();
  if(!response.ok){
    throw new Error(parsedResponse.error);
  }

  return parsedResponse.data;
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

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.error);
  }

  return parsedResponse;
};

export const updateRecord = async (user, route, data) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.error);
  }

  return parsedResponse;
};

export const deleteRecord = async (user, route) => {
  const token = await user.getIdToken();
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();
  if (!response.ok) {
    throw new Error(parsedResponse.error);
  }
  return parsedResponse;
};
