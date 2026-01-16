import { useState, useEffect, useRef } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

export default function AddCareerModal({ onClose, onSave, initialData }) {
   const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
   const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  /* Populate edit data */
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setPosition(initialData.position || "");
    setExperienceRequired(initialData.experienceRequired || "");
     setDescription(initialData.description || "");
    setDeadline(initialData.deadline || "");
  }, [initialData]);

   const handleSubmit = () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!position.trim()) return toast.error("Position is required");
    if (!experienceRequired.trim())
      return toast.error("Experience is required");
     if (!description.trim())
      return toast.error("Description is required");
    if (!deadline.trim()) return toast.error("Deadline is required");

    const payload = {
      title,
      position,
      experienceRequired,
      description,
      deadline,
    };

    if (!initialData) {
      onSave(payload);
      toast.success("Career added successfully");
      return;
    }

  
    toast(
      ({ closeToast }) => (
        <div>
          <p className="text-sm font-medium mb-2">
             Are you sure you want to update this career?
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
               onSave(payload, initialData._id);
                toast.success("Career updated successfully");
                closeToast();
              }}
              className="px-3 py-1 text-sm bg-[#5932EA] text-white rounded cursor-pointer"
            >
              Yes
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[720px] rounded-xl p-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <HiX size={20} />
        </button>

       <h2 className="text-lg mb-6">
          {initialData ? "Edit Career" : "Add Career"}
        </h2>

        <form className="space-y-6">
          {/* Title */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Title
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                 Position
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

           {/* Experience + Deadline */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
               Experience Required
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={experienceRequired}
                onChange={(e) =>  setExperienceRequired(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Deadline
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

           {/* Description */}
           <div>
              <label className="block text-sm text-[#666666] mb-1">
                Deadline
              </label>
          <textarea
            rows={4}
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full resize-none"
          />
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#5932EA] text-white px-5 py-2 rounded-lg cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}







