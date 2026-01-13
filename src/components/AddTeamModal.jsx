



import { useState, useEffect, useRef } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

export default function AddTeamModal({ onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removedImage, setRemovedImage] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!initialData) return;

    setName(initialData.name || "");
    setPosition(initialData.position || "");
    setDescription(initialData.description || "");
    setStatus(initialData.status || "active");

    if (initialData.image?.[0]) {
      setPreview(`${IMAGE_URL}/${initialData.image[0]}`);
    }
  }, [initialData]);

  /* Submit */
  const handleSubmit = async () => {
  if (!name.trim()) return alert("Name is required");
  if (!position.trim()) return alert("Position is required");
  if (!description.trim()) return alert("Description is required");
  if (!preview) return alert("Please upload an image");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("position", position);
  formData.append("description", description);

  removedImage.forEach((img) => {
    formData.append("removedImage[]", img);
  });

  if (image) {
    formData.append("image", image);
  }

  try {
    if (!initialData) {
      await onSave(formData); 
      toast.success("Team member added successfully");
      return;
    }

    toast(
      ({ closeToast }) => (
        <div>
          <p className="text-sm font-medium mb-2">
             Are you sure you want to update the Team Member?
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={async () => {
                await onSave(formData, initialData._id);
                toast.success("Team Member updated successfully");
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
      { autoClose: false, closeOnClick: false }
    );
  } catch (err) {
    toast.error("Failed to save team member");
    console.error(err);
  }
};

  /* Remove image */
  const handleRemoveImage = () => {
    if (initialData?.image?.[0] && removedImage.length === 0) {
      setRemovedImage([initialData.image[0]]);
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* Upload / Replace image */
  const handleImageUpload = (file) => {
    if (!file) return;

    if (initialData?.image?.[0] && removedImage.length === 0) {
      setRemovedImage([initialData.image[0]]);
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
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
          {initialData ? "Edit Team Member" : "Add Team Member"}
        </h2>

        <form className="space-y-6">
          {/* Name + Position */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
             <div>
              <label className="block text-sm mb-1">Position</label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            
          </div>

          {/* Tag + Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Description
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2 appearance-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm text-[#666666] mb-2">
              Image
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                {preview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={preview}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className=" cursor-pointer absolute -top-2 -right-2
           h-5 w-5
           flex items-center justify-center
           rounded-full
           bg-black
           text-white
           text-sm
           shadow-lg
           hover:bg-red-600
           transition
             "
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              <div className="w-[300px] h-[60px] bg-[#F8FCFF] rounded-md flex items-center gap-6 px-4">
                <label className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg cursor-pointer text-sm">
                  Choose File
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleImageUpload(e.target.files[0])
                    }
                  />
                </label>

                <span className="text-sm text-gray-400 truncate max-w-[120px]">
                  {image ? image.name : "No File Chosen"}
                </span>
              </div>
            </div>
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








