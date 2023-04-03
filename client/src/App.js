import React from "react";
// add browser router
import { Routes, Route } from "react-router-dom";
// import login page
import LoginPage from "./pages/Authentication/LoginPage";
// import register page
import RegisterPage from "./pages/Authentication/RegisterPage";
// import dashboard page
import DashboardPage from "./pages/Functional/DashboardPage";
// import logout service
import LogoutService from "./services/LogoutService";
// import backlog page
import BacklogPage from "./pages/Functional/BacklogPage";
// import taskboard page
import TaskboardPage from "./pages/Functional/TaskboardPage";
// import CompletedSprints page
import CompletedSprintsPage from "./pages/Functional/CompletedSprintsPage";
// import burndownchart page
import BurndownChartPage from "./pages/Functional/BurndownChartPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/taskboard" element={<TaskboardPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/logout" element={<LogoutService />} />
        <Route path="/completedsprints" element={<CompletedSprintsPage />} />
        <Route path="/burndownchart" element={<BurndownChartPage />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
