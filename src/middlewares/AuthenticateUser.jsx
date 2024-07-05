import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthenticateUser = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  return isUserLoggedIn ? children : <Navigate to={"/login"}></Navigate>;
};

export default AuthenticateUser;
