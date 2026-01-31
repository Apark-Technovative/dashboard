

import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { fetchJobApplicationById } from "../api/jobApplication.api";
import { toast } from "react-toastify";
export default function JobApplicationViewModal({ id, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchJobApplicationById(id);
        setData(res.data.data);
      } catch {
        toast.error("Failed to load application");
        onClose();
      }
    };
    load();
  }, [id]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[520px] rounded-lg shadow-lg p-6 relative">
        <HiX
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"
        />

        <h2 className="text-lg font-semibold mb-6 text-center">Application Details </h2>
<div className="flex justify-center">
  
          <div className="w-full max-w-[420px] space-y-3 text-sm">
            {/* Info rows */}
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <span className="font-medium text-gray-500">Name</span>
              <span className="text-gray-800">{data.fullName}</span>

              <span className="font-medium text-gray-500">Email</span>
              <span className="text-gray-800">{data.email}</span>

              <span className="font-medium text-gray-500">Phone</span>
              <span className="text-gray-800">{data.phone}</span>

              <span className="font-medium text-gray-500">Address</span>
              <span className="text-gray-800">{data.address}</span>

              <span className="font-medium text-gray-500">Position</span>
              <span className="text-gray-800">{data.positionApplied}</span>

              <span className="font-medium text-gray-500">Applied On</span>
              <span className="text-gray-800">
                {new Date(data.appliedOn).toLocaleDateString()}
              </span>
            </div>

            {/* Cover letter */}
            <div className="pt-4 border-t">
              <p className="font-semibold text-gray-700 mb-1">
                Cover Letter
              </p>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {data.coverLetter}
              </p>
            </div>

            {/* Action */}
            <div className="pt-4 text-center">
              <a
                href={data.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 bg-[#5932EA] 
                           text-white rounded-md text-sm font-medium
                           hover:bg-[#4a28c9] transition"
              >
               Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}