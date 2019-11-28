import * as axios from "axios";
import Config from "../Config";
let instance = axios.create();

instance.defaults.baseURL = Config.api_path;
instance.defaults.timeout = 5000;

if (false) {
  console.log("----------------------");
  console.log(instance.defaults.baseURL);
  console.log("----------------------");

  instance.interceptors.request.use(request => {
    console.log("Starting Request", request.url, request.data);
    return request;
  });

  instance.interceptors.response.use(response => {
    console.log("-----------------------------------");
    console.log("Response:", response.config.url, response.data);
    console.log("-----------------------------------");
    return response;
  });
}

const postConfig = {
  method: "POST",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};
export { instance, postConfig };
