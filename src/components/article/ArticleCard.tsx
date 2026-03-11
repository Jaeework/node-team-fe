import { Link } from "react-router-dom";
import type { ArticleCardProps } from "./ArticleCard.types";

const ArticleCard = ({ id, title, level, date, image }: ArticleCardProps) => {
  return (
    <Link
      to={`/articles/${id}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="h-36 w-full bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            이미지
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <p className="text-xs font-semibold text-gray-500">{level}</p>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
