// it's home with LoginForm prop
import React from "react";
import Home from "../Home/Home";
import GuestGuard from "../../guards/GuestGuard";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import BurndownChart from "../../components/Charts/BurndownChart";

function BurndownChartPage() {
  return (
    <GuestGuard>
      <Home>
        <SidebarComponent />
              <div className="ml-64 mt-2 overflow-y-auto flex flex-row">
            <BurndownChart />
        </div>
      </Home>
    </GuestGuard>
  );
}

export default BurndownChartPage;
