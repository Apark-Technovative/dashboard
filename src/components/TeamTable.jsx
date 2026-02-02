import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export default function TeamTable({
 data = [],
  page,
  limit,
  total,
  onPageChange,
  onDelete,
  onEdit,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [deleting, setDeleting] = useState(false);
  
const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

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
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
           < tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="lg:w-[30%] px-4 py-3 text-left">Team Member Name</th>
              <th className="lg:w-[30%] px-4 py-3 text-left">Position</th>
              <th className="lg:w-[20%] px-4 py-3 text-left">Status</th>
              <th className="lg:w-[9%] px-4 py-3 text-center">Action</th>
    </tr>
          </thead>
          

           <tbody>
           {data.map((item) => (
              <tr
                key={item._id}
                className="border-b border-[#EEEEEE] last:border-none"
              >

                <td className="py-4 px-5 font-medium break-words">
                  {item.name}
                </td>
               
               <td className="py-4 px-5 max-w-[180px] truncate overflow-hidden">
  {item.position}
</td>
                <td className="py-4 px-2">
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
             <td className="px-4 py-4 text-center">
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
              {data.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400"
                >
                  No team members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
          <div className="border-t border-[#EEEEEE] mt-4" />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
           <p>
          Showing {total === 0 ? 0 : start + 1} to{" "}
          {Math.min(start + limit, total)} of {total} entries
        </p>
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
    
    









