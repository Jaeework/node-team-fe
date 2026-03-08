import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  User,
  LogOut,
  CircleUser,
  Home,
  LibraryBig,
  FolderHeart,
} from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const isLogin: boolean = true;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-1 transition-all duration-200 border-b-2 flex items-center ${
      isActive
        ? "border-primary text-primary font-bold"
        : "border-transparent text-ink font-semibold hover:text-primary hover:border-primary hover:font-bold"
    }`;

  return (
    <nav className="bg-background border-border relative z-50 border-b shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <div className="flex items-center">
          <div className="mr-4 flex items-center gap-4 text-base md:mr-10 md:gap-8">
            <NavLink to="/dashboard" className={navLinkClass}>
              <Home className="block h-5 w-5 md:h-6 md:w-6 lg:hidden" />
              <span className="hidden lg:block">Home</span>
            </NavLink>

            <NavLink to="/articles" className={navLinkClass}>
              <LibraryBig className="block h-5 w-5 md:h-6 md:w-6 lg:hidden" />
              <span className="hidden lg:block">Articles</span>
            </NavLink>

            <NavLink to="/me" className={navLinkClass}>
              <FolderHeart className="block h-5 w-5 md:h-6 md:w-6 lg:hidden" />
              <span className="hidden lg:block">My Page</span>
            </NavLink>
          </div>

          <div className="border-border relative border-l pl-4 md:pl-6">
            {isLogin ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="hover:bg-paper flex h-8 w-8 items-center justify-center rounded-full transition-colors md:h-10 md:w-10"
                >
                  <User className="text-ink hover:text-primary h-5 w-5 transition-colors md:h-6 md:w-6" />
                </button>

                {isDropdownOpen && (
                  <div className="bg-background border-border absolute left-1/2 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-lg border py-1 shadow-md">
                    <Link
                      to="/mypage"
                      className="text-ink hover:bg-border hover:text-primary flex items-center gap-3 px-4 py-3 text-sm transition-colors"
                    >
                      <CircleUser className="h-4 w-4" />
                      Profile
                    </Link>
                    <button className="text-ink hover:bg-border hover:text-primary flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-ink hover:text-primary text-sm font-semibold transition-colors md:text-base"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
