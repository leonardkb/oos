import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import StatCard from "../Components/StatCard";
import AlertCard from "../Components/AlertCard";
import Chatbot from "../Components/Chatbot";

import ProductionLineTable from "../Components/ProductionLineTables";
import FinishedGoodsTable from "../Components/FinishedGoodsTable";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // ✅ Animation variants
  const page = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35 } },
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const section = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const gridItem = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={page}
      initial="hidden"
      animate="show"
      className="flex min-h-screen bg-gray-100"
    >
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onChatClick={() => setChatOpen((v) => !v)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* ✅ Stagger everything inside */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {/* Welcome */}
            <motion.div variants={section}>
              <h2 className="text-lg lg:text-xl font-semibold">
                Welcome, John Miller
              </h2>
              <p className="text-sm text-gray-500">
                Apparel Factory Control Center
              </p>
            </motion.div>

            {/* AI Summary */}
            <motion.div
              variants={section}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 lg:p-5 rounded-xl shadow"
            >
              <h3 className="font-semibold mb-2">AI Daily Summary</h3>
              <ul className="text-sm space-y-1">
                <li>• Line 3 efficiency dropped due to operator shortage</li>
                <li>• Order PO-2345 at risk of delay</li>
                <li>• Fabric batch FB-221 needs more relaxation time</li>
              </ul>
            </motion.div>

            {/* KPIs */}
            <motion.div variants={section} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={gridItem}>
                <StatCard title="Today's Production" value="12,450" unit="pcs" trend="+4%" />
              </motion.div>

              <motion.div variants={gridItem}>
                <StatCard title="Overall Efficiency" value="82%" trend="-3%" />
              </motion.div>

              <motion.div variants={gridItem}>
                <StatCard title="Orders at Risk" value="3" trend="⚠️" />
              </motion.div>

              <motion.div variants={gridItem}>
                <StatCard title="Warehouse Stock" value="58,300" unit="pcs" trend="+1.2%" />
              </motion.div>
            </motion.div>

            {/* Alerts */}
            <motion.div variants={section} className="space-y-3">
              <h3 className="font-semibold">Alerts & Insights</h3>

              <div
                className="
                  flex flex-col
                  lg:flex-row
                  gap-4
                  lg:overflow-x-auto
                  pb-2
                "
              >
                <motion.div variants={gridItem} className="min-w-[280px]">
                  <AlertCard text="Line 3 efficiency below 70%" type="warning" />
                </motion.div>

                <motion.div variants={gridItem} className="min-w-[280px]">
                  <AlertCard text="Order PO-2345 may miss delivery date" type="danger" />
                </motion.div>

                <motion.div variants={gridItem} className="min-w-[280px]">
                  <AlertCard text="Fabric batch FB-221 under relaxation time" type="info" />
                </motion.div>
              </div>
            </motion.div>

            {/* Tables */}
            <motion.div
              variants={section}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <motion.div variants={gridItem}>
                <ProductionLineTable />
              </motion.div>

              <motion.div variants={gridItem}>
                <FinishedGoodsTable />
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Chatbot */}
      <Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </motion.div>
  );
}
