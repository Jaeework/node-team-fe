import { Link } from "react-router-dom";
// SNS 로고 아이콘과 메일 아이콘 추가
import { Github, ChevronDown, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import footerLogo from "../../assets/logo/footer_logo.png";

const developers = [
  { name: "소윤정", url: "https://github.com/Jaeework" },
  { name: "박다훈", url: "https://github.com/jieul2" },
  { name: "이광민", url: "https://github.com/kwang-min-lee1" },
  { name: "이소영", url: "https://github.com/SoYoungLEE-me" },
];

const Footer = () => {
  const [isDevOpen, setIsDevOpen] = useState<boolean>(false);

  return (
    <footer className="bg-primary border-primary mt-auto border-t py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-6 md:items-start">
          <Link to="/">
            <img
              src={footerLogo}
              alt="NEWSBITE Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="text-center md:text-left">
            <p className="mt-1 text-sm text-white/60">
              Read global economy, Master your English.
            </p>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <a
              href="#"
              className="hover:bg-accent hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:bg-accent hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:bg-accent hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-6 md:mt-0 md:w-auto md:items-end">
          <div className="flex w-full flex-col items-center gap-6 md:w-auto md:flex-col md:items-end md:gap-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-base font-medium text-white/90 md:justify-end md:py-3">
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link
                to="/articles"
                className="hover:text-accent transition-colors"
              >
                Articles
              </Link>
              <Link
                to="/mypage"
                className="hover:text-accent transition-colors"
              >
                My Page
              </Link>
            </div>

            <div className="flex w-full flex-col items-center md:w-auto md:items-end">
              <button
                onClick={() => setIsDevOpen(!isDevOpen)}
                className="flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 md:w-auto md:justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary flex h-7 w-7 items-center justify-center rounded-full bg-white">
                    <Github className="h-5 w-5" fill="currentColor" />
                  </div>
                  Developers
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${isDevOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid w-full transition-all duration-300 ease-in-out ${
                  isDevOpen
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 px-2 pb-2 text-center md:text-right">
                    {developers.map((dev) => (
                      <div
                        key={dev.name}
                        className="flex items-center justify-center gap-2 text-xs font-medium text-white/90 md:justify-end md:text-sm"
                      >
                        <span>{dev.name}</span>
                        <span className="text-xs text-white/40">(</span>
                        <a
                          href={dev.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent text-white/70 transition-colors hover:underline"
                        >
                          {dev.url}
                        </a>
                        <span className="text-xs text-white/40">)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-8 pt-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="mt-4 text-center text-xs text-white/40 md:text-left">
            © {new Date().getFullYear()} NEWSBITE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <Link to="/terms" className="transition-colors hover:text-white">
              이용약관
            </Link>
            <span>|</span>
            <Link to="/privacy" className="transition-colors hover:text-white">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
