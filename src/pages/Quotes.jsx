import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import QuoteTable from "../components/QuoteTable";
import TopSearch from "../components/TopSearch";
import api from "../api/axios";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");

  /* FETCH QUOTES */
  const fetchQuotes = async () => {
    const res = await api.get("/quotes"); // ✅ backend route for quotes
    setQuotes(res.data.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;
    await api.delete(`/quotes/${id}`);
    fetchQuotes();
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />

  <main className=" ml-64 flex-1 p-8 h-screen overflow-y-auto sm:p-12 ">
        <TopSearch onSearch={setSearch} />

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <h2 className="text-xl font-semibold mb-6">Quotes</h2>

          <QuoteTable
            data={quotes}
            search={search}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
