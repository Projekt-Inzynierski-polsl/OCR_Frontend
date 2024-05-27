import { toast } from 'react-toastify';
import Cookies from "js-cookie";

import axios from "axios";
const instance = axios.create();
instance.interceptors.response.use(
  (response) => {
    toast(response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      axios
        .get("http://localhost:8051/api/account/token", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          Cookies.set("authToken", response.data, { path: "/", expires: 7 });
        })
        .catch((error) => {
          toast.error(error);
          Cookies.remove("authToken", { path: "/" });
          // window.location.href = "/login";
        });
    } else {
        toast.error(`Błąd serwera (${error.response.request.responseURL})`);
    }
    return Promise.reject(error);
  }
);

export default instance;