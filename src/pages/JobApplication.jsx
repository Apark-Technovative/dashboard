import { useEffect, useState } from "react";
import SearchSort from "../components/SearchSort";

import JobApplicationTable from "../components/JobApplicationTable";
import { fetchJobApplications } from "../api/jobApplication.api";
import { toast } from "react-toastify";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const limit = 20;
  

  const loadApplications = async () => {
    try {
    
      const res = await fetchJobApplications({
       keyword: search,
        sort,
        page,
        limit,
      });
      setApplications(res.data.data);
       setTotal(res.data.count);
    } catch (err) {
      toast.error("Failed to load job applications");
    } 
  };

  useEffect(() => {
    loadApplications();
    document.title = "Job Applications | Admin";
  }, [search, sort, page]);

  return (
    <div className="flex min-h-screen bg-[#FAFBFF]">    
<main className="
  flex-1 h-screen overflow-y-auto
  p-4 sm:p-6 lg:p-8
  lg:ml-64
">     
         
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
<SearchSort         
 title="Job Applications"
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
                name: "fullName",
              };
          
              setSort(sortMap[value]); 
            }}
        />
        
 <div className="overflow-x-auto">
          <JobApplicationTable
        data={applications}
           
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
          />
        </div>
        </div>
      </main>
    </div>
  );
}
