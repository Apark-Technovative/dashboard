import { useState, useEffect} from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";
import Sidebar from "../components/SideBar";
import SettingTable from "../components/SettingTable";
import AddAdminModal from "../components/AddAdminModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  const fetchAdmins = async () => {
    const res = await api.get("/getAdmin");
    setAdmins([res.data.data]);
  };

  useEffect(() => {
    fetchAdmins();
    document.title = "Settings | Admin Panel";
  }, []);

  const handleAdd = async (data) => {
    await api.post("/register", data);
    toast.success("Admin created");
    setShowAddModal(false);
    fetchAdmins();
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
  };


  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />

<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">       <div className="flex justify-end  mb-[70px]">
      <div className="relative w-[260px] h-[40px]">
        <HiSearch
          size={22}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E7E7E]"
        />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
             className="
            w-full h-full pl-10 pr-4 rounded-xl bg-white
            text-sm
            placeholder:text-[#B5B7C0]
            placeholder:text-[14px]
            shadow-[0_6px_12px_rgba(226,236,249,0.5)]
            focus:outline-none focus:ring-2 focus:ring-[#007BFF]
          "
            />
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            <h2 className="text-xl font-semibold">Settings</h2>
                <div className=" mt-2 mr-8">
               <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#007BFF] text-white px-5 py-2 rounded-lg cursor-pointer"
            >
              Add User
            </button>
            </div>
          </div>

          {/* Table */}
          < div className="overflow-x-auto">
           <SettingTable
            data={admins}
            search={search}
            onEdit={handleEdit}
          />
          </div>
        </div>
      </main>

     {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

   {editAdmin && (
        <ChangePasswordModal
          admin={editAdmin}
          onClose={() => setEditAdmin(null)}
          onSave={async (id, data) => {
            await api.post(`/changePassword/${id}`, data);
            toast.success("Password updated");
            setEditAdmin(null);
            fetchAdmins();
          }}
        />
      )}
    </div>
  );
}


