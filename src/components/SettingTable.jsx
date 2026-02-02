import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  HiTrash,
  HiPencil,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";



const PAGE_SIZE = 6;

export default function SettingTable({
   data = [],
  page,
  limit,
  total,
  onPageChange,
  onEdit,
}) {
  

const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

 
  return (
   <div className="w-full mt-4">
      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
         <thead>
  <tr className="text-gray-400 border-b border-[#EEEEEE]">
    <th className="lg:w-[30%] px-4 py-3 text-left">User Name</th>
    <th className="lg:w-[30%] px-4 py-3 text-left">Email</th>
    <th className="lg:w-[20%] px-4 py-3 text-left">Role</th>
    <th className="lg:w-[9%] px-4 py-3 text-center">Action</th>
  </tr>
</thead>
          <tbody>
             {data.map((item) => (
              <tr key={item._id}

                className="border-b border-[#EEEEEE] last:border-none"
              >
                <td className="py-4 px-5 font-medium break-words">
                  {item.name}
                </td>

                <td className="py-4 px-5">
                  {item.email}
                </td>

                <td className="px-5 py-4 break-words ">
                 {item.role}
                </td>

                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-4 text-lg">
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
                <td colSpan="6"
                  className="text-center py-6 text-gray-400"
                >
                No careers found
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
          Showing {total === 0 ? 0 : start + 1} to{" "}
          {Math.min(start + limit, total)} of {total} entries
        </p>
        {/* PAGINATION */}
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md border
                       cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 rounded-md text-sm cursor-pointer
                ${page === i + 1 ? "bg-[#5932EA] text-white" : "border"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
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

