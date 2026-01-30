import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import Faq from "./pages/Faq";
import Team from "./pages/Team";
import Career from "./pages/Career";
import JobApplication from "./pages/JobApplication";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";


export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
           <Route index element={<Dashboard />} />
           <Route path="/services" element={<Services />} />
          <Route path="/faq" element={ <Faq />} />
          <Route path="/team" element={ <Team />} />
          <Route path="/career" element={ <Career /> } />
          <Route path="/job" element={ <JobApplication /> } />
          <Route path="/setting" element={ <Settings />}  />
         

        </Route>  
 <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}
