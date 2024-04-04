import axios from "axios";
import Cookies from "js-cookie";

import store from "@/store/store";
import { API_URL } from "./constants";

interface apicall {
  path: String;
  getResponse: (res: any) => void;
  getError: (res: any) => void;
  router: any;
  method?: String;
  data?: any;
  contentType?: String;
}

export const apicall = ({
  path,
  getResponse,
  getError,
  router,
  method = "get",
  data = null,
  contentType = "application/json",
}: apicall) => {
  var config: any = {
    method: method,
    url: `${API_URL}${path}`,
    headers: {
      "Content-Type": contentType,
    },
    data,
    withCredentials: true,
  };
  axios(config)
    .then(function (response) {
      getResponse(response);
    })
    .catch(function (error) {
      if (error?.response?.status == 401) {
        Cookies.remove("authUser");
        Cookies.remove("token");

        // store.dispatch(setUserData(null));
        // store.dispatch(setUserLoggedIn(false));
        // store.dispatch(setopenLoginModel(false));
        // if (router) {
        //   router.push("/");
        //   setTimeout(() => {
        //     store.dispatch(setopenLoginModel(true));
        //   }, 500);
        // }
      } else {
        if (getError) {
          getError(error);
        }
      }
    });
};
