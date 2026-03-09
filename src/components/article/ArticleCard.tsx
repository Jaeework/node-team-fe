type ArticleCardProps = {
  title: string;
  level: string;
  date: string;
  image?: string;
};

const ArticleCard = ({ title, level, date, image }: ArticleCardProps) => {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="h-36 w-full bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{level}</p>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </article>
  );
};

export default ArticleCard;
