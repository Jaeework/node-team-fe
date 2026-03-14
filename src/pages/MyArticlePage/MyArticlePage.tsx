import { Search, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getUserNews, deleteUserNews } from "../../features/news/userNewsSlice";
import { showToast } from "../../features/toast/toastSlice";
import { cn } from "../../lib/utils";

import type { NewsLevelType } from "../../features/news/news.types";

import Header from "../../components/my/Header/Header";
import TypeToggle from "../../components/my/WordTypeToggle/TypeToggle";
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";
import GridLayout from "../../components/my/GridLayout";
import ArticleCard from "../../components/article/ArticleCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/common/Pagination/Pagination";
import BulkActionBar from "../../components/my/BulkActionBar/BulkActionBar";
import ConfirmModal from "../../components/common/ConfirmModal/ConfirmModal";
import Button from "../../components/ui/button/Button";

const LEVEL_OPTIONS: NewsLevelType[] = ["All", "A2", "B1", "B2", "C1"];
const SORT_OPTIONS = ["Latest", "Oldest", "A to Z"];

const MyArticlePage = () => {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { userNews, pagination, isLoading, error } = useAppSelector(
    (state) => state.userNews,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Latest");
  const [level, setLevel] = useState<NewsLevelType>("All");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(
      getUserNews({
        q: searchTerm || undefined,
        level: level === "All" ? undefined : level,
        sort:
          sort === "Latest" ? "recent" : sort === "Oldest" ? "oldest" : "title",
        page,
      }),
    );
  }, [dispatch, page, searchTerm, sort, level]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    userNews.length > 0 && selectedIds.length === userNews.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(userNews.map((item) => item._id));
    }
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) => dispatch(deleteUserNews(id)).unwrap()),
      );

      dispatch(
        showToast({
          message: "선택한 기사가 삭제되었습니다.",
          type: "success",
        }),
      );

      setSelectedIds([]);
      setIsDeleteModalOpen(false);

      if (pagination && page > pagination.totalPages - 1) {
        setPage(Math.max(1, page - 1));
        return;
      }

      dispatch(
        getUserNews({
          q: searchTerm || undefined,
          level: level === "All" ? undefined : level,
          sort:
            sort === "Latest"
              ? "recent"
              : sort === "Oldest"
                ? "oldest"
                : "title",
          page,
        }),
      );
    } catch {
      dispatch(
        showToast({
          message: "기사 삭제에 실패했습니다.",
          type: "error",
        }),
      );
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <Header
          title={
            <>
              Saved Articles{" "}
              <span className="text-ink/50 text-xl font-medium md:text-2xl">
                (학습 중인 기사)
              </span>
            </>
          }
          description="Review and manage articles you saved for learning."
        />

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:flex-1">
            <InputWithIcon
              size="lg"
              leftIcon={<Search className="size-5" />}
              placeholder="기사 제목을 입력하세요."
              className="border-border bg-white px-4 py-1"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <TypeToggle
              options={LEVEL_OPTIONS}
              selectedValue={level}
              onSelect={(value) => {
                setLevel(value as NewsLevelType);
                setPage(1);
              }}
            />

            <Dropdown
              label={sort}
              variant="outline"
              radius="lg"
              options={SORT_OPTIONS}
              className="text-primary text-sm font-semibold"
              onSelect={(value) => {
                setSort(value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex w-full gap-2 md:hidden">
            <Dropdown
              label={level === "All" ? "Level" : level}
              variant="outline"
              radius="lg"
              options={LEVEL_OPTIONS}
              className="text-primary w-full text-sm font-semibold"
              onSelect={(value) => {
                setLevel(value as NewsLevelType);
                setPage(1);
              }}
            />

            <Dropdown
              label={sort}
              variant="outline"
              radius="lg"
              options={SORT_OPTIONS}
              className="text-primary w-full text-sm font-semibold"
              onSelect={(value) => {
                setSort(value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <BulkActionBar
          selectedCount={selectedIds.length}
          isAllSelected={isAllSelected}
          onToggleSelectAll={toggleSelectAll}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      </div>

      <main className="mx-auto max-w-5xl p-6 pt-0">
        {error && <div className="py-10 text-center text-red-500">{error}</div>}

        {isLoading && !error && (
          <div className="flex h-60 items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        )}

        {!isLoading && !error && userNews.length > 0 && (
          <>
            <GridLayout>
              {userNews.map((item) => {
                const isSelected = selectedIds.includes(item._id);

                return (
                  <div key={item._id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center p-0",
                        "rounded-md border-2 border-[#2f5f8a] bg-white shadow-sm transition",
                        "hover:scale-105 hover:bg-white active:scale-95",
                        "overflow-visible",
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelection(item._id);
                      }}
                    >
                      {isSelected && (
                        <Check
                          size={18}
                          strokeWidth={3}
                          className="shrink-0 text-[#2f5f8a]"
                        />
                      )}
                    </Button>

                    <ArticleCard
                      id={item.news._id}
                      title={item.news.title}
                      level={item.news.level}
                      date={new Date(
                        item.news.published_at,
                      ).toLocaleDateString()}
                      image={item.news.image}
                    />
                  </div>
                );
              })}
            </GridLayout>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  page={page}
                  totalPages={pagination.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}

        {!isLoading && !error && userNews.length === 0 && (
          <div className="border-border text-ink/50 flex h-40 items-center justify-center rounded-xl border-2 border-dashed font-medium">
            저장한 기사가 없습니다.
          </div>
        )}
      </main>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="기사 삭제"
        message="선택한 기사를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default MyArticlePage;
