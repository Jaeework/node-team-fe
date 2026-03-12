import { useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/Badge/Badge";
import NewsParagraph from "./components/NewsParagraph/NewsParagraph";
import { BookOpen, Info } from "lucide-react";
import WordCard from "../../components/ui/WordCard/WordCard";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { fetchNewsDetail, saveUserWords } from "../../features/news/newsSlice";
import { useEffect, useState, useMemo, useRef } from "react";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<"word" | "idiom">("word");

  const scrollRef = useRef<HTMLDivElement>(null);

  const { currentNews, currentWords, currentAbbreviations, isLoading } =
    useAppSelector((state) => state.news);

  const handleSelect = (wordId: string) => {
    setSelectedIds((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId],
    );
  };

  const handelFilterChange = (type: "word" | "idiom") => {
    setFilter(type);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredWords = useMemo(() => {
    return currentWords.filter((word) => word.type === filter);
  }, [currentWords, filter]);

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail({ newsId: id }));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentNews) {
    return <div>No news found.</div>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* 기사 */}
      <div className="bg-paper grid grid-cols-1 gap-8 md:grid-cols-12">
        <article className="border-border relative flex h-[calc(100vh-150px)] flex-col rounded-2xl bg-white p-7 shadow-sm md:col-span-8 md:p-10">
          {/* 기사 정보 섹션(타이틀 위에) */}
          <div className="shrink-0">
            <section className="mb-2 text-sm text-gray-500">
              <Badge size="sm" color={currentNews.level} radius="full">
                {"레벨 "}
                {currentNews.level}
                {" (Level "}
                {currentNews.level}
                {")"}
              </Badge>
              발행 날짜:{" "}
              {new Date(currentNews.published_at).toLocaleDateString()} / 출처:{" "}
              {currentNews.source} / 아이디 : {id}
            </section>
            <div className="absolute top-7 right-7 z-10 md:top-10 md:right-10">
              {/* 빈책 -> 파란색으로 변경 alert표시 스낵바? */}
              {/* 유저뉴스 저장하는 버튼임.  */}
              <Button
                size="icon"
                variant="outline"
                radius="md"
                onClick={() => {}}
              >
                <BookOpen size={15} />
              </Button>
            </div>
            {/* 기사 타이틀 섹션 */}
            <section>
              <h1 className="text-ink mb-6 text-3xl leading-tight font-bold md:text-4xl">
                {currentNews.title}
              </h1>
            </section>
          </div>

          {/* 기사 본문 섹션 */}
          <div className="hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
            <section className="mb-10">
              <div className="max-w-none space-y-1 leading-relaxed text-gray-700">
                {currentNews.content.map((text, i) => (
                  <NewsParagraph
                    key={i}
                    content={text}
                    translated_content={currentNews.translated_content[i]}
                  />
                ))}
              </div>
            </section>

            {/* 약어 및 축약어 섹션 (하드코딩) */}
            <section className="border-border border-t pt-8 pb-4">
              <div className="flex items-center gap-1 pb-1 text-gray-500">
                <h3 className="mb-4 flex items-center text-xs font-bold tracking-widest text-gray-500 uppercase">
                  <Info size={15} className="mr-1" />
                  약어 및 축약어
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {currentAbbreviations.map((text, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-primary block font-semibold whitespace-nowrap">
                      {text.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {text.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
        {/* 단어장 부분  */}
        <aside className="space-y-6 md:col-span-4">
          <section className="border-border flex h-[calc(100vh-150px)] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* 단어장 헤더 */}
            <div className="border-border flex items-center justify-between border-b p-6">
              <h2 className="text-md flex items-center font-bold">단어장</h2>
              <div className="flex rounded-md bg-gray-100 p-1 text-[10px] font-bold">
                <Button
                  size="default"
                  variant={filter === "word" ? "background" : "ghost"}
                  radius="md"
                  className={filter === "word" ? "shadow-sm" : "text-gray-500"}
                  onClick={() => {
                    handelFilterChange("word");
                  }}
                >
                  단어
                </Button>
                <Button
                  size="default"
                  variant={filter === "idiom" ? "background" : "ghost"}
                  radius="md"
                  className={filter === "idiom" ? "shadow-sm" : "text-gray-500"}
                  onClick={() => {
                    handelFilterChange("idiom");
                  }}
                >
                  숙어
                </Button>
              </div>
            </div>
            {/* 단어 리스트*/}
            <div
              ref={scrollRef}
              className="hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 flex flex-col items-start space-y-4 overflow-y-auto bg-gray-50/50 p-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {!user
                ? filteredWords.map((word, index) => (
                    <div key={index} className="w-full">
                      <WordCard word={word} />
                    </div>
                  ))
                : filteredWords.map((word, index) => (
                    <div key={index} className="w-full">
                      <WordCard
                        word={word}
                        isSelected={selectedIds.includes(word.id)}
                        onSelect={() => {
                          handleSelect(word.id);
                        }}
                      />
                    </div>
                  ))}
            </div>
            {user ? (
              <Button
                size="xl"
                variant="primary"
                radius="md"
                className="mx-4 mt-4 mb-2 w-[calc(100%-2rem)] pt-3 pb-3 font-medium"
                disabled={selectedIds.length === 0}
                onClick={() => {
                  dispatch(saveUserWords({ wordIds: selectedIds }))
                    .unwrap()
                    .then(() => {
                      setSelectedIds([]);
                    })
                    .catch();
                }}
              >
                {selectedIds.length > 0
                  ? `${selectedIds.length}개의 단어 저장하기`
                  : "저장할 단어를 선택해 주세요"}
              </Button>
            ) : (
              <></>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
};

export default NewsDetailPage;
