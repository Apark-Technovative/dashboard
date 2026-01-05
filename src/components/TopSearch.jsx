import { useState } from "react";
import { HiSearch } from "react-icons/hi";

export default function TopSearch({ onSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-end mr-36 mb-[70px]">
      <div className="relative w-[216px] h-[38px]">
        <HiSearch
          size={22}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E7E7E]"
        />

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="
            w-full h-full pl-10 pr-4 rounded-xl bg-white
            text-sm
            placeholder:text-[#B5B7C0]
            placeholder:text-[14px]
            shadow-[0_6px_12px_rgba(226,236,249,0.5)]
            focus:outline-none focus:ring-2 focus:ring-[#007BFF]
          "
        />
      </div>
    </div>
  );
}
