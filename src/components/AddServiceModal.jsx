import { useState } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";

export default function AddServiceModal({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[720px] rounded-xl p-8 relative">
     
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <HiX size={20} />
        </button>

        <h2 className="text-lg mb-6">Add Service</h2>

        <form className="space-y-6">
        
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Title
              </label>
              <input className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Description
              </label>
              <input className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none" />
            </div>
          </div>

    
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Tag
              </label>
              <input className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Status
              </label>
              <div className="relative">
                <select className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2 appearance-none focus:outline-none">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <HiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
                  size={18}
                />
              </div>
            </div>
          </div>

 
          <div>
            <label className="block text-sm text-[#666666] mb-2">
              Image
            </label>

            <div className="flex items-center gap-4">
 
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
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


             <div className="w-[280px] h-[60px] bg-[#F8FCFF] rounded-md flex items-center gap-6 px-4">
  <label
    htmlFor="service-image"
    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg cursor-pointer text-sm"
  >
    Choose File
  </label>

  <input
    id="service-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
  />

  <span className="text-sm text-gray-400 truncate max-w-[120px]">
    {imageFile ? imageFile.name : "No File Chosen"}
  </span>
</div>

            </div>
          </div>


          <div className="flex justify-end pt-4">
            <button
              type="button"
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
