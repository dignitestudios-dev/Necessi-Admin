import axios from "axios";

export const baseUrl = "http://3.129.5.190/api";

const instance = axios.create({
  baseURL: baseUrl,
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
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    if (error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
