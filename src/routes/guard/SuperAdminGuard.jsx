import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthData } from "../../features/auth/authSlice";
import Loading from "../../components/loading/Loading";

const SuperAdminGuard = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector(getAuthData);

  if (loading) {
    return <Loading />;
  }
  if (user.role === "superAdmin") {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

SuperAdminGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuperAdminGuard;
