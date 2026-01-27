import { useState } from "react";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi"

export default function ChangePasswordModal({ admin, onClose, onSave }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await onSave(admin._id, {
        newPassword,
        confirmPassword,
      });

   
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[500px] rounded-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <HiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="space-y-6">
          
       <div>
         <div className="flex justify-between items-center">
            <label className="block text-sm text-[#666666] mb-1">
              New Password
          </label>
              <button
                                  type="button"
                               onClick={() => setShowNewPassword((p) => !p)}
                                  className="flex items-center gap-1 cursor-pointer text-sm text-gray-500"
                                >
                                  {showNewPassword? (
                                    <>
                                      <HiEyeOff size={16} />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <HiEye size={16} />
                                      Show
                                    </>
                                  )}
                                </button>
          </div>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
          />

          </div>

         <div>
             <div className="flex justify-between items-center">
            <label className="block text-sm text-[#666666] mb-1">
              Confirm New Password
          </label>
           <button
                                  type="button"
                               onClick={() => setShowConfirmPassword((p) => !p)}
                                  className="flex items-center gap-1 cursor-pointer text-sm text-gray-500"
                                >
                                  {showConfirmPassword? (
                                    <>
                                      <HiEyeOff size={16} />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <HiEye size={16} />
                                      Show
                                    </>
                                  )}
                                </button>
                                </div>
        <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
          />

          </div>
</div>
<div className="flex justify-center mt-7">
          <button
            onClick={handleSubmit}
            className=" bg-[#5932EA] text-white px-5 py-2 rounded-lg cursor-pointer"
          >
          Change Password </button>
        </div>
      </div>
    </div>
  );
}
