import { useState, useEffect} from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";
import Sidebar from "../components/SideBar";
import FaqTable  from "../components/FaqTable";
import AddFaqModal from "../components/AddFaqModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";
 
export default function Faq() {
 const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [editFaq, setEditFaq] = useState(null);

  /* FETCH */
  const fetchFaqs = async () => {
  try {
    const res = await api.get("/faqs");
    setFaqs(res.data.data);
  } catch (err) {
    if (err.response?.status === 401) {
      console.warn("Not authenticated");
    }
  }
};


  useEffect(() => {
    fetchFaqs();
  }, []);

  /* SAVE (ADD + EDIT) */
  const handleSave = async (payload, id) => {
    if (id) {
      await api.patch(`/faqs/${id}`, payload);
    } else {
      await api.post("/faqs", payload);
    }

    setShowModal(false);
    setEditFaq(null);
    fetchFaqs();
  };

  /* DELETE */
  const handleDelete = async (id) => {
    await api.delete(`/faqs/${id}`);
    fetchFaqs();
  };

  /* EDIT */
  const handleEdit = (item) => {
    setEditFaq(item);
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
                      title="FAQs"
                      search={search}
                      sort={sort}
                      onSearch={setSearch}
                      onSort={setSort}
                      onAdd={() => setShowModal(true)}
                    />

          {/* Table */}
          < div className="overflow-x-auto">
           <FaqTable
           data={faqs}
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
        <AddFaqModal
          initialData={editFaq}
          onClose={() => {
            setShowModal(false);
            setEditFaq(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}





