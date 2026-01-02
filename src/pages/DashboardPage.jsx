import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import AlertCard from "../components/AlertCard";
import Chatbot from "../components/Chatbot";

import ProductionLineTable from "../Components/ProductionLineTables";
import FinishedGoodsTable from "../Components/FinishedGoodsTable";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onChatClick={() => setChatOpen((v) => !v)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Welcome */}
            <div>
              <h2 className="text-lg lg:text-xl font-semibold">
                Welcome, John Miller
              </h2>
              <p className="text-sm text-gray-500">
                Apparel Factory Control Center
              </p>
            </div>

            {/* AI Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 lg:p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-2">AI Daily Summary</h3>
              <ul className="text-sm space-y-1">
                <li>• Line 3 efficiency dropped due to operator shortage</li>
                <li>• Order PO-2345 at risk of delay</li>
                <li>• Fabric batch FB-221 needs more relaxation time</li>
              </ul>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Today's Production" value="12,450" unit="pcs" trend="+4%" />
              <StatCard title="Overall Efficiency" value="82%" trend="-3%" />
              <StatCard title="Orders at Risk" value="3" trend="⚠️" />
              <StatCard title="Warehouse Stock" value="58,300" unit="pcs" trend="+1.2%" />
            </div>

           <div className="space-y-3">
  <h3 className="font-semibold">Alerts & Insights</h3>

  {/* Responsive layout */}
  <div
    className="
      flex flex-col
      lg:flex-row
      gap-4
      lg:overflow-x-auto
      pb-2
    "
  >
    <AlertCard
      text="Line 3 efficiency below 70%"
      type="warning"
    />
    <AlertCard
      text="Order PO-2345 may miss delivery date"
      type="danger"
    />
    <AlertCard
      text="Fabric batch FB-221 under relaxation time"
      type="info"
    />
  </div>
</div>



            {/* ✅ Tables Section (NOW IN THE RIGHT PLACE) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductionLineTable />
              <FinishedGoodsTable />
            </div>
          </div>
        </main>
      </div>

      {/* Floating Chat Button + Panel */}
      <Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  );
}

