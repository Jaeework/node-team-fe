import { Search, Download } from "lucide-react";
import { useMyWord } from "../../hooks/useMyWord";
import Header from "./components/Header/Header";
import WordTypeToggle from "./components/WordTypeToggle/WordTypeToggle";
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import BulkActionBar from "./components/BulkActionBar/BulkActionBar";
import InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";
import Button from "../../components/ui/button/Button";
import GridLayout from "./components/GridLayout";
import WordCard from "../../components/ui/WordCard/WordCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination/Pagination";

const MyWordPage = () => {
  const {
    headerProps,
    userWords,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    selectedIds,
    setSelectedIds,
  } = useMyWord();

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const onChangeStatus = async () => {
    await headerProps.onChangeStatus();
  };

  const onDelete = async () => {
    if (window.confirm("선택한 단어를 삭제하시겠습니까?")) {
      await headerProps.onDelete();
      alert("삭제되었습니다.");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <Header
          title={
            <>
              Word Bank{" "}
              <span className="text-ink/50 text-xl font-medium md:text-2xl">
                (단어장)
              </span>
            </>
          }
          description="Manage and review your saved vocabulary from articles."
          actionElement={
            <Button
              variant="outline"
              radius="xl"
              className="text-primary active:text-primary hover:text-primary bg-white px-3 py-5 text-xs font-semibold transition-transform hover:bg-white active:scale-95 md:px-5 md:py-2.5 md:text-sm"
              onClick={() => alert("준비 중인 기능입니다.")}
            >
              <Download className="size-4" strokeWidth={3} /> CSV Download
            </Button>
          }
        />

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:flex-1">
            <InputWithIcon
              size="lg"
              color="default"
              leftIcon={<Search className="size-5" />}
              placeholder="단어를 입력하세요."
              className="border-border bg-white px-4 py-1"
              value={headerProps.searchTerm}
              onChange={headerProps.onSearchChange}
            />
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <div className="flex w-full justify-start md:w-auto">
              <WordTypeToggle
                selectedValue={headerProps.selectedType}
                onSelect={headerProps.onTypeSelect}
                options={["All", "Word", "Idiom"]}
              />
            </div>

            <div className="flex w-full gap-2 md:w-auto">
              <Dropdown
                label={headerProps.selectedStatus}
                variant="outline"
                radius="lg"
                options={["All", "학습 중", "학습 완료"]}
                className="text-primary w-full flex-1 text-sm font-semibold md:w-auto md:flex-none"
                onSelect={headerProps.onStatusSelect}
              />
              <Dropdown
                label={headerProps.selectedSort}
                variant="outline"
                radius="lg"
                options={["Latest", "Oldest", "A to Z"]}
                className="text-primary w-full flex-1 text-sm font-semibold md:w-auto md:flex-none"
                onSelect={headerProps.onSortSelect}
              />
            </div>
          </div>
        </div>

        <BulkActionBar
          selectedCount={headerProps.selectedCount}
          isAllSelected={headerProps.isAllSelected}
          onToggleSelectAll={headerProps.onToggleSelectAll}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </div>

      <main className="mx-auto max-w-5xl p-6 pt-0">
        {error && <div className="py-10 text-center text-red-500">{error}</div>}

        {isLoading && !error && (
          <div className="flex h-60 flex-col items-center justify-center gap-4">
            <LoadingSpinner size="md" />
          </div>
        )}

        {!isLoading && !error && userWords.length > 0 && (
          <>
            <GridLayout>
              {userWords.map((userWord) => (
                <WordCard
                  key={userWord._id}
                  word={userWord.word}
                  isDone={userWord.isDone}
                  newsList={userWord.word.news?.map((n) => n.news)}
                  isSelected={selectedIds.includes(userWord._id)}
                  onSelect={() => toggleSelection(userWord._id)}
                />
              ))}
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
        {!isLoading && !error && userWords.length === 0 && (
          <div className="border-border text-ink/50 flex h-40 items-center justify-center rounded-xl border-2 border-dashed font-medium">
            표시할 단어가 없습니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default MyWordPage;
