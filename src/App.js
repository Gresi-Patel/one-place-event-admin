import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users";
// import Events from "./pages/Events";
import Services from "./pages/Services.jsx";
import AdminLogin from "./pages/AdminLogin";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Booking from "./pages/Booking.jsx";
import ProfileAdmin from "./pages/ProfileAdmin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Route (Without Sidebar) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Routes (With Sidebar) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path="/events" element={<Events />} /> */}
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<ProfileAdmin/>} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
