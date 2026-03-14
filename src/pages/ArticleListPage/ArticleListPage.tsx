import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { fetchArticles } from "../../features/news/newsSlice";
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import GridLayout from "../MyWordPage/components/GridLayout";
import ArticleCard from "../../components/article/ArticleCard";
import Pagination from "../../components/ui/Pagination/Pagination";
import InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const ArticleListPage = () => {
  const dispatch = useAppDispatch();
  const { articles, pagination, isLoading, error } = useAppSelector(
    (state) => state.news,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [level, setLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(
      fetchArticles({
        keyword: searchTerm,
        level: level === "All" ? undefined : level,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    );
  }, [dispatch, currentPage, searchTerm, level]);

  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 md:px-8">
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-black">Article Library</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Enhance your vocabulary with daily economic news...
            </p>
          </div>
        </div>
      </section>
      <section className="mb-10 space-y-6">
        <div className="group relative">
          <InputWithIcon
            size="lg"
            color="default"
            leftIcon={<Search className="size-5" />}
            placeholder="기사 제목을 입력하세요."
            className="border-border bg-white px-4 py-1"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative min-w-35">
              <Dropdown
                label={level === "All" ? "Level" : level}
                variant="outline"
                radius="lg"
                options={["All", "A2", "B1", "B2", "C1"]}
                className="text-primary w-full text-sm font-semibold"
                onSelect={(value) => {
                  setLevel(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* 데이터가 없을떄 (error) 일때 */}
        {error && (
          <div className="border-border text-ink/50 flex h-40 items-center justify-center rounded-xl border-2 border-dashed font-medium">
            {error}
          </div>
        )}

        {/* 2. 로딩 상태: 헤더와 검색창은 유지하고 컨텐츠만 스피너로 표시 */}
        {isLoading && !error && (
          <div className="flex h-60 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* 3. 데이터가 있을 때 */}
        {!isLoading && !error && articles.length > 0 && (
          <>
            <GridLayout>
              {articles.map((article) => (
                <ArticleCard
                  id={article._id}
                  key={article._id}
                  title={article.title}
                  image={article.image}
                  level={article.level}
                  date={new Date(article.published_at).toLocaleDateString()}
                />
              ))}
            </GridLayout>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  page={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ArticleListPage;
