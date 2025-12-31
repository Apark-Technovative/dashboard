


import { useState, useEffect } from "react";

import { HiX } from "react-icons/hi";

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
    if (!question.trim() || !answer.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

     await onSave(
      { question: question.trim(), answer: answer.trim() },
      initialData?._id
    );
    setLoading(false);
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
          {initialData ? "Edit Faq" : "Add Faq"}
        </h2>

        <form className="space-y-6">
          <div className="grid grid-rows-2 gap-6">
            <div>
              <label className="block text-sm text-[#666666] mb-1">Question</label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#666666] mb-1">
               Answer
              </label>
              <input
                className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2 focus:outline-none"
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
              className="bg-[#5932EA] text-white text-sm px-5 py-2 rounded-lg"
            >
             {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}









