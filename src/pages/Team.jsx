import { useState, useEffect } from "react";
import TeamTable from "../components/TeamTable";
import AddTeamModal from "../components/AddTeamModal";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [total, setTotal] = useState(0);
 const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt"); 
  const [page, setPage] = useState(1);
  const limit = 20;

  const [showModal, setShowModal] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

 const fetchTeam = async () => {
    try {
      const res = await api.get("/team", {
         params: {
          keyword: search,
          sort,
          page,
          limit,
        },
      });
      setTeam(res.data.data);
       setTotal(res.data.count);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
      document.title = "Teams | Admin Panel";
  }, [search, sort, page]);

  const handleSave = async (formData, id) => {
    try {
      if (id) {
        await api.patch(`/team/${id}`, formData);
      } else {
        await api.post("/team", formData);
      }
    } catch (error) {
      console.error("Save failed:", error);
      throw error; 
    } finally {
      setShowModal(false);
      setEditTeam(null);
      fetchTeam();
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await api.delete(`/team/${id}`);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      fetchTeam();
    }
  };

 
  const handleEdit = (item) => {
    setEditTeam(item);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">
        <div className="bg-white rounded-2xl shadow-sm p-6">
<SearchSort
 title="Team Members"             search={search}
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
            <TeamTable
                      data={team}
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

      {showModal && (
        <AddTeamModal
          initialData={editTeam}
          onClose={() => {
            setShowModal(false);
            setEditTeam(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
