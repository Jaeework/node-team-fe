import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../features/hooks";

const PrivateRoute = () => {
  const location = useLocation();
  const { user, isInitialized } = useAppSelector((state) => state.user);
  if (!isInitialized) return null;
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
