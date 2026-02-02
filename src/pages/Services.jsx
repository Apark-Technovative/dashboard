import { useState, useEffect} from "react";
import ServicesTable from "../components/ServicesTable";
import AddServiceModal from "../components/AddServiceModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Services() {
 const [services, setServices] = useState([]);
 const [total, setTotal] = useState(0);
 const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt"); 
  const [page, setPage] = useState(1);
  const limit = 6;
  
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get("/getServices", {
         params: {
          keyword: search,
          sort,
          page,
          limit,
        },
      });
      setServices(res.data.data);
         setTotal(res.data.count);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    document.title = "Services | Admin Panel";
  }, [search, sort, page]);
  const handleSave = async (formData, id) => {
    try {
      if (id) {
        await api.patch(`/services/${id}`, formData);
      } else {
        await api.post("/services", formData);
      } 
    } catch (error) {
      console.error("Save service failed:", error);
      throw error; 
    } finally {
      setShowModal(false);
      setEditService(null);
      fetchServices();
    }
  };

 const handleDelete = async (id) => {
  try {
    await api.delete(`/services/${id}`);
  } catch (error) {
    console.error("Delete service failed:", error);
    throw error;
  } finally {
    fetchServices();
  }
};


  const handleEdit = (item) => {
    setEditService(item);
    setShowModal(true);
  };
  
  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      

      <main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">

<TopSearch
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <SearchSort
 title="All Services"
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
                name: "question",
              };
          
              setSort(sortMap[value]); 
            }}
            onAdd={() => setShowModal(true)}
          />
        
          < div className="overflow-x-auto">
           <ServicesTable
          data={services}
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
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



