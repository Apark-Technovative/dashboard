import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const PAGE_SIZE = 6;

export default function FaqTable({
  data = [],
  search = "",
  sort = "newest",
  onDelete,
  onEdit,
}) {
  const [page, setPage] = useState(1);

  /* RESET PAGE ON SEARCH / SORT */
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  /* FILTER + SORT */
  const filteredData = useMemo(() => {
    const safeSearch = (search || "").toLowerCase();

    let rows = data.filter((item) =>
      item?.question?.toLowerCase().includes(safeSearch)
    );

    if (sort === "name") {
      rows = [...rows].sort((a, b) =>
        a.question.localeCompare(b.question)
      );
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

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="text-sm font-medium mb-2">
            Are you sure you want to delete this service?
          </p>
  
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                onDelete(id);
                toast.success("Service deleted");
                closeToast();
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded cursor-pointer"
            >
              Delete
            </button>
  
            <button
              onClick={closeToast}
              className="px-3 py-1 text-sm bg-gray-300 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };
  

  return (
    <div className="mt-4">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="text-left py-3 px-4 w-[25%]">Question</th>
              <th className="text-left py-3 px-4 w-[25%]">Answer</th>
              <th className="text-left py-3 px-4 w-[10%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-[#EEEEEE] last:border-none"
              >
                <td className="py-3 px-5 font-medium break-words">
                  {item.question}
                </td>

                <td className="py-3 px-5">
                  <p className="line-clamp-2 break-words">
                    {item.answer}
                  </p>
                </td>

                <td className="py-3 px-5">
                  <div className="flex gap-4 text-lg">
                 <HiTrash
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                    />
                    
                  <HiPencil   onClick={() => onEdit(item) } 
                  className="text-gray-600 cursor-pointer hover:scale-110 transition" />
                  
                  </div>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-400"
                >
                  No FAQs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <p>
          Showing {filteredData.length === 0 ? 0 : start + 1} to{" "}
          {Math.min(start + PAGE_SIZE, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>

        {/* PAGINATION */}
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-md text-sm cursor-pointer
                ${page === i + 1 ? "bg-[#5932EA] text-white" : "border"} `}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
