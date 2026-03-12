import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import {
  getMyWords,
  deleteWord,
  updateWordStatus,
} from "../features/word/wordSlice";
import type { WordFilterType } from "../pages/MyWordPage/components/WordTypeToggle/WordTypeToggle.types";

export const useMyWord = () => {
  const dispatch = useAppDispatch();

  const { userWords, pagination, isLoading, error } = useAppSelector(
    (state) => state.word,
  );

  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<WordFilterType>("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredWords = useMemo(() => {
    return userWords.filter((uw) => {
      if (selectedStatus === "학습 완료") return uw.isDone === true;
      if (selectedStatus === "학습 중") return uw.isDone === false;
      return true;
    });
  }, [userWords, selectedStatus]);

  const isAllSelected = useMemo(() => {
    return (
      filteredWords.length > 0 &&
      filteredWords.every((uw) => selectedIds.includes(uw._id))
    );
  }, [filteredWords, selectedIds]);

  const fetchWords = useCallback(
    (pageOverride?: number) => {
      const statusParam =
        selectedStatus === "학습 완료"
          ? "done"
          : selectedStatus === "학습 중"
            ? "doing"
            : undefined;

      const typeParam =
        selectedType === "Word"
          ? "word"
          : selectedType === "Idiom"
            ? "idiom"
            : undefined;

      const sortParam =
        selectedSort === "Latest"
          ? "recent"
          : selectedSort === "A to Z"
            ? "alpha"
            : selectedSort === "Oldest"
              ? "oldest"
              : "recent";

      dispatch(
        getMyWords({
          q: searchTerm || undefined,
          status: statusParam,
          sort: sortParam,
          type: typeParam,
          page: pageOverride ?? page,
        }),
      );
    },
    [dispatch, searchTerm, selectedStatus, selectedSort, selectedType, page],
  );

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPage(1);
    setSearchTerm(value);
    fetchWords(1);
  };

  const handleTypeSelect = (type: WordFilterType) => {
    setPage(1);
    setSelectedType(type);
    fetchWords(1);
  };

  const handleStatusSelect = (status: string) => {
    setPage(1);
    setSelectedStatus(status);
    fetchWords(1);
  };

  const handleSortSelect = (sort: string) => {
    setPage(1);
    setSelectedSort(sort);
    fetchWords(1);
  };

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredWords.map((uw) => uw._id));
    }
  };

  const handleBulkChangeStatus = async () => {
    const promises = selectedIds.map((id) => {
      const targetWord = userWords.find((w) => w._id === id);
      if (!targetWord) return Promise.resolve();

      return dispatch(
        updateWordStatus({
          userWordId: id,
          status: targetWord.isDone ? "doing" : "done",
        }),
      );
    });

    setSelectedIds([]);

    await Promise.all(promises);
  };

  const handleBulkDelete = async () => {
    const promises = selectedIds.map((id) => dispatch(deleteWord(id)));

    await Promise.all(promises);

    setSelectedIds([]);

    // 마지막 페이지 삭제 처리
    if (userWords.length === selectedIds.length && page > 1) {
      setPage(page - 1);
    } else {
      fetchWords();
    }
  };

  return {
    userWords: filteredWords,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    selectedIds,
    setSelectedIds,

    headerProps: {
      searchTerm,
      onSearchChange: handleSearchChange,

      selectedType,
      onTypeSelect: handleTypeSelect,

      selectedStatus,
      onStatusSelect: handleStatusSelect,

      selectedSort,
      onSortSelect: handleSortSelect,

      selectedCount: selectedIds.length,
      isAllSelected,

      onToggleSelectAll: handleToggleSelectAll,
      onChangeStatus: handleBulkChangeStatus,
      onDelete: handleBulkDelete,
    },
  };
};
