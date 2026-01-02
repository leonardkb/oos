import { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { relaxationBatches, racks } from "../data/FabricRelaxationdata";
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

function StatTile({ label, value, pill }) {
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
      <div className="mt-3 text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = String(status).toLowerCase();
  const cls =
    s === "ready"
      ? "bg-green-100 text-green-700"
      : s === "violation"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";
  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${cls}`}>
      {status.toUpperCase()}
    </span>
  );
}

function ProgressBar({ elapsed, required }) {
  const pct = Math.min(100, Math.round((elapsed / required) * 100));
  const isViolation = elapsed < required;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>{elapsed}h / {required}h</span>
        <span className="font-semibold text-gray-700">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${isViolation ? "bg-blue-600" : "bg-green-600"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
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
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function FabricRelaxation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // filters
  const [rack, setRack] = useState("All");
  const [supplier, setSupplier] = useState("All");
  const [fabricType, setFabricType] = useState("All");
  const [status, setStatus] = useState("All");

  const rackOptions = useMemo(
    () => ["All", ...Array.from(new Set(relaxationBatches.map(b => b.rack)))],
    []
  );
  const supplierOptions = useMemo(
    () => ["All", ...Array.from(new Set(relaxationBatches.map(b => b.supplier)))],
    []
  );
  const fabricOptions = useMemo(
    () => ["All", ...Array.from(new Set(relaxationBatches.map(b => b.fabricType)))],
    []
  );
  const statusOptions = ["All", "Relaxing", "Ready", "Violation"];

  const filtered = useMemo(() => {
    return relaxationBatches
      .filter(b => (rack === "All" ? true : b.rack === rack))
      .filter(b => (supplier === "All" ? true : b.supplier === supplier))
      .filter(b => (fabricType === "All" ? true : b.fabricType === fabricType))
      .filter(b => (status === "All" ? true : b.status === status));
  }, [rack, supplier, fabricType, status]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const relaxing = filtered.filter(b => b.status === "Relaxing").length;
    const ready = filtered.filter(b => b.status === "Ready").length;
    const violations = filtered.filter(b => b.status === "Violation").length;
    return { total, relaxing, ready, violations };
  }, [filtered]);

  // rack-wise status
  const rackStatus = useMemo(() => {
    const map = new Map();
    for (const r of racks) map.set(r.rack, { rack: r.rack, capacity: r.capacity, occupied: 0, violations: 0 });
    for (const b of filtered) {
      if (!map.has(b.rack)) map.set(b.rack, { rack: b.rack, capacity: 0, occupied: 0, violations: 0 });
      const row = map.get(b.rack);
      row.occupied += 1;
      if (b.status === "Violation") row.violations += 1;
    }
    return Array.from(map.values());
  }, [filtered]);

  const violationsList = useMemo(
    () => filtered.filter(b => b.status === "Violation"),
    [filtered]
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Fabric Relaxation
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Live relaxation status, rack-wise capacity and under-relaxation violations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Total Batches" value={stats.total} pill="Live" />
            <StatTile label="Relaxing" value={stats.relaxing} />
            <StatTile label="Ready" value={stats.ready} />
            <StatTile label="Violations" value={stats.violations} />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Select label="Rack" value={rack} onChange={setRack} options={rackOptions} />
              <Select label="Supplier" value={supplier} onChange={setSupplier} options={supplierOptions} />
              <Select label="Fabric Type" value={fabricType} onChange={setFabricType} options={fabricOptions} />
              <Select label="Status" value={status} onChange={setStatus} options={statusOptions} />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => { setRack("All"); setSupplier("All"); setFabricType("All"); setStatus("All"); }}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Rack-wise status */}
          <Card
            title="Rack-wise Status"
            subtitle="Capacity utilization and violation count per rack."
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {rackStatus.map((r) => {
                const pct = r.capacity > 0 ? Math.round((r.occupied / r.capacity) * 100) : 0;
                const capacityColor =
                  pct >= 90 ? "bg-red-100 text-red-700" :
                  pct >= 70 ? "bg-amber-100 text-amber-800" :
                              "bg-green-100 text-green-700";

                return (
                  <div key={r.rack} className="bg-white border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.rack}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Occupied {r.occupied} / {r.capacity} slots
                        </p>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${capacityColor}`}>
                          {pct}% used
                        </span>
                        <p className="text-xs text-gray-500 mt-2">
                          Violations: <span className="font-semibold text-gray-800">{r.violations}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Live batches */}
          <Card
            title="Live Relaxation Status"
            subtitle="All fabric batches currently relaxing or ready."
            right={<span className="text-xs px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">Live</span>}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-3 rounded-l-xl font-semibold">Batch</th>
                    <th className="text-left px-4 py-3 font-semibold">Fabric</th>
                    <th className="text-left px-4 py-3 font-semibold">Supplier</th>
                    <th className="text-left px-4 py-3 font-semibold">Rack</th>
                    <th className="text-left px-4 py-3 font-semibold">Received</th>
                    <th className="text-left px-4 py-3 font-semibold">Relaxation</th>
                    <th className="text-left px-4 py-3 rounded-r-xl font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filtered.map((b) => (
                    <tr key={b.batchId}>
                      <td className="px-4 py-4 font-semibold text-gray-900">{b.batchId}</td>
                      <td className="px-4 py-4">{b.fabricType}</td>
                      <td className="px-4 py-4">{b.supplier}</td>
                      <td className="px-4 py-4">{b.rack}</td>
                      <td className="px-4 py-4 text-gray-600">{b.receivedAt}</td>
                      <td className="px-4 py-4 min-w-[220px]">
                        <ProgressBar elapsed={b.elapsedHours} required={b.requiredHours} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={b.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 ? (
                <p className="text-sm text-gray-500 mt-4">No batches match the filters.</p>
              ) : null}
            </div>
          </Card>

          {/* Violations */}
          <Card
            title="Violations (Under-Relaxed Fabric)"
            subtitle="Fabric batches moved early or insufficient relaxation time."
          >
            {violationsList.length === 0 ? (
              <p className="text-sm text-gray-500">No violations found 🎉</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {violationsList.map((b) => {
                  const remaining = Math.max(0, b.requiredHours - b.elapsedHours);
                  return (
                    <div key={b.batchId} className="bg-red-50 border border-red-200 rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-red-800">{b.batchId}</p>
                          <p className="text-xs text-red-700 mt-1">
                            {b.fabricType} • {b.supplier} • {b.rack}
                          </p>
                        </div>
                        <StatusBadge status="Violation" />
                      </div>

                      <div className="mt-3">
                        <ProgressBar elapsed={b.elapsedHours} required={b.requiredHours} />
                      </div>

                      <p className="text-xs text-red-700 mt-3">
                        Needs <span className="font-semibold">{remaining}h</span> more relaxation time.
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </main>
        <Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />
      </div>
    </div>
  );
}
