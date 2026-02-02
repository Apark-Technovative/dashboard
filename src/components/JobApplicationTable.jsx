import {useState } from "react";
import {HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import JobApplicationViewModal from "./JobApplicationViewModal";


export default function JobApplicationTable({
 data = [],
 
  page,
  limit,
  total,
  onPageChange,
}) {
  const [selectedId, setSelectedId] = useState(null);

const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

 

  return (
     <div className="w-full mt-4">
  {/* TABLE */}
  <div className="w-full overflow-x-auto">
    <table className="w-full table-fixed text-sm">
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
        {data.map((item) => (
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

             {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No job applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
      <p>
          Showing {total === 0 ? 0 : start + 1} to{" "}
          {Math.min(start + limit, total)} of {total} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
               key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 rounded-md text-sm cursor-pointer
                ${page === i + 1 ? "bg-[#5932EA] text-white" : "border"} `}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages || totalPages === 0}
                onClick={() => onPageChange(page + 1)}
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
