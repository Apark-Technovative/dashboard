import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { login } from "../features/auth/auth.slice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((s) => s.auth);

  // Already logged in → redirect
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 w-[400px] shadow"
      >
        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#666666] mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-[#66666659]/75 p-3 rounded-xl focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          {/* Label + Hide/Show */}
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-[#666666]">
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1 text-sm text-gray-500"
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
            className="w-full border border-[#66666659]/75 p-3 rounded-xl focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mb-2 text-sm">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-[#007BFF] text-white py-3 rounded-xl cursor-pointer font-medium"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {/* FORGOT PASSWORD */}
        <p className="text-center mt-4 text-sm  cursor-pointer underline">
          Forget your password?
        </p>
      </form>
    </div>
  );
}
