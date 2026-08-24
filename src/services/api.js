const API_BASE_URL = "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
headers: {
  "Content-Type": "application/json",
  ...(localStorage.getItem("token")
    ? {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    : {}),
  ...options.headers,
},
      ...options,
    }
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    );
  }

  return response.json();
}

export const api = {
  get: (endpoint) =>
    request(endpoint),

  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};