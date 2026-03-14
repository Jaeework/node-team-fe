import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import ArticleListPage from "../pages/ArticleListPage/ArticleListPage";
import AppLayout from "../components/layout/AppLayout";
import NewsDetailPage from "../pages/NewsDetailPage/NewsDetailPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";
import MyWordPage from "../pages/MyWordPage/MyWordPage";
import MyPage from "../pages/MyPage/MyPage";
import MyArticlePage from "../pages/MyArticlePage/MyArticlePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ScrollToTop from "../components/common/ScrollToTop";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles/:id" element={<NewsDetailPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/me">
              <Route index element={<MyPage />} />
              <Route path="vocabulary" element={<MyWordPage />} />
              <Route path="articles" element={<MyArticlePage />} />
            </Route>
            <Route path="/me/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<GuestOnlyRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
