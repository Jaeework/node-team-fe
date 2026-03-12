import type { UserLevel } from "../../features/user/user.types";
import InputWithIcon from "../ui/input-with-icon/InputWithIcon";
import { Search } from "lucide-react";

const levels: Array<"Level" | UserLevel> = ["Level", "A2", "B1", "B2", "C1"];
const topics = ["Topic", "Tech", "Economy", "Finance", "Business"];

const FilterBar = () => {
  return (
    <div className="space-y-4">
      <InputWithIcon
        type="text"
        placeholder="Search by topic, keyword, or company..."
        leftIcon={<Search size={16} />}
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
