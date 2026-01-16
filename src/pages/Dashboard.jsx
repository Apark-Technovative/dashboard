import Sidebar from "../components/SideBar";
import { useEffect } from "react";

export default function Dashboard() {
   useEffect(() => {
    document.title = "Dashboard | Admin Panel";
  }, []);
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
      
<h1 > Welcome to Dashboard </h1>  
    </main>
    </div>
  );
}
