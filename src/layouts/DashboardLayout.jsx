import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BoshqarishPanel from "../components/BoshqarishPanel";

export default function DashboardLayout() {
  const location = useLocation();
  const showBoshqarishPanel = location.pathname === "/dashboard/boshqarish";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {showBoshqarishPanel && <BoshqarishPanel />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}