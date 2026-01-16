import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";



const PAGE_SIZE = 6;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

export default function TeamTable({
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
      item.name.toLowerCase().includes(safeSearch) ||
      item.position.toLowerCase().includes(safeSearch)
    );

  
    if (sort === "name") {
      rows = [...rows].sort((a, b) =>
        a.name.localeCompare(b.name)
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
            Are you sure you want to delete this Team Member?
          </p>
  
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                onDelete(id);
                toast.success("Team Member deleted");
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
    <div className="w-full mt-4">
      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
           < tr className="text-gray-400 border-b border-[#EEEEEE]">
              <th className="w-[22%] px-4 py-3 text-left">Team Member Name</th>
              <th className="w-[18%] px-4 py-3 text-left">Position</th>
              <th className="w-[35%] px-4 py-3 text-left">Description</th>
              <th className="w-[15%] px-4 py-3 text-left">Status</th>
              <th className="w-[10%] px-4 py-3 text-center">Action</th>
    </tr>
          </thead>
          

           <tbody>
            {paginatedData.map((item, i) => (
              <tr
                key={i}
                className="border-b border-[#EEEEEE] last:border-none"
              >

                <td className="py-4 px-5 font-medium break-words">
                  {item.name}
                </td>
               
               <td className="py-4 px-5 max-w-[180px] truncate overflow-hidden">
  {item.position}
</td>

<td className="py-4 px-5 max-w-[280px] line-clamp-2 overflow-hidden">
  {item.description}
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
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
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
    
    