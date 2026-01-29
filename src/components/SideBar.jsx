import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ChangePasswordPopup from "./ChangePasswordPopup";
import api from "../api/axios";
import { PiLadderDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { RiUserSettingsLine } from "react-icons/ri";

import {
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiChevronRight,
  HiChevronDown,
  HiMenuAlt2,
  HiX,
} from "react-icons/hi";

const menu = [
  { name: "Dashboard", path: "/", icon: HiOutlineViewGrid },
  { name: "Services", path: "/services", icon: HiOutlineCog },
  { name: "Faq", path: "/faq", icon: HiOutlineQuestionMarkCircle },
  { name: "Teams", path: "/team", icon: GoPeople },
  { name: "Career", path: "/career", icon: PiLadderDuotone },
  { name: "Settings", path: "/setting", icon:  RiUserSettingsLine  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false); 
  const [openSidebar, setOpenSidebar] = useState(false); 
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
   
      <button
        onClick={() => setOpenSidebar(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow cursor-pointer lg:hidden"
      >
        <HiMenuAlt2 size={22} />
      </button>

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-white px-6 py-8 flex flex-col
          transition-transform duration-300 z-50 
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
     
        <button
          onClick={() => setOpenSidebar(false)}
          className="absolute top-4 right-4 cursor-pointer lg:hidden"
        >
          <HiX size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-12">Dashboard</h1>

        <nav className="space-y-2">
          {menu.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                ${
                  isActive
                    ? "bg-[#5932EA] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {name}
              <HiChevronRight className="ml-auto" />
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-6 relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1766469284258-11bf4223e2af?w=600"
                className="w-10 h-10 rounded-full"
                alt="Admin"
              />
              <p className="text-xs text-gray-500">Admin</p>
            </div>

            <HiChevronDown
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </div>

          {open && (
            <div className="absolute bottom-12 left-0 w-full space-y-1">
               <button
              onClick={handleLogout}
              className="w-full flex gap-2 pl-11 py-2 cursor-pointer text-sm
                 text-red-700 bg-gray-100 hover:bg-gray-200"
            >
              Logout
            </button>
              <button
      onClick={() => setShowChangePassword(true)}
      className="absolute bottom-10 left-0 w-full 
                         flex gap-2 pl-11 py-2 cursor-pointer text-sm
                         text-grey-700 bg-gray-100 hover:bg-gray-200"
    >
      Change Password
    </button>  
           
            

    </div>        )}
        </div>
      </aside>
      
      {showChangePassword && (
  <ChangePasswordPopup
    onClose={() => setShowChangePassword(false)}
  />
)}

    </>
  );
}
