import { HiSearch, HiChevronDown } from "react-icons/hi";

export default function SearchSort({
  title,
  search,
  sort,
  onSearch,
  onSort,
  onAdd,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="flex flex-wrap items-center gap-2 mt-2 mr-8">
        {/* Search */}
        <div className="relative w-full sm:w-[216px] h-[38px]">
          <HiSearch
            size={22}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E7E7E]"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="
              w-full h-full pl-10 pr-4 rounded-lg bg-[#F9FBFF]
              text-xs placeholder:text-[#B5B7C0]
              focus:outline-none
            "
          />
        </div>

        {/* Sort */}
        <div className="relative w-[154px] h-[38px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none">
            Sort by:
          </span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="
              w-full h-full pl-[58px] rounded-lg bg-[#F9FBFF]
              text-xs font-semibold appearance-none
              focus:outline-none cursor-pointer
            "
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name A–Z</option>
          </select>

          <HiChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none"
            size={16}
          />
        </div>

        {/* Add */}
        <button
          onClick={onAdd}
          className="ml-4 bg-[#007BFF] text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}
