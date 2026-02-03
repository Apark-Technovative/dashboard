import { useState, useEffect} from "react";
import SettingTable from "../components/SettingTable";
import AddAdminModal from "../components/AddAdminModal";
import SearchSort from "../components/SearchSort";
import ChangePasswordModal from "../components/ChangePasswordModal";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
 const [total, setTotal] = useState(0);
 const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt"); 
  const [page, setPage] = useState(1);
  const limit = 20;

  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  

 const fetchAdmins = async () => {
  try {
    const res = await api.get("/getAllAdmin", {
         params: {
          keyword: search,
          sort,
          page,
          limit,
        },
      });
    setAdmins(res.data.data);
        setTotal(res.data.count);

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
    document.title = "Settings | Admin Panel";
  }, [search, sort, page]);

useEffect(() => {
  fetchCurrentAdmin();
}, []);

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
">      

        
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
         
           <SearchSort
            title="Settings"
            search={search}
          sort={
              sort === "-createdAt"
                ? "newest"
                : sort === "createdAt"
                ? "oldest"
                : "name"
            }  onSearch={(value) => {
              setPage(1);
              setSearch(value);
            }}
            onSort={(value) => {
              setPage(1);
          
              const sortMap = {
                newest: "-createdAt",
                oldest: "createdAt",
                name: "name",
              };
          
              setSort(sortMap[value]); 
            }}
            onAdd={() => setShowAddModal(true)}
          />
          
          < div className="overflow-x-auto">
           <SettingTable
            data={admins}
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
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


