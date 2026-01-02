import { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { cuttingOrders, spreadingTrend } from "../data/cuttingSpreadingData";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/** UI */
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

function Select({ label, value, onChange, options }) {
  return (
    <label className="text-xs text-gray-600">
      <span className="block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
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
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {sub ? <span className="text-sm text-gray-500 pb-1">{sub}</span> : null}
      </div>
    </div>
  );
}

function Progress({ value }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full">
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-xs text-gray-500">{pct}%</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = String(status).toLowerCase();
  const cls =
    s.includes("delayed")
      ? "bg-red-100 text-red-700"
      : s.includes("completed")
      ? "bg-green-100 text-green-700"
      : s.includes("track")
      ? "bg-blue-100 text-blue-700"
      : "bg-amber-100 text-amber-800";
  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${cls}`}>
      {status.toUpperCase()}
    </span>
  );
}

/** Page */
export default function CuttingSpreading() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters
  const [buyer, setBuyer] = useState("All");
  const [order, setOrder] = useState("All");
  const [style, setStyle] = useState("All");

  const buyerOptions = useMemo(() => ["All", ...Array.from(new Set(cuttingOrders.map(o => o.buyer)))], []);
  const orderOptions = useMemo(() => ["All", ...Array.from(new Set(cuttingOrders.map(o => o.order)))], []);
  const styleOptions = useMemo(() => ["All", ...Array.from(new Set(cuttingOrders.map(o => o.style)))], []);

  const filtered = useMemo(() => {
    return cuttingOrders
      .filter(o => (buyer === "All" ? true : o.buyer === buyer))
      .filter(o => (order === "All" ? true : o.order === order))
      .filter(o => (style === "All" ? true : o.style === style));
  }, [buyer, order, style]);

  const kpis = useMemo(() => {
    const totalOrders = filtered.length;
    const delayed = filtered.filter(o => o.status === "Delayed").length;
    const avgSpread = totalOrders ? Math.round(filtered.reduce((s, o) => s + o.spreadEfficiency, 0) / totalOrders) : 0;
    const avgMarker = totalOrders ? Math.round(filtered.reduce((s, o) => s + o.markerUtilization, 0) / totalOrders) : 0;
    return { totalOrders, delayed, avgSpread, avgMarker };
  }, [filtered]);

  const donutData = useMemo(() => {
    const avg = kpis.avgMarker;
    return [
      { name: "Utilized", value: avg },
      { name: "Waste", value: Math.max(0, 100 - avg) },
    ];
  }, [kpis.avgMarker]);

  const delayAlerts = useMemo(() => filtered.filter(o => o.status === "Delayed"), [filtered]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Cutting & Spreading
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track order-wise cutting progress, spreading efficiency, marker utilization and delay alerts.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Select label="Buyer" value={buyer} onChange={setBuyer} options={buyerOptions} />
              <Select label="Order" value={order} onChange={setOrder} options={orderOptions} />
              <Select label="Style" value={style} onChange={setStyle} options={styleOptions} />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => { setBuyer("All"); setOrder("All"); setStyle("All"); }}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* KPI Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Total Orders" value={kpis.totalOrders} pill="Live" />
            <StatTile label="Delayed Orders" value={kpis.delayed} />
            <StatTile label="Avg Spreading Efficiency" value={kpis.avgSpread} sub="%" />
            <StatTile label="Avg Marker Utilization" value={kpis.avgMarker} sub="%" />
          </div>

          {/* Order-wise cutting progress */}
          <Card
            title="Order-wise Cutting Progress"
            subtitle="Cut pieces vs planned pieces with status indicators."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-3 rounded-l-xl font-semibold">Order</th>
                    <th className="text-left px-4 py-3 font-semibold">Buyer</th>
                    <th className="text-left px-4 py-3 font-semibold">Style</th>
                    <th className="text-left px-4 py-3 font-semibold">Planned</th>
                    <th className="text-left px-4 py-3 font-semibold">Cut</th>
                    <th className="text-left px-4 py-3 font-semibold">Progress</th>
                    <th className="text-left px-4 py-3 font-semibold">Due</th>
                    <th className="text-left px-4 py-3 rounded-r-xl font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filtered.map((o) => {
                    const pct = (o.cutPcs / o.plannedPcs) * 100;
                    return (
                      <tr key={o.order}>
                        <td className="px-4 py-4 font-semibold text-gray-900">{o.order}</td>
                        <td className="px-4 py-4">{o.buyer}</td>
                        <td className="px-4 py-4">{o.style}</td>
                        <td className="px-4 py-4">{o.plannedPcs.toLocaleString()}</td>
                        <td className="px-4 py-4">{o.cutPcs.toLocaleString()}</td>
                        <td className="px-4 py-4 min-w-[220px]">
                          <Progress value={pct} />
                        </td>
                        <td className="px-4 py-4 text-gray-600">{o.due}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filtered.length === 0 ? (
                <p className="text-sm text-gray-500 mt-4">No orders match your filters.</p>
              ) : null}
            </div>
          </Card>

          {/* Spreading efficiency + Marker utilization */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Efficiency trend chart */}
            <div className="xl:col-span-2">
              <Card
                title="Spreading Efficiency Trend"
                subtitle="Daily efficiency trend (sample)."
              >
                <div className="h-[280px] sm:h-[320px] lg:h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spreadingTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        name="Efficiency %"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Marker utilization donut */}
            <div>
              <Card
                title="Marker Utilization"
                subtitle="Average utilization vs waste (sample)."
                right={<span className="text-xs px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">Live</span>}
              >
                <div className="flex items-center justify-center">
                  <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donutData}
                          innerRadius={70}
                          outerRadius={95}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#2563EB" />
                          <Cell fill="#E5E7EB" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">Avg Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">{kpis.avgMarker}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Higher utilization reduces fabric waste.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Delay Alerts */}
          <Card
            title="Delay Alerts"
            subtitle="Orders with delays and reasons."
            right={
              <span className="text-xs px-2 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700">
                {delayAlerts.length} delayed
              </span>
            }
          >
            {delayAlerts.length === 0 ? (
              <p className="text-sm text-gray-500">No delay alerts 🎉</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {delayAlerts.map((o) => (
                  <div
                    key={o.order}
                    className="bg-red-50 border border-red-200 rounded-2xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-red-800">{o.order}</p>
                        <p className="text-xs text-red-700 mt-1">
                          {o.buyer} • {o.style} • Due: {o.due}
                        </p>
                      </div>
                      <StatusBadge status="Delayed" />
                    </div>

                    <div className="mt-3 text-xs text-red-700">
                      Reason:{" "}
                      <span className="font-semibold">{o.delayReason || "Not specified"}</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Cutting Progress</p>
                      <Progress value={(o.cutPcs / o.plannedPcs) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
