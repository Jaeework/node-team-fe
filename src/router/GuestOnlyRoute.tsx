import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/hooks";

const GuestOnlyRoute = () => {
  const { user, isInitialized } = useAppSelector((state) => state.user);

  if (!isInitialized) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestOnlyRoute;
