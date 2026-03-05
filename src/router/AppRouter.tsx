import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import AppLayout from "../components/layout/AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
