import { Link } from "react-router-dom";
import DetailPreview from "../../assets/preview/article_detail.png";
import Button from "../../components/ui/button/Button";

const LandingPage = () => {
  return (
    <main className="bg-paper min-h-screen">
      <section className="px-6 pt-24 pb-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <h1 className="text-ink text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Master Business
              <br />
              <span className="text-primary">English</span> with
              <br />
              <span className="text-primary">Real-Time</span>
              <br />
              <span className="text-primary">Economy News</span>
            </h1>

            <div className="flex justify-center lg:hidden">
              <div className="relative w-full max-w-2xl">
                <div className="border-border overflow-hidden rounded-2xl border bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.45)]">
                  <div className="border-border flex items-center gap-2 border-b bg-gray-100 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>

                  <img
                    src={DetailPreview}
                    alt="Article preview"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="text-ink/80 max-w-xl text-lg leading-relaxed sm:text-xl">
              매일 업데이트되는 글로벌 경제 기사를 통해 트렌드를 파악하고,
              <br className="hidden sm:block" />
              실무에 바로 쓸 수 있는 고급 어휘와 표현을 익혀보세요.
            </p>

            <div className="flex justify-center gap-3 font-semibold lg:justify-start">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="primary"
                  className="hover:bg-primary !hover:text-background active:scale-[0.97]"
                >
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-background !hover:text-ink active:scale-[0.97]"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="relative w-full max-w-2xl">
              <div className="border-border overflow-hidden rounded-2xl border bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.45)]">
                <div className="border-border flex items-center gap-2 border-b bg-gray-100 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>

                <img
                  src={DetailPreview}
                  alt="Article preview"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
