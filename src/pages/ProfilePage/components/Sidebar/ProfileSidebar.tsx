import { User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-2 px-2 md:w-64">
      <div className="mb-2 p-4">
        <h3 className="text-primary/60 text-xs font-bold tracking-widest uppercase">
          Account Settings
        </h3>
      </div>
      <Link
        className="bg-accent-blue/10 text-accent-blue hidden items-center gap-3 rounded-xl px-4 py-3 font-semibold md:flex"
        to="/me/profile"
      >
        <User size={16} />
        <span>Profile Details</span>
      </Link>
      <hr className="border-ink/10 my-1 hidden md:block" />
    </aside>
  );
};

export default ProfileSidebar;
