type FloatingArticleCardProps = {
  title: string;
  level: string;
  image?: string;
};

const FloatingArticleCard = ({
  title,
  level,
  image,
}: FloatingArticleCardProps) => {
  return (
    <div className="fixed right-6 bottom-6 z-50 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      <div className="h-36 w-full bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Floating Preview
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <span className="inline-block rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold text-orange-600">
          {level}
        </span>

        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <button className="mt-2 text-sm font-medium text-blue-600 hover:underline">
          Read Article →
        </button>
      </div>
    </div>
  );
};

export default FloatingArticleCard;
