import React from "react";
import Home from "../Home/Home";
import GuestGuard from "../../guards/GuestGuard";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import Backlog from "../../components/Backlog/Backlog";
import BoardChooser from "../../components/Taskboard/BoardChooser";

function BacklogPage() {
  return (
    <GuestGuard>
      <Home>
        <SidebarComponent />
        <div className="ml-80 mt-2 overflow-y-auto flex flex-row space-x-4 mr-32 ">
          <div className="basis-2/5">
            <BoardChooser />
          </div>
          <div className="basis-1/5"></div>
          <div className="basis-2/5">
            <Backlog />
          </div>
        </div>
      </Home>
    </GuestGuard>
  );
}

export default BacklogPage;
