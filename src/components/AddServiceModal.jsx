import { useState, useEffect, useRef } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapToolbar from "./TiptapToolbar";
import Underline from "@tiptap/extension-underline";
import CloudImage from "./CloudImage";

export default function AddServiceModal({ onClose, onSave, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const [tags, setTags] = useState([]);
const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);      
  const [preview, setPreview] = useState(null);  
  const [removedImage, setRemovedImage] = useState([]);
  const [loading, setLoading] = useState(false);
  


 const fileInputRef = useRef(null);

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
  ],
  onUpdate: ({ editor }) => {
    setDescription(editor.getHTML());
  },
});



 useEffect(() => {
  document.body.style.overflow = "hidden";
    if (!initialData) return;

    setTitle(initialData.title || "");
    
setTags(
  initialData?.tag
    ? String(
        Array.isArray(initialData.tag)
          ? initialData.tag.join(",")
          : initialData.tag
      )
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
    : []
);


    setStatus(initialData.status || "active");


    if (editor && initialData.description) {
  editor.commands.setContent(initialData.description);
}

    if (initialData.image?.[0]) {
      setPreview(initialData.image[0]);
    }
  }, [initialData]);

 const handleTagKeyDown = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();

    const values = tagInput
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    if (!values.length) return;

    setTags(prev => [...new Set([...prev, ...values])]);
    setTagInput("");
  }
};
const addTagFromInput = () => {
  if (!tagInput.trim()) return;

  const values = tagInput
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  setTags(prev => [...new Set([...prev, ...values])]);
  setTagInput("");
};


const removeTag = (index) => {
  setTags(tags.filter((_, i) => i !== index));
};

  const handleSubmit = async () => {
    try {
      if (!String(title).trim())
        return toast.error("Title is required");
  if (!tags.length)
  return toast.error("At least one tag is required");

       if (!editor || editor.isEmpty)
  return toast.error("Description is required");
      if (!preview)
        return toast.error("Please upload an image");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
    formData.append("tag", tags.join(","));
      formData.append("status", status);

      removedImage.forEach((img) => {
        formData.append("removedImage[]", img);
      });

      if (image) {
        formData.append("image", image);
      }

      /* ADD */
      if (!initialData) {
        setLoading(true);
        await onSave(formData);
        toast.success("Service added successfully");
        return;
      }

      /* EDIT CONFIRMATION */
      toast(
        ({ closeToast }) => (
          <div>
            <p className="text-sm font-medium mb-2">
              Are you sure you want to edit this service?
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    await onSave(formData, initialData._id);
                    toast.success("Service updated successfully");
                  } catch (error) {
                    toast.error("Failed to update service");
                    console.error(error);
                  } finally {
                    setLoading(false);
                    closeToast();
                  }
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
    } catch (error) {
      toast.error("Failed to save service");
      console.error("Submit service error:", error);
    } finally {
      if (!initialData) {
        setLoading(false);
      }
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
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
  <div className="bg-white w-[720px] rounded-xl p-8 relative mt-10 max-h-[90vh] overflow-y-auto">
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
            <div>
              <label className="block text-sm text-[#666666] mb-1">
                Title
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            
        

          {/* Tag + Status */}
          <div className="grid grid-cols-2 gap-6">
           <div>
  <label className="block text-sm text-[#666666] mb-1">
    Tags
  </label>

  <div className="flex flex-wrap gap-2 border border-[#66666659]/75 rounded-lg px-3 py-2 min-h-[44px]">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="flex items-center gap-2 bg-[#F1F5FF] text-[#5932EA] px-3 py-1 rounded-full text-sm"
      >
        {tag}
        <button
          type="button"
          onClick={() => removeTag(index)}
          className="text-xs hover:text-red-500 cursor-pointer"
        >
          ✕
        </button>
      </span>
    ))}

  <input
  value={tagInput}
  onChange={(e) => setTagInput(e.target.value)}
  onKeyDown={handleTagKeyDown}
  onBlur={addTagFromInput}   
  className="flex-1 outline-none text-sm min-w-[120px] px-1"
/>


  </div>
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
          
            <div>
  <label className="block text-sm text-[#666666] mb-1">
    Description
  </label>

  <TiptapToolbar editor={editor} />

  <div className="border border-[#66666659]/75 rounded-lg px-4 py-3 min-h-[140px]">
    <EditorContent editor={editor} spellCheck={false} />
  </div>
</div>


<div>
            <label className="block text-sm text-[#666666] mb-2">
              Image
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                 {preview ? (
                  <div className="relative w-full h-full">
                    {preview.startsWith("blob:") ? (
                      <img
                        src={preview}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <CloudImage
                        publicId={preview}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
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
  disabled={loading}
  className={`px-5 py-2 rounded-lg text-white
    ${
      loading
        ? "bg-[#5932EA]/60 cursor-not-allowed"
        : "bg-[#5932EA] cursor-pointer hover:bg-[#4a28d9]"
    }`}
>
  {loading ? "Saving..." : "Save"}
</button>

          </div>
        </form>
      </div>
    </div>
  );
}







