import { useEffect, useMemo, useState } from "react";
import ArticleCard from "../../components/article/ArticleCard";
import FilterBar from "../../components/article/FilterBar";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { fetchNewsList } from "../../features/news/newsSlice";
import type { News } from "../../features/news/news.types";

type Article = {
  id: string;
  title: string;
  level: string;
  date: string;
  image?: string;
};

const ITEMS_PER_PAGE = 12;

const ArticleListPage = () => {
  const dispatch = useAppDispatch();
  const { newsList, isLoading, error } = useAppSelector((state) => state.news);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchNewsList());
  }, [dispatch]);

  const articles: Article[] = useMemo(() => {
    return newsList.map((item: News) => ({
      id: item._id,
      title: item.title,
      level: item.level ?? "A1",
      date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
      image: item.image || "",
    }));
  }, [newsList]);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-6 py-8">
      <div className="mx-auto max-w-6xl rounded bg-white p-6 shadow-sm">
        <div className="mb-8">
          <FilterBar />
        </div>

        <h2 className="mb-6 text-lg font-semibold text-gray-900">기사 목록</h2>

        {isLoading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  level={article.level}
                  date={article.date}
                  image={article.image}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`rounded px-3 py-1 text-sm ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleListPage;
