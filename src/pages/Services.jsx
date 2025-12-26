
import { useState } from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";
import Sidebar from "../components/SideBar";
import ServiceTable from "../components/ServiceTable";
import AddServiceModal from "../components/AddServiceModal";

export default function Services() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />

      <main className="flex-1 p-8">
 
        <div className="flex justify-end mr-[52px] mb-[70px]">
          <div className="relative w-[216px] h-[38px]">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
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

        <div className="bg-white rounded-2xl shadow-sm mr-[52px] ml-8 p-6">
    
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">All Services</h2>

            <div className="flex items-center mt-2 mr-24">
              
              <div className="flex items-center gap-2">
               
                <div className="relative w-[216px] h-[38px]">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="
                      w-full h-full pl-10 pr-4 rounded-lg bg-[#F9FBFF] text-xs
                      placeholder:text-[#B5B7C0]
                      placeholder:text-[14px]
                      focus:outline-none
                    "
                  />
                </div>

               <div className="relative w-[154px] h-[38px]">
  <span
    className="
      absolute left-3 top-1/2 -translate-y-1/2
      text-xs text-gray-600 pointer-events-none
    "
  >
    Sort by:
  </span>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="
      w-[154px] h-[38px] pl-[58px] rounded-lg bg-[#F9FBFF] text-xs text-black
      focus:outline-none appearance-none font-semibold
    "
  >
    <option value="newest" >Newest</option>
    <option value="oldest">Oldest</option>
    <option value="name">Name A–Z</option>
  </select>

  <HiChevronDown
    className="
      absolute right-2 top-1/2 -translate-y-1/2
      text-black pointer-events-none
    "
    size={16}
  />
</div>

              </div>

            
              <div className="ml-10">
              <button
                onClick={() => setShowModal(true)}
                className="
                  ml-6 bg-[#007BFF] text-white px-5 py-2
                  rounded-lg text-sm font-medium h-[38px]
                "
              >
                Add
              </button>
            </div>
            </div>
          </div>

 
          <ServiceTable search={search} sort={sort} />
        </div>
      </main>

      {showModal && (
        <AddServiceModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
