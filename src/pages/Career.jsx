import { useState, useEffect} from "react";
import CareerTable from "../components/CareerTable";
import AddCareerModal from "../components/AddCareerModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Career() {
  const [careers, setCareers] = useState([]);
  const [total, setTotal] = useState(0);
 const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt"); 
  const [page, setPage] = useState(1);
  const limit = 6;

  const [showModal, setShowModal] = useState(false);
  const [editCareer, setEditCareer] = useState(null);;

  
   const fetchCareers = async () => {
    try {
      const res = await api.get("/career", {
         params: {
          keyword: search,
          sort,
          page,
          limit,
        },
      });
      setCareers(res.data.data);
      setTotal(res.data.count);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  useEffect(() => {
    fetchCareers();
      document.title = "Career | Admin Panel";
  }, [search, sort, page]);



  const handleSave = async (formData, id) => {
    try {
      if (id) {
        await api.patch(`/career/${id}`, formData);
      } else {
        await api.post("/career", formData);
      }
    } catch (error) {
      console.error("Error saving career:", error);
    } finally {
      setShowModal(false);
      setEditCareer(null);
      fetchCareers();
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/career/${id}`);
    } catch (error) {
      console.error("Error deleting career:", error);
    } finally {
      fetchCareers();
    }
  };

  const handleEdit = (item) => {
    setEditCareer(item);
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
            title="Careers"
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
          <div className="overflow-x-auto">
            <CareerTable 
                          data={careers}
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
        <AddCareerModal
          initialData={editCareer}
          onClose={() => {
            setShowModal(false);
            setEditCareer(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}



