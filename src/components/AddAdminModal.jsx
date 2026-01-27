import { useState } from "react";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function AddAdminModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
const handleSubmit = async () => {
  if (loading) return; 

  try {
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true); 
    await onSave({ name, email, role, password, confirmPassword });
    toast.success("Admin created successfully");
    onClose();
  } catch (error) {
    toast.error("Failed to create admin");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[500px] rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <HiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Admin</h2>

        <div className="space-y-6">
            <div>
            <label className="block text-sm text-[#666666] mb-1">
                User Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
          />
          </div>
  <div>
            <label className="block text-sm text-[#666666] mb-1">
               Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
          />
          </div>

 <div>
            <label className="block text-sm text-[#666666] mb-1">
                Role
          </label>
            <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border  border-[#66666659]/75 rounded-lg px-4 py-2"
          >
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
            </div>

 <div>
                <div className="flex justify-between items-center">
            <label className="block text-sm text-[#666666] mb-1">
               Password
          </label>
           <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="flex items-center gap-1 cursor-pointer text-sm text-gray-500"
                      >
                        {showPassword ? (
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
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2"
/>

          </div>
          <div>
            <div className="flex justify-between items-center">
             <label className="block text-sm text-[#666666] mb-1">
               Confirm Password
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
  className="w-full border border-[#66666659]/75 rounded-lg px-4 py-2"
/>

           </div>
<div className="flex justify-center">
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
  {loading ? "Adding..." : "Add User"}
</button>
         </div>
        </div>
      </div>
    </div>
  );
}
