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
import Button from "../../ui/button/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Badge from "../../ui/Badge/Badge";

const WordCard = ({
  word,
  isDone,
  newsList,
  isSelected,
  onSelect,
}: WordCardProps) => {
  const { text, meaning, example, example_meaning, type } = word;

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const speakWord = (text: string) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang === "en-US");

    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="border-border flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* 단어 */}
            <h3 className="text-primary text-2xl font-bold wrap-break-word">
              {text}
            </h3>
            <Button
              variant="ghost"
              size="xs"
              className="rounded-full p-1.5 text-gray-400"
              onClick={() => speakWord(text)}
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>

          {/* 상단 뱃지들 */}
          <div className="flex flex-wrap items-center gap-2">
            {type && type !== "abbreviation" && (
              <Badge size="xs" color={type} radius="md">
                {type}
              </Badge>
            )}

            {isDone !== undefined && (
              <Badge
                size="sm"
                color={isDone ? "mastered" : "learning"}
                radius="full"
                className="flex items-center gap-1.5"
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
              </Badge>
            )}
          </div>
        </div>

        {onSelect && (
          <Button
            variant="ghost"
            onClick={onSelect}
            className="p-1 text-gray-400"
          >
            {isSelected ? (
              <CheckSquare className="text-primary h-6 w-6" />
            ) : (
              <Square className="h-6 w-6" />
            )}
          </Button>
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
            <Button
              type="button"
              variant="ghost"
              isFullWidth
              onClick={() => setIsExpanded(!isExpanded)}
              className="justify-between px-0 font-medium text-gray-500 hover:bg-transparent"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Related Articles ({newsList.length})
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {isExpanded && (
              <div className="border-border bg-border absolute top-full left-0 z-50 mt-3 flex w-full flex-col gap-2 rounded-lg border p-3 text-sm shadow-xl">
                {newsList.map((news) => {
                  const articleId = news.id || news._id;

                  return (
                    <Link
                      key={articleId}
                      to={`/articles/${articleId}`}
                      className="text-ink hover:text-primary cursor-pointer truncate transition-colors"
                    >
                      • {news.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCard;
