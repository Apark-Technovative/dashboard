import { useState, useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapToolbar from "./TiptapToolbar";
import Underline from "@tiptap/extension-underline";
import { toast } from "react-toastify";

export default function AddCareerModal({ onClose, onSave, initialData }) {
   const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
   const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
    const [loading, setLoading] = useState(false);
    

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
      ],
      onUpdate: ({ editor }) => {
        setDescription(editor.getHTML());
      },
    });
    

  /* Populate edit data */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (!initialData) return;

    setTitle(initialData.title || "");
    setPosition(initialData.position || "");
    setExperienceRequired(initialData.experienceRequired || "");
 if (editor && initialData.description) {
  editor.commands.setContent(initialData.description);
}

    setDeadline(initialData.deadline || "");
  }, [initialData]);

     const handleSubmit = async () => {
    try {
      if (!title.trim()) return toast.error("Title is required");
      if (!position.trim()) return toast.error("Position is required");
      if (!experienceRequired.trim())
        return toast.error("Experience is required");
      if (!editor || editor.isEmpty)
  return toast.error("Description is required");
      if (!deadline.trim()) return toast.error("Deadline is required");

      const payload = {
        title,
        position,
        experienceRequired,
        description,
        deadline,
      };

      /* ADD */
      if (!initialData) {
         setLoading(true);
        await onSave(payload);
        toast.success("Career added successfully");
        return;
      }

      /* EDIT CONFIRMATION */
      toast(
        ({ closeToast }) => (
          <div>
            <p className="text-sm font-medium mb-2">
              Are you sure you want to update this career?
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={async () => {
                  try {
                     setLoading(true);
                    await onSave(payload, initialData._id);
                    toast.success("Career updated successfully");
                  } catch (error) {
                    toast.error("Failed to update career");
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
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
    } catch (error) {
      console.error("Error submitting career:", error);
      toast.error("Something went wrong");
    } finally {
     
    }
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
              type="date"
                className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
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