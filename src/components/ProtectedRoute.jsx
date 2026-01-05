import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "./SideBar";

export default function ProtectedRoute({ children }) {
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

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />
      {children}
    </div>
  );
}