import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthData } from "../../features/auth/authSlice";
import Loading from "../../components/Loading";

const PrivateGuard = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector(getAuthData);

  if (loading) {
    return <Loading />;
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
