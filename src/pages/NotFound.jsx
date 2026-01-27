import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFBFF]">
      <h1 className="text-5xl font-bold  mb-4">404</h1>
      <p className="  text-xl text-[#5932EA] mb-3">Page not found</p>
       <p className="text-gray-500 mb-6">Sorry! The page you requested could not be found.</p>

      <Link
        to="/"
        className="px-5 py-2 bg-[#5932EA] text-white rounded-sm hover:bg-[#4a28d9]"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
