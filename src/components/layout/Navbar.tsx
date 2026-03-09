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
import Button from "../ui/button/Button";

const Navbar = () => {
  const isLogin: boolean = false;
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
            className="h-9 w-auto object-contain md:h-14"
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
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="rounded-full p-2"
                >
                  <User className="h-5 w-5 md:h-6 md:w-6" />
                </Button>

                {isDropdownOpen && (
                  <div className="bg-background border-border absolute -right-2 z-60 mt-2 w-40 overflow-hidden rounded-lg border py-1 shadow-md md:-right-4 md:w-48">
                    <Link
                      to="/mypage"
                      className="text-ink hover:bg-paper hover:text-ink flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors"
                    >
                      <CircleUser className="h-4 w-4" />
                      Profile
                    </Link>

                    <Button
                      variant="ghost"
                      isFullWidth
                      className="justify-start px-3 py-2.5 text-xs font-medium"
                      onClick={() => {}}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
