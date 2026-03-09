import ArticleCard from "../../components/article/ArticleCard";
import FilterBar from "../../components/article/FilterBar";
import FloatingArticleCard from "../../components/article/FloatingArticleCard";
import Pagination from "../../components/article/Pagination";

const dummyArticles = [
  {
    id: 1,
    title: "Global Markets React to Shifting Interest Rates",
    level: "B1 Intermediate",
    date: "Oct 24, 2025",
  },
  {
    id: 2,
    title: "How AI is Changing the Future of Remote Work",
    level: "A2 Elementary",
    date: "Oct 23, 2025",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Investing in 2024",
    level: "B2 Advanced",
    date: "Oct 20, 2025",
  },
  {
    id: 4,
    title: "Simple Ways to Save Money Every Month",
    level: "A2 Elementary",
    date: "Oct 18, 2025",
  },
  {
    id: 5,
    title: "Supply Chain Disruptions: A Global Perspective",
    level: "B1 Intermediate",
    date: "Oct 17, 2025",
  },
  {
    id: 6,
    title: "Basic English for Business Meetings",
    level: "A1 Beginner",
    date: "Oct 15, 2025",
  },
  {
    id: 7,
    title: "The Volatility of Digital Currencies Explained",
    level: "B2 Advanced",
    date: "Oct 13, 2025",
  },
  {
    id: 8,
    title: "Mastering the Job Interview in English",
    level: "B1 Intermediate",
    date: "Oct 12, 2025",
  },
  {
    id: 9,
    title: "Staying Safe Online: Cyber Security 101",
    level: "A2 Elementary",
    date: "Oct 10, 2025",
  },
];

const ArticleListPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f3] px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-sm">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Article Library</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enhance your vocabulary with daily economic news tailored to your
            level.
          </p>
        </section>

        <section className="mb-8">
          <FilterBar />
        </section>

        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dummyArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                level={article.level}
                date={article.date}
              />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Pagination />
        </section>
      </div>

      <FloatingArticleCard
        title="The Volatility of Digital Currencies Explained"
        level="B2 Advanced"
      />
    </div>
  );
};

export default ArticleListPage;
