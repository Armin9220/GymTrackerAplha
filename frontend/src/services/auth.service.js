import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = (username, password) =>
  axios.post(API_URL + "login", { username, password })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getJwtHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user && user.token ? user.token : "";
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  };
};

const signup = (username, email, password, role = "user") =>
  axios.post(API_URL + "signup", {
    username,
    email,
    password,
    roles: [role],
  });

export default {
  login,
  logout,
  getCurrentUser,
  getJwtHeader,
  signup
};
