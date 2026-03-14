import logo from "../../assets/logo/logo_icon_letter.png";
import { useAppSelector } from "../../features/hooks";
import ProfileDetail from "./components/ProfileDetail/ProfileDetail";
import ProfileSidebar from "./components/Sidebar/ProfileSidebar";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);
  if (!user) return null;
  return (
    <div className="mx-auto w-full max-w-7xl pt-8 md:px-4">
      <div className="flex flex-col gap-8 md:flex-row md:pb-12">
        {/* 사이드바 */}
        <ProfileSidebar />
        {/* 내용 */}
        <div className="border-ink/10 flex-1 rounded-t-2xl border bg-white p-6 shadow-sm md:rounded-b-2xl md:p-8">
          <div className="mb-8">
            <h1 className="text-ink-900 text-2xl font-bold">Profile Details</h1>
            <p className="text-ink/50">
              Manage your account information and learning preferences
            </p>
          </div>
          <div className="border-primary/10 mb-10 flex flex-col items-center gap-6 border-b pb-8 sm:flex-row">
            <div className="border-border rounded-full border border-2">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto object-contain md:h-14"
              />
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h3 className="text-lg font-semibold">{user?.nickname}</h3>
            </div>
          </div>
          {/* 프로필 내용 */}
          <ProfileDetail />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
