import { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { orders, inventory } from "../data/Warehousedata";
import Chatbot from "../Components/Chatbot";

function Card({ title, subtitle, right, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle ? (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          ) : null}
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function StatTile({ label, value, sub, pill }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {pill ? (
          <span className="text-xs px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
            {pill}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {sub ? <span className="text-sm text-gray-500 pb-1">{sub}</span> : null}
      </div>
    </div>
  );
}

function RiskBadge({ risk }) {
  const isHigh = String(risk).toLowerCase() === "high";
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold ${
        isHigh ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`}
    >
      {risk.toUpperCase()}
    </span>
  );
}

function DeliveryFlag({ daysLeft }) {
  // if no date parsing works, fallback to neutral
  if (daysLeft === null) {
    return (
      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
        UNKNOWN
      </span>
    );
  }

  if (daysLeft < 0) {
    return (
      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-700">
        OVERDUE
      </span>
    );
  }
  if (daysLeft <= 3) {
    return (
      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-800">
        DUE SOON
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700">
      ON TRACK
    </span>
  );
}

function ReadyBar({ readyPct }) {
  const pct = Math.max(0, Math.min(100, Number(readyPct || 0)));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>Readiness</span>
        <span className="font-semibold text-gray-700">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// "25 Feb 2025" -> Date
function parseDeliveryDate(str) {
  try {
    // convert to "25 Feb 2025" -> Date
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function daysUntil(date) {
  if (!date) return null;
  const today = new Date();
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const b = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function FinishedWarehouse() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buyer, setBuyer] = useState("All");
  const [risk, setRisk] = useState("All");

  const buyers = useMemo(() => ["All", ...Array.from(new Set(orders.map(o => o.buyer)))], []);
  const risks = ["All", "High", "Low"];

  const filteredOrders = useMemo(() => {
    return orders
      .filter(o => (buyer === "All" ? true : o.buyer === buyer))
      .filter(o => (risk === "All" ? true : o.risk === risk));
  }, [buyer, risk]);

  const reminders = useMemo(() => {
    return filteredOrders
      .map((o) => {
        const d = parseDeliveryDate(o.delivery);
        const left = daysUntil(d);
        return { ...o, deliveryDateObj: d, daysLeft: left };
      })
      .sort((a, b) => {
        const ad = a.daysLeft ?? 9999;
        const bd = b.daysLeft ?? 9999;
        return ad - bd;
      });
  }, [filteredOrders]);
  const [chatOpen, setChatOpen] = useState(false);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Finished Warehouse
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Live inventory status, order readiness, delivery reminders & shipment flags.
            </p>
          </div>

          {/* Inventory snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Total Stock" value={inventory.totalStockPcs} sub="pcs" pill="Live" />
            <StatTile label="Ready to Ship" value={inventory.readyToShipPcs} sub="pcs" />
            <StatTile label="Pending QC" value={inventory.pendingQC} sub="pcs" />
            <StatTile label="Last Updated" value={inventory.lastUpdated} />
          </div>

          {/* Filters + Orders table */}
          <Card
            title="Order Readiness & Shipment Flags"
            subtitle="Track buyer-wise readiness, delivery urgency and risk flags."
            right={
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
                  {filteredOrders.length} orders
                </span>
              </div>
            }
          >
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              <label className="text-xs text-gray-600">
                <span className="block mb-1">Buyer</span>
                <select
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {buyers.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs text-gray-600">
                <span className="block mb-1">Risk</span>
                <select
                  value={risk}
                  onChange={(e) => setRisk(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {risks.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setBuyer("All");
                    setRisk("All");
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-3 rounded-l-xl font-semibold">Order</th>
                    <th className="text-left px-4 py-3 font-semibold">Buyer</th>
                    <th className="text-left px-4 py-3 font-semibold">Quantity</th>
                    <th className="text-left px-4 py-3 font-semibold">Readiness</th>
                    <th className="text-left px-4 py-3 font-semibold">Delivery</th>
                    <th className="text-left px-4 py-3 font-semibold">Reminder</th>
                    <th className="text-left px-4 py-3 rounded-r-xl font-semibold">Risk</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {reminders.map((o) => {
                    const pct = Number(String(o.ready).replace("%", "")) || 0;

                    return (
                      <tr key={o.order} className="text-gray-800">
                        <td className="px-4 py-4 font-semibold">{o.order}</td>
                        <td className="px-4 py-4 font-medium">{o.buyer}</td>
                        <td className="px-4 py-4">{o.quantity.toLocaleString()}</td>
                        <td className="px-4 py-4 min-w-[220px]">
                          <ReadyBar readyPct={pct} />
                        </td>
                        <td className="px-4 py-4 text-gray-600">{o.delivery}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <DeliveryFlag daysLeft={o.daysLeft} />
                            {o.daysLeft !== null ? (
                              <span className="text-xs text-gray-500">
                                {o.daysLeft < 0
                                  ? `${Math.abs(o.daysLeft)}d late`
                                  : `${o.daysLeft}d left`}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <RiskBadge risk={o.risk} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {reminders.length === 0 ? (
                <p className="text-sm text-gray-500 mt-4">
                  No orders match the selected filters.
                </p>
              ) : null}
            </div>
          </Card>

          {/* Delivery Reminder Panel */}
          <Card
            title="Delivery Reminders"
            subtitle="Orders sorted by nearest delivery date (or overdue first)."
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {reminders.map((o) => {
                const pct = Number(String(o.ready).replace("%", "")) || 0;
                return (
                  <div
                    key={o.order}
                    className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{o.order}</p>
                        <RiskBadge risk={o.risk} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Buyer: <span className="font-medium text-gray-700">{o.buyer}</span> • Qty:{" "}
                        <span className="font-medium text-gray-700">{o.quantity.toLocaleString()}</span>
                      </p>

                      <div className="mt-3">
                        <ReadyBar readyPct={pct} />
                      </div>

                      <p className="text-xs text-gray-500 mt-3">
                        Delivery: <span className="font-semibold text-gray-700">{o.delivery}</span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <DeliveryFlag daysLeft={o.daysLeft} />
                      <div className="text-xs text-gray-500 mt-2">
                        {o.daysLeft === null
                          ? "No date"
                          : o.daysLeft < 0
                          ? `${Math.abs(o.daysLeft)} days late`
                          : `${o.daysLeft} days left`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </main>
        <Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />
      </div>
    </div>
  );
}
