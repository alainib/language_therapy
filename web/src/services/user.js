import * as axios from "./axios";

// service de login
export async function user_login(login, password) {
  const url = "user/login?login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password);
  console.log("login url", url);
  try {
    return await axios.instance.get(url);
  } catch (error) {
    console.log("loginService", error);
  }
  return { status: 202 };
}
