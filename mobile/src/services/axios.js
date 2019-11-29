import * as axios from "axios";
import Config from "language_therapy/src/Config";
var instance = axios.create();

instance.defaults.baseURL = Config.apiurl;
instance.defaults.timeout = 30000;

/*
instance.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});


instance.interceptors.response.use(response => {
  console.log("Response:", response.config.url, response.data);
  return response;
});
*/

const postConfig = {
  method: "POST",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};
const patchConfig = {
  method: "PATCH",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};
export { instance, postConfig, patchConfig };
