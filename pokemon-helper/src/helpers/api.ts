import axios from "axios";

const ApiInstance = axios.create();

// @ts-expect-error
ApiInstance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      token: localStorage.getItem("token"),
    },
  };
});

export { ApiInstance };
