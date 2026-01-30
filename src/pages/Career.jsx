import { useState, useEffect} from "react";
import CareerTable from "../components/CareerTable";
import AddCareerModal from "../components/AddCareerModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Career() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [editCareer, setEditCareer] = useState(null);;

  /* FETCH */
   const fetchCareers = async () => {
    try {
      const res = await api.get("/career");
      setCareers(res.data.data);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  useEffect(() => {
    fetchCareers();
      document.title = "Career | Admin Panel";
  }, []);



  /* SAVE (ADD + EDIT) */
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

  /* DELETE */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/career/${id}`);
    } catch (error) {
      console.error("Error deleting career:", error);
    } finally {
      fetchCareers();
    }
  };

  /* EDIT */
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
       


        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          {/* Header */}
          <SearchSort
            title="Careers"
            search={search}
            sort={sort}
            onSearch={setSearch}
            onSort={setSort}
            onAdd={() => setShowModal(true)}
          />


          {/* Table */}
          <div className="overflow-x-auto">
            <CareerTable
              data={careers}
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



