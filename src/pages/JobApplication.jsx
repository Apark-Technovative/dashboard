import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import TopSearch from "../components/TopSearch";
import JobApplicationTable from "../components/JobApplicationTable";
import { fetchJobApplications } from "../api/jobApplication.api";
import { toast } from "react-toastify";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await fetchJobApplications();
      setApplications(res.data.data);
    } catch (err) {
      toast.error("Failed to load job applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
    document.title = "Job Applications | Admin";
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">       
         <TopSearch onSearch={setSearch} />
          
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            <h2 className="text-xl font-semibold">Job Applications</h2>
<div className="flex flex-wrap items-center gap-2 mt-2 mr-8">
        {/* Search */}
        <div className="relative w-full sm:w-[216px] h-[38px]">
         <HiSearch
            size={22}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E7E7E]"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="
              w-full h-full pl-10 pr-4 rounded-lg bg-[#F9FBFF]
              text-xs placeholder:text-[#B5B7C0]
              focus:outline-none
"
          />
       </div>
</div>
</div>
 <div className="overflow-x-auto">
          <JobApplicationTable
            data={applications}
            search={search}
            loading={loading}
          />
        </div>
        </div>
      </main>
    </div>
  );
}
