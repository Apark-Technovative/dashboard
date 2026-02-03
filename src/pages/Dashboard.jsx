import { useEffect } from "react";

export default function Dashboard() {
   useEffect(() => {
    document.title = "Dashboard | Admin Panel";
  }, []);
  return (
    <div className="flex min-h-screen ">
      

      <main className="ml-64 flex-1 p-8">
      
<h1 className="text-xl font-bold" > Welcome to Dashboard </h1>  
    </main>
    </div>
  );
}
