import * as axios from "axios";
import Config from "../Config";

let instance = axios.create();

// service de login
export async function user_login(login, password) {
  const url = Config.api_path + "user/login?login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password);
  // console.log("url", url);
  try {
    return await instance.get(url);
  } catch (error) {
    console.log("loginService", error);
  }
  return { data: null, status: 202 };
}
