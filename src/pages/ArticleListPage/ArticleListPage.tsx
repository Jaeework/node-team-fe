import { useEffect, useState } from "react";
import ArticleCard from "../../components/article/ArticleCard";
import FilterBar from "../../components/article/FilterBar";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { fetchArticles } from "../../features/news/newsSlice";

const ITEMS_PER_PAGE = 12;

const ArticleListPage = () => {
  const dispatch = useAppDispatch();
  const { articles, pagination, isLoading, error } = useAppSelector(
    (state) => state.news,
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage]);

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
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
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
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from(
                  { length: pagination.totalPages },
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
