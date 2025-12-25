import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Income from "./pages/Income";
import Promote from "./pages/Promote";
import ProtectedRoute from "./components/Protectedroute";

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
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
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
