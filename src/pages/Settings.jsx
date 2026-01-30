import { useState, useEffect} from "react";
import TopSearch from "../components/TopSearch";
import SettingTable from "../components/SettingTable";
import AddAdminModal from "../components/AddAdminModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  

 const fetchAdmins = async () => {
  try {
    const res = await api.get("/getAllAdmin");
    setAdmins(res.data.data);
  } catch (error) {
    toast.error("Failed to fetch admin data");
    console.error(error);
  }
};

const fetchCurrentAdmin = async () => {
  try {
    const res = await api.get("/getAdmin");
    setCurrentUserRole(res.data?.data?.role);
  } catch (error) {
    console.error("Failed to fetch current admin");
  }
};



  useEffect(() => {
    fetchAdmins();
    fetchCurrentAdmin();
    document.title = "Settings | Admin Panel";
  }, []);

  /* ADD ADMIN */
  const handleAdd = async (data) => {
    try {
      await api.post("/register", data);
      toast.success("Admin created");
      setShowAddModal(false);
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to create admin");
      console.error(error);
    }
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
  };


  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">       <div className="flex justify-end  mb-[70px]">
      <div className="relative w-[260px] h-[40px]">
         <TopSearch onSearch={setSearch} />
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
          currentUserRole={currentUserRole} 
        />

      )}


   {editAdmin && (
         <ChangePasswordModal
          admin={editAdmin}
          onClose={() => setEditAdmin(null)}
          onSave={async (id, data) => {
            try {
              await api.post(`/changePassword/${id}`, data);
              toast.success("Password updated");
              setEditAdmin(null);
              fetchAdmins();
            } catch (error) {
              toast.error("Failed to update password");
              console.error(error);
            }
          }}
        />
      )}
    </div>
  );
}


