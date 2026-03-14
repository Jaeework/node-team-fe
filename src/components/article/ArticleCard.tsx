import { Link } from "react-router-dom";
import type { ArticleCardProps } from "./ArticleCard.types";
import Badge from "../ui/Badge/Badge";
import logo from "../../assets/logo/logo.png";

const ArticleCard = ({ id, title, level, date, image }: ArticleCardProps) => {
  return (
    <Link
      to={`/articles/${id}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="h-36 w-full bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-50 p-4">
            <img
              src={logo}
              alt="NewsBite logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <Badge size="xs" color={level as "A2" | "B1" | "B2" | "C1"}>
          {level}
        </Badge>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
