import { useMemo, useState } from "react";
import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const PAGE_SIZE = 6;

export default function ServiceTable({
  data = [],
  search = "",
  sort = "newest",
  onDelete,
  onEdit,
}) {
  const [page, setPage] = useState(1);

  /* FILTER + SORT (SAFE) */
  const filteredData = useMemo(() => {
    const safeSearch = (search || "").toLowerCase();

    let rows = data.filter((item) =>
      item.title.toLowerCase().includes(safeSearch)
    );

    if (sort === "name") {
      rows = [...rows].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "oldest") {
      rows = [...rows].reverse();
    }

    return rows;
  }, [data, search, sort]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-4">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="text-left py-3 px-4 w-[20%]">Title</th>
              <th className="text-left py-3 px-4 w-[10%]">Image</th>
              <th className="text-left py-3 px-4 w-[30%]">Description</th>
              <th className="text-left py-3 px-4 w-[15%]">Status</th>
              <th className="text-left py-3 px-4 w-[15%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, i) => (
              <tr
                key={i}
                className="border-b border-[#EEEEEE] last:border-none"
              >
                <td className="py-4 px-4 font-medium break-words">
                  {item.title}
                </td>
                <td className="py-4 px-4">
                  {" "}
                  {item.image?.[0] && (
                    <img
                      src={`http://localhost:4000/media/${item.image[0]}`}
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                </td>

                <td className="py-4 px-4 line-clamp-2 break-words">
                  {item.description}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`w-18 h-8 flex items-center justify-center rounded-sm 
    text-sm border font-semibold
    ${
      item.status === "active"
        ? "bg-[#16C098]/[0.38] border-[#00B087] text-[#008767]"
        : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"
    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <td className="flex gap-4 text-lg">
                    <HiTrash
                      onClick={() => onDelete(item._id)}
                      className="text-red-500 cursor-pointer"
                    />
                    <HiPencil
                      onClick={() => onEdit(item)}
                      className="text-gray-600 cursor-pointer"
                    />
                  </td>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No services found
                </td>
              </tr>
            )}
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
