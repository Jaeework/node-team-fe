import { useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import NewsParagraph from "./components/NewsParagraph/NewsParagraph";
import { BookOpen, Info } from "lucide-react";
import WordCard from "../../components/ui/WordCard/WordCard";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { fetchNewsDetail } from "../../features/news/newsSlice";
import { useEffect, useState, useMemo } from "react";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<"word" | "idiom">("word");

  const { currentNews, currentWords, currentAbbreviations, isLoading, error } =
    useAppSelector((state) => state.news);

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

  if (error) {
    return <div>Error: {error}</div>;
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
              {currentNews.level} / 발행 날짜:{" "}
              {new Date(currentNews.published_at).toLocaleDateString()} / 출처:{" "}
              {currentNews.source} / 아이디 : {id}
            </section>
            <div className="absolute top-7 right-7 z-10 md:top-10 md:right-10">
              <Button
                size="icon"
                variant="outline"
                radius="md"
                onClick={() => window.open(currentNews.url)}
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
                    index={i}
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
        {/* 단어장 부분 (하드코딩) */}
        <aside className="space-y-6 md:col-span-4">
          <section className="border-border flex h-[calc(100vh-150px)] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* 단어장 헤더 */}
            <div className="border-border flex items-center justify-between border-b p-6">
              <h2 className="text-md flex items-center font-bold">단어장</h2>
              <div className="flex rounded-md bg-gray-100 p-1 text-[10px] font-bold">
                <Button
                  size="default"
                  variant="ghost"
                  radius="md"
                  className="text-gray-500"
                  onClick={() => {
                    setFilter("word");
                  }}
                >
                  단어
                </Button>
                <Button
                  size="default"
                  variant="background"
                  radius="md"
                  className="shadow-sm"
                  onClick={() => {
                    setFilter("idiom");
                  }}
                >
                  숙어
                </Button>
              </div>
            </div>

            {/* 단어 리스트*/}
            <div className="hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 flex flex-col items-start space-y-4 overflow-y-auto bg-gray-50/50 p-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
              {filteredWords.map((word, index) => (
                <div key={index} className="w-full">
                  <WordCard
                    key={index}
                    text={word.text}
                    meaning={word.meaning}
                    example={word.example}
                    example_meaning={word.example_meaning}
                    isSelected={word.isDone}
                    type={word.type}
                    onSelect={() => {}}
                    newsList={[]}
                    isDone={word.isDone}
                  />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default NewsDetailPage;
