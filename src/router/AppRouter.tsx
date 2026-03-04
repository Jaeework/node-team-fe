import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage /> } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
