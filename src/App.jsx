import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import Faq from "./pages/Faq";
import Team from "./pages/Team";
import Career from "./pages/Career";
import Settings from "./pages/Settings";

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
          />

          
            <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
          />

<Route
          path="/career"
          element={
            <ProtectedRoute>
              <Career />
            </ProtectedRoute>
          }
          />


          <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
          />

          
      </Routes>
    </BrowserRouter>
  );
}
