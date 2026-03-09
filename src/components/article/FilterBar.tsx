const levels = ["Level", "A1", "A2", "B1", "B2"];
const topics = ["Topic", "Tech", "Economy", "Finance", "Business"];

const FilterBar = () => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search by topic, keyword, or company..."
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400"
      />

      <div className="flex flex-wrap gap-3">
        <select className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none">
          {levels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>

        <select className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none">
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>

        <button className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          All
        </button>
        <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          B1 Intermediate
        </button>
        <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Tech
        </button>
        <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Economy
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
