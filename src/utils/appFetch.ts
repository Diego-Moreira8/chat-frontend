type AppFetchOptions = {
  method?: "GET" | "POST";
  body?: object;
  accessToken?: string;
};

async function appFetch(uri: string, options: AppFetchOptions = {}) {
  const { method = "GET", body, accessToken } = options;
  const BACKEND_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME;

  const response = await fetch(`${BACKEND_HOSTNAME}${uri}`, {
    method,
    headers: {
      ...(accessToken && { Authorization: accessToken }),
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return response;
}

export { appFetch };
