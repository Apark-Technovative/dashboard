


import { useState, useEffect } from "react";

import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";
export default function AddFaqModal({ onClose, onSave, initialData, isEdit }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || "");
      setAnswer(initialData.answer || "");
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      if (!question.trim() || !answer.trim()) {
        toast.error("Please fill all fields");
        return;
      }

      const payload = {
        question: question.trim(),
        answer: answer.trim(),
      };

      /* ADD */
      if (!initialData) {
        setLoading(true);
        await onSave(payload);
        toast.success("FAQ added successfully");
        return;
      }

      /* EDIT CONFIRMATION */
      toast(
        ({ closeToast }) => (
          <div>
            <p className="text-sm font-medium mb-3">
              Are you sure you want to edit this FAQ?
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    await onSave(payload, initialData._id);
                    toast.success("FAQ updated successfully");
                  } catch (error) {
                    toast.error("Failed to update FAQ");
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
      toast.error("Something went wrong");
      console.error("Submit FAQ error:", error);
    } finally {
      if (!initialData) {
        setLoading(false);
      }
    }
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
          {initialData ? "Edit Faq" : "Add Faq"}
        </h2>

        <form className="space-y-6">
          <div className="grid grid-rows-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">Question</label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 "
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
               Answer
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 "
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#5932EA] text-white text-sm px-5 py-2 rounded-lg cursor-pointer"
            >
             {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}









