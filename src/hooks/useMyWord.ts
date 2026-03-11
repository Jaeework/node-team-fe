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
  const { userWords, isLoading, error } = useAppSelector((state) => state.word);

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

  const fetchWords = useCallback(() => {
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
      }),
    );
  }, [dispatch, searchTerm, selectedStatus, selectedSort, selectedType]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  // 전체 선택/해제
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
    setSelectedIds([]);
    await Promise.all(promises);
  };

  return {
    userWords: filteredWords,
    isLoading,
    error,
    selectedIds,
    setSelectedIds,
    headerProps: {
      searchTerm,
      onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value),
      selectedType,
      onTypeSelect: setSelectedType,
      selectedStatus,
      onStatusSelect: setSelectedStatus,
      selectedSort,
      onSortSelect: setSelectedSort,
      selectedCount: selectedIds.length,
      isAllSelected, // 전체 선택 상태 전달
      onToggleSelectAll: handleToggleSelectAll, // 토글 함수 전달
      onChangeStatus: handleBulkChangeStatus,
      onDelete: handleBulkDelete,
    },
  };
};
