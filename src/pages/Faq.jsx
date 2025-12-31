import { useState, useEffect} from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";
import Sidebar from "../components/SideBar";
import FaqTable  from "../components/FaqTable";
import AddFaqModal from "../components/AddFaqModal";
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

      <main className=" ml-64 flex-1 p-8 h-screen overflow-y-auto sm:p- ">
        {/* Top Search */}
        <div className="flex justify-end mr-36 mb-[70px]">
          <div className="relative w-[216px] h-[38px]  ">
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

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            <h2 className="text-xl font-semibold">FAQS</h2>

            <div className="flex flex-wrap items-center gap-2 mt-2 mr-30">
              {/* Search */}
              <div className="relative w-full sm:w-[216px] h-[38px]">
                <HiSearch size={22} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E7E7E]" />
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full h-full pl-10 pr-4 rounded-lg bg-[#F9FBFF]
                    text-xs placeholder:text-[#B5B7C0]
                    focus:outline-none
                  "
                />
              </div>

              {/* Sort */}
              <div className="relative w-[154px] h-[38px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 pointer-events-none">
                  Sort by:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="
                    w-full h-full pl-[58px] rounded-lg bg-[#F9FBFF]
                    text-xs font-semibold appearance-none
                    focus:outline-none
                  "
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name">Name A–Z</option>
                </select>
                <HiChevronDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none"
                  size={16}
                />
              </div>

              {/* Add */}
                <div className="ml-10">
               <button
              onClick={() => {
                  setEditFaq(null); 
                  setShowModal(true);
                }}
              className="bg-[#007BFF] text-white px-5 py-2 rounded-lg"
            >
              Add
            </button>
            </div>
            </div>
          </div>

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





