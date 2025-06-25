import axios from "axios";

// Create an Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_token",
  },
});

// Request interceptor: Log request details
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

// Example usage with async/await
export async function getData(endpoint) {
  try {
    const response = await api.get(endpoint);
    console.log("Data fetched successfully:", response);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw to handle it further up the call stack
  }
}

// Example usage with different methods and configurations
export async function postData(endpoint, data) {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        "Custom-Header": "custom-value",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
