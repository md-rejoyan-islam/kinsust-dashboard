import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRedirectUser = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  return isUserLoggedIn ? <Navigate to={"/"}></Navigate> : children;
};

export default AuthRedirectUser;
