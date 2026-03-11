import { useState } from "react";
import { Languages } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import type { NewsParagraphProps } from "./NewsParagraph.types";

const NewsParagraph = ({ content, translated_content }: NewsParagraphProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative border-b border-gray-100 p-2 pb-4 transition-colors last:border-0 hover:bg-gray-50/50">
      <div className="relative pr-14">
        <p className="text-ink flex-1 leading-relaxed">{content}</p>
        <div className="absolute top-0 right-0">
          <Button
            size="xs"
            variant={isExpanded ? "primary" : "outline"}
            radius="lg"
            className="shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Languages size={14} /> : <Languages size={14} />}
            <span className="ml-1 hidden text-[10px] sm:inline">번역</span>
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-1 mt-3 rounded-md bg-blue-50/40 p-3 text-sm text-gray-600 duration-200">
          <div className="text-primary/60 mb-1 flex items-center gap-1 text-[10px] font-bold">
            <Languages size={12} />
            번역본
          </div>
          {translated_content}
        </div>
      )}
    </div>
  );
};

export default NewsParagraph;
