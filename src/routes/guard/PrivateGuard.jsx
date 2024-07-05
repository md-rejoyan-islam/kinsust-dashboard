import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthData } from "../../features/auth/authSlice";

const PrivateGuard = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector(getAuthData);

  if (loading) {
    return <div>loading....</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

PrivateGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateGuard;
