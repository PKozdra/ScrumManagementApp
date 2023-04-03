// it's home with LoginForm prop
import React from "react";
import Home from "../Home/Home";
import GuestGuard from "../../guards/GuestGuard";
import Taskboard from "../../components/Taskboard/Taskboard";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";

function TaskboardPage() {
  return (
    <GuestGuard>
      <Home>
        <SidebarComponent />
        <Taskboard />
      </Home>
    </GuestGuard>
  );
}

export default TaskboardPage;
