import axios from "axios";

// Create an Axios instance with a base URL and default headers
export const apiMain = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_token",
  },
});

export const apiChatBot = axios.create({
  baseURL: import.meta.env.VITE_CHAT_BOT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_token",
  },
});

async function setupInterceptors(api) {
  // Request interceptor: Log request detailsx
  api.interceptors.request.use(
    (config) => {
      console.log("Request:", config.method, config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor: Handle errors globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request error:", error.message);
      }
      return Promise.reject(error);
    }
  );
  // This function can be used to set up interceptors if needed
  // Currently, interceptors are set up directly below
}

setupInterceptors(apiMain);
setupInterceptors(apiChatBot);
