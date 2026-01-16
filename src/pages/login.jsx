import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  async function getAdmin() {
    try {
      const response = await api.get("/getAdmin");
      if (response.status == 200) {
        navigate("/");
      } else {
        navigate("/login");
      }
      console.log(response.status);
    } catch (error) {
      navigate("/login");
    }
  }
  useEffect(() => {
    getAdmin();
  }, []);

useEffect(() => {
    document.title = "Login | Admin Panel";
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 w-[400px] shadow">
        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#666666] mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-[#66666659]/75 p-3 rounded-xl focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-[#666666]">
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ERROR */}
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#007BFF] text-white py-3 rounded-xl cursor-pointer font-medium"
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <p className="text-center mt-4 text-sm cursor-pointer underline">
          Forget your password?
        </p>
      </form>
    </div>
  );
}