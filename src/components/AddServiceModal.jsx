import { useState, useEffect, useRef } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";

const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

export default function AddServiceModal({ onClose, onSave, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("active");

  const [image, setImage] = useState(null);      
  const [preview, setPreview] = useState(null);  
  const [removedImage, setRemovedImage] = useState([]);

  const fileInputRef = useRef(null);

  /* Populate edit data */
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setDescription(initialData.description || "");

    // normalize tag safely
    setTag(
      typeof initialData.tag === "string"
        ? initialData.tag
        : Array.isArray(initialData.tag)
        ? initialData.tag.join(", ")
        : ""
    );

    setStatus(initialData.status || "active");

    if (initialData.image?.[0]) {
      setPreview(`${IMAGE_URL}/${initialData.image[0]}`);
    }
  }, [initialData]);

  /* Submit */
  const handleSubmit = () => {
    if (!String(title).trim()) return alert("Title is required");
    if (!String(description).trim()) return alert("Description is required");
    if (!String(tag).trim()) return alert("Tag is required");

    // single source of truth
    if (!preview) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("status", status);

    removedImage.forEach((img) => {
      formData.append("removedImage[]", img);
    });

    if (image) {
      formData.append("image", image);
    }

    onSave(formData, initialData?._id);
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
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

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
          </div>

          {/* Tag + Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Tag
              </label>
              <input
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
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
                  className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2 appearance-none"
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







