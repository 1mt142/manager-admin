import jwtDecode from "jwt-decode";

export const authChecker = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const { exp, username } = jwtDecode(token);
  console.log("username", username);
  localStorage.setItem("user", username);
  if (Date.now() >= exp * 1000 && username) {
    localStorage.removeItem("token");
    return false;
  }
  return !!token;
};
