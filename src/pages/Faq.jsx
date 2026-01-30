import { useState, useEffect} from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";

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

 const fetchFaqs = async () => {
    try {
      const res = await api.get("/faqs");
      setFaqs(res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Not authenticated");
      } else {
        console.error("Error fetching FAQs:", error);
      }
    }
  };

  useEffect(() => {
    fetchFaqs();
    document.title = "Faq | Admin Panel";
  }, []);

  const handleSave = async (payload, id) => {
    try {
      if (id) {
        await api.patch(`/faqs/${id}`, payload);
      } else {
        await api.post("/faqs", payload);
      }
    } catch (error) {
      console.error("Save FAQ failed:", error);
      throw error; 
    } finally {
      setShowModal(false);
      setEditFaq(null);
      fetchFaqs();
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/faqs/${id}`);
    } catch (error) {
      console.error("Delete FAQ failed:", error);
    } finally {
      fetchFaqs();
    }
  };

 
  const handleEdit = (item) => {
    setEditFaq(item);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">    
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">

           <TopSearch onSearch={setSearch} />

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
           <SearchSort
                      title="FAQs"
                      search={search}
                      sort={sort}
                      onSearch={setSearch}
                      onSort={setSort}
                      onAdd={() => setShowModal(true)}
                    />

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





