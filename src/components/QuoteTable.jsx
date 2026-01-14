import { useMemo, useState, useEffect, useRef } from "react";
import {
  HiTrash,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { toast } from "react-toastify";

const PAGE_SIZE = 6;

const STATUS_OPTIONS = ["pending", "quoted", "confirmed", "completed"];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
  quoted: "bg-cyan-100 text-cyan-700 border-cyan-400",
  confirmed: "bg-green-100 text-green-700 border-green-400",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-400",
};

export default function QuoteTable({ data = [], search = "", onDelete }) {
  const [page, setPage] = useState(1);

  
  const [statuses, setStatuses] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const initial = {};
    data.forEach((item) => {
      initial[item._id] = item.status || "pending";
    });
    setStatuses(initial);
  }, [data]);

 
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((item) =>
      item.title?.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(start, start + PAGE_SIZE);

  const changeStatus = (id, status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
    setOpenDropdown(null);
  };
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
  <div className="w-full mt-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
        <thead>
  <tr className="text-gray-400 border-b border-[#EEEEEE]">
    <th className="w-[15%] px-4 py-3 text-left">Name</th>
    <th className="w-[15%] px-4 py-3 text-left">Phone</th>
    <th className="w-[15%] px-4 py-3 text-left">Service Type</th>
    <th className="w-[25%] px-4 py-3 text-left">Message</th>
   <th className="w-[15%] px-4 py-3 text-center">Status</th>
<th className="w-[15%] px-4 py-3 text-center">Action</th>

  </tr>
</thead>


          <tbody>
            {paginatedData.map((item) => {
              const currentStatus = statuses[item._id] || "pending";

              return (
                <tr
                  key={item._id}
                  className="border-b border-[#EEEEEE] last:border-none relative"
                >
                  <td className="py-4 px-5 font-medium">{item.title}</td>
                  <td className="py-4 px-5">{item.phone}</td>
                  <td className="py-4 px-5">
                    {item.type1} {item.type2 && ` / ${item.type2}`}
                  </td>
                  <td className="py-4 px-5 line-clamp-2">{item.message}</td>

                  {/* STATUS */}
                  <td className="py-4 px-5 relative  text-center">
                    <span
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item._id ? null : item._id
                        )
                      }
                      className={`px-3 py-1 rounded-md border text-xs font-semibold capitalize cursor-pointer inline-block ${
                        statusStyles[currentStatus]
                      }`}
                    >
                      {currentStatus}
                    </span>

                    {/* POPUP */}
                    {openDropdown === item._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-20 mt-2 w-36 bg-white border rounded-md shadow-lg"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <div
                            key={status}
                            onClick={() => changeStatus(item._id, status)}
                            className="px-4 py-2 text-sm capitalize cursor-pointer hover:bg-gray-100"
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-5  text-center">
                    <HiTrash
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition" />
                  </td>
                </tr>
              );
            })}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No Quotes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="border-t border-[#EEEEEE] mt-4 pt-3 flex justify-between items-center text-sm text-gray-400">
        <p>
          Showing {start + 1} to{" "}
          {Math.min(start + PAGE_SIZE, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-40"
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded ${
                page === i + 1
                  ? "bg-[#5932EA] text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-40"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
