import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
//export const url = "https://api.infoseckw.com/";
export const url = "http://127.0.0.1:3001/";

export const instance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});
class UserStore {
  user = null;
  token = null;
  login = async userData => {
    try {
      const res = await instance.post("login", userData);
      const user = res.data;
      this.token = user.token;
      this.setUser(user.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  setUser = token => {
    if (token) {
      localStorage.setItem("myToken", token);
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const decodedUser = jwt_decode(token);
      this.user = decodedUser;
    } else {
      delete instance.defaults.headers.common.Authorization;
      localStorage.removeItem("myToken");
      this.user = null;
    }
  };
  register = async userData => {
    try {
      const res = await instance.post("register", userData);
      this.login(userData);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      console.log("Logged in ");
      this.setUser(token);
    }
  };
  logout = () => {
    this.setUser();
  };
}

decorate(UserStore, {
  user: observable,
  token: observable
});
const userStore = new UserStore();
//userStore();
userStore.checkForToken();
export default userStore;
