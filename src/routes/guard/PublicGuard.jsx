import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getAuthData } from "../../features/auth/authSlice";
import Loading from "../../components/Loading";

const PublicGuard = () => {
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { user, loading } = useSelector(getAuthData);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Outlet />;
  }
  return <Navigate to={from} state={{ from: location }} replace></Navigate>;
};

export default PublicGuard;
