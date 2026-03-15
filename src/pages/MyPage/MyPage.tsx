import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useAppSelector, useAppDispatch } from "../../features/hooks";
import ArticleCard from "../../components/article/ArticleCard";
import WordCard from "../../components/common/WordCard/WordCard";
import Button from "../../components/ui/button/Button";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../features/news/newsSlice";
import { getUserNews } from "../../features/news/userNewsSlice";
import { useMyWord } from "../../hooks/useMyWord";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, articles } = useAppSelector((state) => state.news);
  const { userNews } = useAppSelector((state) => state.userNews);
  const { userWords } = useMyWord();
  // 슬라이드 상태 관리
  const [direction, setDirection] = useState(0); // 1: 오른쪽, -1: 왼쪽
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchArticles({ page: 1, limit: 5, level: user?.level }));
    dispatch(getUserNews({}));
  }, [dispatch, user?.level]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prevPage) => prevPage + newDirection);
  };

  const activeIndex =
    articles.length > 0 ? Math.abs(page % articles.length) : 0;
  // 애니메이션 변수 설정
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "30%" : "-30%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const displayUserNews = userNews.slice(0, 3);
  const displayUserWords = userWords.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size={"lg"} />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 md:px-8">
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold">Recommended Articles</h2>
            <span className="text-sm font-normal text-gray-500">
              (추천 기사)
            </span>
          </div>

          <div className="flex gap-2">
            {/* 4. disabled 제거: 무한 루프이므로 항상 클릭 가능 */}

            <Button
              size="icon"
              variant="outline"
              radius="md"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              radius="md"
              onClick={() => paginate(1)}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              {[0, 1, 2].map((offset) => {
                // 무한 루프 인덱스 계산
                const itemIndex =
                  articles.length > 0
                    ? (activeIndex + offset) % articles.length
                    : 0;
                const article = articles[itemIndex];
                if (!article) return null;

                return (
                  <motion.div
                    key={`${page}-${itemIndex}`} // page를 포함하여 전환 시마다 애니메이션 트리거
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 200, damping: 25 }, // 물리 효과 설정
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.3 },
                    }}
                  >
                    <ArticleCard
                      id={article._id}
                      title={article.title}
                      level={article.level}
                      date={
                        article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : ""
                      }
                      image={article.image || ""}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* 저장한 기사  */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="mb-8 flex items-baseline gap-2">
            <h2 className="text-2xl font-bold">Saved Articles</h2>
            <span className="text-sm font-normal text-gray-500">
              (저장한 기사)
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              navigate("/me/articles");
            }}
          >
            더보기
            <Search size={18} />
          </Button>
        </div>
        {/* 저장한 뉴스 불러오기 3개 */}
        {displayUserNews.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayUserNews.map((userNews) => (
              <ArticleCard
                key={userNews._id}
                id={userNews._id}
                title={userNews.news.title}
                level={userNews.news.level}
                date={
                  userNews.createdAt
                    ? new Date(userNews.createdAt).toLocaleDateString()
                    : ""
                }
                image={userNews.news.image || ""}
              />
            ))}
          </div>
        ) : (
          // 저장한 기사가 없을 때
          <div className="border-border text-ink/50 flex h-40 items-center justify-center rounded-xl border-2 border-dashed font-medium">
            저장한 기사가 없습니다.
          </div>
        )}
      </section>
      {/* 내 단어장 */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="mb-8 flex items-baseline gap-2">
            <h2 className="text-2xl font-bold">My Vocabulary</h2>
            <span className="text-sm font-normal text-gray-500">
              (내 단어장)
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              navigate("/me/vocabulary");
            }}
          >
            더보기
            <Search size={18} />
          </Button>
        </div>
        {displayUserWords.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayUserWords.map((userWord) => (
              <WordCard
                key={userWord._id}
                word={userWord.word}
                isDone={userWord.isDone}
                newsList={userWord.word.news}
              />
            ))}
          </div>
        ) : (
          // 단어장이 비어있을 때
          <div className="border-border text-ink/50 flex h-40 items-center justify-center rounded-xl border-2 border-dashed font-medium">
            표시할 단어가 없습니다.
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPage;
