import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { fetchJobApplicationById } from "../api/jobApplication.api";
import { toast } from "react-toastify";

const FILE_URL = import.meta.env.VITE_API_IMAGE_URL;

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
          className="absolute top-4 right-4 cursor-pointer"
        />

        <h2 className="text-lg font-semibold mb-4">
          Application Details
        </h2>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {data.fullName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Address:</strong> {data.address}</p>
          <p><strong>Position:</strong> {data.positionApplied}</p>
          <p><strong>Applied On:</strong> {new Date(data.appliedOn).toLocaleString()}</p>

          <div className="pt-3">
            <p className="font-semibold">Cover Letter</p>
            <p className="text-gray-600 whitespace-pre-line">
              {data.coverLetter}
            </p>
          </div>

          <a
            href={`${FILE_URL}/media/${data.resume}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-[#5932EA] text-white rounded text-sm"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
