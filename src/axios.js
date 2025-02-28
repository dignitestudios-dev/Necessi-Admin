import axios from "axios";
import { ErrorToast } from "./components/Toaster/Toast";

// export const baseUrl = "http://3.129.5.190/api";
// export const baseUrl = "https://necessi.erdumadnan.com/api";
export const baseUrl = "https://necessi-eb.erdumadnan.com/api";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // 10 seconds timeout
});

instance.interceptors.request.use((request) => {
  let token = localStorage.getItem("token");

  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!navigator.onLine) {
      // No internet connection
      ErrorToast(
        "No internet connection. Please check your network and try again."
      );
      return Promise.reject(new Error("No internet connection"));
    }

    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;
