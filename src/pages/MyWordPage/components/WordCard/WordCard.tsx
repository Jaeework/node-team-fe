import { useState } from "react";
import type { WordCardProps } from "./WordCard.types";
import {
  Volume2,
  Square,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpen,
  CheckCircle,
} from "lucide-react";

const WordCard = ({
  text,
  meaning,
  example,
  example_meaning,
  type,
  isSelected = false,
  onSelect,
  newsList,
  isDone,
}: WordCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-border flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* 단어 */}
            <h3 className="text-primary text-2xl font-bold wrap-break-word">
              {text}
            </h3>
            <button className="hover:text-primary hover:bg-paper shrink-0 rounded-full p-1 text-gray-400 transition-colors">
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          {/* 상단 뱃지들 */}
          <div className="flex flex-wrap items-center gap-2">
            {type && type !== "abbreviation" && (
              <span className="bg-paper text-primary border-primary/20 rounded-md border px-2 py-1 text-xs font-semibold tracking-wide capitalize">
                {type}
              </span>
            )}

            {isDone !== undefined && (
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isDone
                    ? "bg-primary/10 text-primary border-primary/20 border"
                    : "bg-paper border-border border text-gray-500"
                }`}
              >
                {isDone ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5" /> 암기 완료
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3.5 w-3.5" /> 학습 중
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {onSelect && (
          <button
            onClick={onSelect}
            className="hover:text-primary shrink-0 text-gray-400 transition-colors"
          >
            {isSelected ? (
              <CheckSquare className="text-primary h-6 w-6" />
            ) : (
              <Square className="h-6 w-6" />
            )}
          </button>
        )}
      </div>

      {/* 뜻 */}
      {meaning && (
        <p className="text-ink mt-4 text-base font-medium">{meaning}</p>
      )}
      {/* 예문, 해석 */}
      {(example || example_meaning) && (
        <div className="border-accent mt-4 flex flex-col gap-1 border-l-[3px] pl-3">
          {example && <p className="text-ink text-sm">"{example}"</p>}
          {example_meaning && (
            <p className="text-sm text-gray-500">"{example_meaning}"</p>
          )}
        </div>
      )}

      {newsList && newsList.length > 0 && (
        <div className="border-border mt-auto pt-5">
          <div className="border-border relative border-t pt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 100)}
              className="hover:text-primary flex w-full cursor-pointer items-center justify-between text-sm text-gray-500 transition-colors"
            >
              <span className="flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4" />
                Related Articles ({newsList.length})
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isExpanded && (
              <div className="border-border bg-border absolute top-full left-0 z-50 mt-3 flex w-full flex-col gap-2 rounded-lg border p-3 text-sm shadow-xl">
                {newsList.map((news) => (
                  <a
                    key={news._id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-primary cursor-pointer truncate transition-colors"
                  >
                    • {news.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCard;
