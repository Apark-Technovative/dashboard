import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Promote from "./pages/Promote";
import ProtectedRoute from "./components/ProtectedRoute";
import Faq from "./pages/Faq";

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
          path="/promote"
          element={
            <ProtectedRoute>
              <Promote />
            </ProtectedRoute>
          }
          />
      </Routes>
    </BrowserRouter>
  );
}
