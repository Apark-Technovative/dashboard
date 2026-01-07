import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { BsChatQuote } from "react-icons/bs";
import {
  HiOutlineViewGrid,
  HiOutlineCog,
 HiOutlineQuestionMarkCircle,
  HiOutlineSpeakerphone,
  HiUserGroup,
  HiChevronRight,
  HiChevronDown,
} from "react-icons/hi";
const menu = [
  { name: "Dashboard", path: "/", icon: HiOutlineViewGrid },
  { name: "Services", path: "/services", icon: HiOutlineCog },
  { name: "Faq", path: "/faq", icon:  HiOutlineQuestionMarkCircle },
  { name: "Promote", path: "/promote", icon: HiOutlineSpeakerphone },
  { name: "Teams", path: "/team", icon: HiUserGroup },
  { name: "Quotes", path: "/quotes", icon: BsChatQuote  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await api.post("/logout"); // clears httpOnly cookie
    navigate("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    // <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col">
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white px-6 py-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-12">Dashboard</h1>

      <nav className="space-y-2">
        {menu.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
              ${isActive ? "bg-[#5932EA] text-white" : "text-gray-500"}`
            }
          >
            <Icon size={18} />
            {name}
            <HiChevronRight className="ml-auto" />
          </NavLink>
        ))}
      </nav>

      {/* USER DROPDOWN */}
      <div className="mt-auto pt-6 relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1766469284258-11bf4223e2af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D"
              className="w-10 h-10 rounded-full"
            />
            <div>
              {/* <p className="text-sm font-semibold">Admin Name</p> */}
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          <HiChevronDown
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </div>

        {open && (
          <button
            onClick={handleLogout}
            className="absolute bottom-14 left-0 w-full 
                       flex  gap-2 pl-11 py-2
                       text-red-700 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
