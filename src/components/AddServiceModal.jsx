import { useState, useEffect } from "react";

import { HiX, HiChevronDown } from "react-icons/hi";

export default function AddServiceModal({ onClose, onSave, initialData , isEdit }) {
 const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

    useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setTag(initialData.tag);
      setStatus(initialData.status);
      if (initialData.image?.[0]) {
        setPreview(
         `http://localhost:4000/uploads/${initialData.image[0]}`
        );
      }
    }
  }, [initialData]);

const handleSubmit = () => {
  if (!image && !initialData) {
    alert("Please upload an image");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("tag", tag);
  formData.append("status", status);

  if (image) {
    formData.append("image", image);
  }

  onSave(formData, initialData?._id);
};



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[720px] rounded-xl p-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <HiX size={20} />
        </button>

       
          <h2 className="text-lg mb-6">
          {initialData ? "Edit Service" : "Add Service"}
        </h2>
      

        <form className="space-y-6">
          {/* Title + Description */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Title
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Description
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Tag + Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Tag
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 appearance-none focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <HiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm text-[#666666] mb-2">
              Image
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    No Image
                  </span>
                )}
              </div>

              <label className="cursor-pointer border px-4 py-2 rounded-lg text-blue-500 text-sm">
              
                 <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
              </label>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end pt-4">
           <button type="button" onClick={handleSubmit}
              className="bg-[#5932EA] text-white text-sm px-5 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
