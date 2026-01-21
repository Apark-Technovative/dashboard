import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import TeamTable from "../components/TeamTable";
import AddTeamModal from "../components/AddTeamModal";
import TopSearch from "../components/TopSearch";
import SearchSort from "../components/SearchSort";
import api from "../api/axios";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

  /* FETCH TEAM */
  const fetchTeam = async () => {
    const res = await api.get("/team");
    setTeam(res.data.data);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    document.title = "Teams | Admin Panel";
  }, []);

  /* SAVE (ADD + EDIT) */
  const handleSave = async (formData, id) => {
  try {
    if (id) {
      await api.patch(`/team/${id}`, formData);
    } else {
      await api.post("/team", formData);
    }

    setShowModal(false);
    setEditTeam(null);
    fetchTeam();
  } catch (err) {
    console.error("SAVE FAILED", err);
    throw err;
  }
};

  /* DELETE */
  const handleDelete = async (id) => {
    await api.delete(`/team/${id}`);
    fetchTeam();
  };

  /* EDIT */
  const handleEdit = (item) => {
    setEditTeam(item);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
      <Sidebar />
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">

        <TopSearch onSearch={setSearch} />

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <SearchSort
            title="Team Members"
            search={search}
            sort={sort}
            onSearch={setSearch}
            onSort={setSort}
            onAdd={() => {
              setEditTeam(null);   
              setShowModal(true);
            }}
          />

          <div className="overflow-x-auto">
            <TeamTable
              data={team}
              search={search}
              sort={sort}
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
