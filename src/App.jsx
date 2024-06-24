import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ProjectOverview from "./pages/ProjectOverview.jsx";
import TaskManagement from "./pages/TaskManagement.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectManagement from "./pages/ProjectManagement.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import GroupManagement from "./pages/GroupManagement.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/project-overview" element={<ProjectOverview />} />
        <Route exact path="/task-management" element={<TaskManagement />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/project-management" element={<ProjectManagement />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route exact path="/group-management" element={<GroupManagement />} />
      </Routes>
    </Router>
  );
}

export default App;