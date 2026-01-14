import { useState, useEffect} from "react";
import Sidebar from "../components/SideBar";
import ServicesTable from "../components/ServicesTable";
import AddServiceModal from "../components/AddServiceModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Services() {
 const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);

  /* FETCH */
  const fetchServices = async () => {
    const res = await api.get("/getServices");
    setServices(res.data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* SAVE (ADD + EDIT) */
  const handleSave = async (formData, id) => {
    if (id) {
      await api.patch(`/services/${id}`, formData);
    } else {
      await api.post("/services", formData);
    }

    setShowModal(false);
    setEditService(null);
    fetchServices();
  };

  /* DELETE */
  const handleDelete = async (id) => {
    await api.delete(`/services/${id}`);
    fetchServices();
  };

  /* EDIT */
  const handleEdit = (item) => {
    setEditService(item);
    setShowModal(true);
  };

 


  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />

      <main className=" ml-64 flex-1 p-8 h-screen overflow-y-auto sm:p-12 ">
        {/* Top Search */}
        <TopSearch onSearch={setSearch} />


        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          {/* Header */}
          <SearchSort
            title="All Services"
            search={search}
            sort={sort}
            onSearch={setSearch}
            onSort={setSort}
            onAdd={() => setShowModal(true)}
          />


          {/* Table */}
          < div className="overflow-x-auto">
           <ServicesTable
           data={services}
            search={search}
            sort={sort}
            onDelete={handleDelete}
          onEdit={handleEdit}
          />
          </div>
        </div>
      </main>

      {/* Modal */}
     
      {showModal && (
        <AddServiceModal
          initialData={editService}
          onClose={() => {
            setShowModal(false);
            setEditService(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}



