import { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";

import { lines, trendData } from "../data/productionData";
import Chatbot from "../Components/Chatbot";

/** ---------- UI PRIMITIVES ---------- **/
function Card({ title, subtitle, children, right }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
          {subtitle ? (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{subtitle}</p>
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

function DateInput({ label, value, onChange }) {
  return (
    <label className="text-xs text-gray-600">
      <span className="block mb-1">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

/** ---------- Helpers ---------- **/
function formatPct(pctString) {
  const n = Number(String(pctString).replace("%", ""));
  return Number.isFinite(n) ? n : 0;
}

function EfficiencyBadge({ pct }) {
  const n = typeof pct === "number" ? pct : formatPct(pct);
  const cls =
    n >= 90
      ? "bg-green-50 text-green-700 ring-green-200"
      : n >= 75
      ? "bg-amber-50 text-amber-800 ring-amber-200"
      : "bg-red-50 text-red-700 ring-red-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ${cls}`}
    >
      {n}%
    </span>
  );
}

function BlueTooltipStyle() {
  // optional: keep tooltips readable on white UI
  return (
    <style>{`
      .recharts-default-tooltip {
        border-radius: 12px !important;
        border: 1px solid #E5E7EB !important;
        box-shadow: 0 8px 20px rgba(15,23,42,.08) !important;
      }
    `}</style>
  );
}

/** ---------- PAGE ---------- **/
export default function Production() {
  // layout state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // filters
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-01-03");
  const [customer, setCustomer] = useState("All");
  const [style, setStyle] = useState("All");
  const [line, setLine] = useState("All");

  // options derived from data
  const customerOptions = useMemo(
    () => ["All", ...Array.from(new Set(trendData.map((d) => d.customer)))],
    []
  );
  const styleOptions = useMemo(
    () => ["All", ...Array.from(new Set(trendData.map((d) => d.style)))],
    []
  );
  const lineOptions = useMemo(
    () => ["All", ...Array.from(new Set(trendData.map((d) => d.line)))],
    []
  );

  // filtered trend rows
  const filteredTrend = useMemo(() => {
    return trendData
      .filter((d) => d.date >= from && d.date <= to)
      .filter((d) => (customer === "All" ? true : d.customer === customer))
      .filter((d) => (style === "All" ? true : d.style === style))
      .filter((d) => (line === "All" ? true : d.line === line));
  }, [from, to, customer, style, line]);

  // grouped by date for Section 1
  const groupedByDate = useMemo(() => {
    const map = new Map();
    for (const r of filteredTrend) {
      if (!map.has(r.date)) map.set(r.date, { date: r.date, target: 0, actual: 0 });
      const row = map.get(r.date);
      row.target += r.target;
      row.actual += r.actual;
    }
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredTrend]);

  // efficiency chart data (from your snapshot)
  const efficiencyData = useMemo(() => {
    const base = lines.map((l) => ({
      line: l.line,
      efficiency: formatPct(l.efficiency),
      target: l.target,
      actual: l.actual,
    }));
    return line === "All" ? base : base.filter((x) => x.line === line);
  }, [line]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BlueTooltipStyle />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Page header */}
          <div className="mb-5">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Production Lines
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Target vs Actual trends and line efficiency overview.
            </p>
          </div>

          {/* Filters (sticky-like card) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <DateInput label="From" value={from} onChange={setFrom} />
              <DateInput label="To" value={to} onChange={setTo} />
              <Select
                label="Customer"
                value={customer}
                onChange={setCustomer}
                options={customerOptions}
              />
              <Select label="Style" value={style} onChange={setStyle} options={styleOptions} />
              <Select label="Line" value={line} onChange={setLine} options={lineOptions} />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
              <button
                onClick={() => {
                  setCustomer("All");
                  setStyle("All");
                  setLine("All");
                }}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                Reset
              </button>
              <button
                className="px-4 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                onClick={() => {}}
              >
                Apply
              </button>
            </div>
          </div>

          {/* SECTION 1 */}
          <div className="mb-6">
            <Card
              title="Target vs Actual Production"
              subtitle="Bars show Actual production. Line shows Target. X-axis: Date. Y-axis: Quantity."
              right={
                <div className="hidden sm:flex items-center gap-2">
                  <button className="px-3 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition">
                    Export
                  </button>
                  <button className="px-3 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition">
                    View Table
                  </button>
                </div>
              }
            >
              {/* Responsive height: smaller on mobile */}
              <div className="h-[280px] sm:h-[320px] lg:h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={groupedByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Blue bars */}
                    <Bar dataKey="actual" name="Actual" fill="#60A5FA" radius={[8, 8, 0, 0]} />
                    {/* Darker blue line */}
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target"
                      stroke="#2563EB"
                      strokeWidth={3}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {groupedByDate.length === 0 ? (
                <p className="text-sm text-gray-500 mt-4">
                  No data found for selected filters.
                </p>
              ) : null}
            </Card>
          </div>

          {/* SECTION 2 */}
          <Card
            title="Line Efficiency"
            subtitle="Efficiency calculated per line (sample). Filter by line/date/customer/style."
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="xl:col-span-2">
                <div className="h-[280px] sm:h-[320px] lg:h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="line" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="efficiency"
                        name="Efficiency %"
                        fill="#2563EB"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary panel */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Snapshot</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Current line performance (sample data)
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-600">
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {efficiencyData.map((r) => (
                    <div
                      key={r.line}
                      className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{r.line}</p>
                        <p className="text-xs text-gray-500">
                          Target {r.target.toLocaleString()} • Actual {r.actual.toLocaleString()}
                        </p>
                      </div>
                      <EfficiencyBadge pct={r.efficiency} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Tip: Connect your DB to compute efficiency from SAM, operators, downtime and output.
                </div>
              </div>
            </div>
          </Card>
        </main>
        <Chatbot />
      </div>
    </div>
  );
}
