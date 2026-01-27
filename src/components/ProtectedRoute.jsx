import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "./SideBar";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function getAdmin() {
    try {
      const response = await api.get("/getAdmin");
      if (response.status == 200) {
        navigate(pathname);
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

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />
     <Outlet />
    </div>
  );
}