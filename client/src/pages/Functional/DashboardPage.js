// it's home with LoginForm prop
import React from "react";
import Home from "../Home/Home";
import GuestGuard from "../../guards/GuestGuard";
import BoardChooser from "../../components/Taskboard/BoardChooser";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";

function Dashboard() {
  return (
    <GuestGuard>
      <Home>
        <SidebarComponent />
        <div className="border-4 ml-64 mt-2 overflow-y-auto flex flex-row">
          <BoardChooser />
        </div>
      </Home>
    </GuestGuard>
  );
}

export default Dashboard;
