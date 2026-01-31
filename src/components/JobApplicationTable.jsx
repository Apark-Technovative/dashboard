import { useMemo, useState } from "react";
import {HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import JobApplicationViewModal from "./JobApplicationViewModal";

const PAGE_SIZE = 6;

export default function JobApplicationTable({
  data = [],
  search = "",
  loading = false,
}) {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (item) =>
        item.fullName.toLowerCase().includes(q) ||
        item.positionApplied.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(start, start + PAGE_SIZE);

  if (loading) {
    return (
      <p className="text-center py-8 text-gray-400">
        Loading applications...
      </p>
    );
  }

  return (
     <div className="w-full mt-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead> 
            <tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="w-[20%] px-4 py-3 text-left">Full Name</th>
              <th className="w-[20%] px-4 py-3 text-left">Position</th>
              <th className="w-[20%] px-4 py-3 text-left">Email</th>
              <th className="w-[20%] px-4 py-3 text-left">Applied On</th>
              <th className="w-[9%] px-4 py-3 text-center">View</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr key={item._id} className="border-b last:border-none">
                <td className="px-4 py-5 font-medium">
                  {item.fullName}
                </td>
                <td className="px-4 py-5">
                  {item.positionApplied}
                </td>
                <td className="px-4 py-5">
                  {item.email}
                </td>
                <td className="px-4 py-5">
                  {new Date(item.appliedOn).toLocaleDateString()}
                </td>
                <td className="px-11 py-5 text-center">
                  <CiPlay1
                    onClick={() => setSelectedId(item._id)}
                    className="text-lg cursor-pointer hover:scale-110 transition"
                  />
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No job applications found
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

      {selectedId && (
        <JobApplicationViewModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
