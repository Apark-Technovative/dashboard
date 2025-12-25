import { useMemo, useState } from "react";
import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

/* CLEAN DATA (fixed keys) */
const DATA = [
  { title: "Jane Cooper", image: "Microsoft", description: "(225) 555-0118", status: "Active" },
  { title: "Floyd Miles", image: "Yahoo", description: "(205) 555-0100", status: "Inactive" },
  { title: "Kristin Watson", image: "Facebook", description: "(704) 555-0127", status: "Inactive" },
  { title: "Jacob Jones", image: "Google", description: "(208) 555-0112", status: "Active" },
  { title: "Ronald Richards", image: "Adobe", description: "(302) 555-0107", status: "Inactive" },
  { title: "Marvin McKinney", image: "Tesla", description: "(252) 555-0126", status: "Active" },
  { title: "Jerome Bell", image: "Google", description: "(629) 555-0129", status: "Active" },
  { title: "Kathryn Murphy", image: "Microsoft", description: "(406) 555-0120", status: "Active" },
];

const PAGE_SIZE = 6;

export default function ServiceTable({ search = "", sort = "newest" }) {
  const [page, setPage] = useState(1);

  /* FILTER + SORT (SAFE) */
  const filteredData = useMemo(() => {
    const safeSearch = (search || "").toLowerCase();

    let rows = DATA.filter((item) =>
      item.title.toLowerCase().includes(safeSearch)
    );

    if (sort === "name") {
      rows = [...rows].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "oldest") {
      rows = [...rows].reverse();
    }

    return rows;
  }, [search, sort]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-4">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="text-left py-3">Title</th>
              <th className="text-left py-3">Image</th>
              <th className="text-left py-3">Description</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, i) => (
              <tr key={i} className="border-b border-[#EEEEEE] last:border-none">
                <td className="py-4 font-medium">{item.title}</td>
                <td className="py-4">{item.image}</td>
                <td className="py-4">{item.description}</td>
                <td className="py-4">
                  <span
                    className={`w-16 h-6 flex items-center justify-center rounded-sm 
                      text-xs font-medium border
                      ${
                        item.status === "Active"
                          ? "bg-[#16C098]/[0.38] border-[#00B087] text-[#008767]"
                          : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 flex gap-4 text-lg">
                  <HiTrash className="text-red-500 cursor-pointer" />
                  <HiPencil className="text-gray-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Divider */}
      <div className="border-t border-[#EEEEEE] mt-4" />

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
        <p>
          Showing data {start + 1} to{" "}
          {Math.min(start + PAGE_SIZE, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>

        {/* PAGINATION */}
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-md text-sm cursor-pointer
                ${page === i + 1 ? "bg-[#5932EA] text-white" : "border"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
