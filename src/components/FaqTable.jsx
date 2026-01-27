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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [deleting, setDeleting] = useState(false);

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

  
  const confirmDelete = async () => {
  try {
    setDeleting(true);
    await onDelete(selectedId);
    toast.success("Service deleted successfully");
  } catch {
    toast.error("Failed to delete service");
  } finally {
    setDeleting(false);
    setShowDeleteModal(false);
    setSelectedId(null);
  }
};
  

  return (
    <div className="w-full mt-4">
  {/* TABLE */}
  <div className="w-full overflow-x-auto">
    <table className="w-full table-fixed text-sm">
      <thead>
        <tr className="text-gray-400 border-b border-[#EEEEEE]">
          <th className="lg:w-[40%] px-4 py-3 text-left">Question</th>
          <th className="lg:w-[40%] px-4 py-3 text-left">Answer</th>
          <th className="lg:w-[9%] px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {paginatedData.map((item) => (
          <tr
            key={item._id}
            className="border-b border-[#EEEEEE] last:border-none"
          >
            <td className="py-4 px-5 font-medium break-words">
              {item.question}
            </td>

           <td className="py-4 px-5 break-words line-clamp-3 sm:line-clamp-2">
              {item.answer}
            </td>

            <td className="py-4 px-5 text-center">
              <div className="flex justify-center gap-4 text-lg">
                <HiTrash
                   onClick={() => {
    setSelectedId(item._id);
    setShowDeleteModal(true);
  }}
                      className="text-red-500  cursor-pointer hover:scale-110 transition"
                />
                <HiPencil
                  onClick={() => onEdit(item)}
                  className="text-gray-600 cursor-pointer hover:scale-110 transition"
                />
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
      {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-[360px] rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Delete Service
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Are you sure you want to delete this service? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedId(null);
          }}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          Cancel
        </button>

       <button
  disabled={deleting}
  onClick={confirmDelete}
  className="px-4 py-2 text-sm bg-red-600 text-white rounded 
             hover:bg-red-700 disabled:opacity-50 cursor-pointer"
>
  {deleting ? "Deleting..." : "Delete"}
</button>


      </div>
    </div>
  </div>
)}
    </div>
  );
}
