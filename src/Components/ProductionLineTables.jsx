const lines = [
  { line: "Line 1", target: 1200, actual: 1180, efficiency: 98 },
  { line: "Line 2", target: 1300, actual: 1040, efficiency: 80 },
  { line: "Line 3", target: 1100, actual: 760, efficiency: 69 },
];

function EffBadge({ value }) {
  const good = value >= 90;
  const mid = value >= 75 && value < 90;

  const cls = good
    ? "bg-green-600 text-white"
    : mid
    ? "bg-orange-500 text-white"
    : "bg-green-600 text-white"; // your screenshot shows 69% as green. keep it green.

  return (
    <span className={`px-3 py-1 rounded-md font-semibold text-sm ${cls}`}>
      {value}%
    </span>
  );
}

export default function ProductionLineTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4">
        <h3 className="font-semibold text-gray-800">Production Lines</h3>
        <div className="h-px bg-gray-100 mt-3" />
      </div>

      <div className="px-5 pb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="text-left font-semibold px-4 py-3 rounded-l-lg">
                  Line
                </th>
                <th className="text-left font-semibold px-4 py-3">Target</th>
                <th className="text-left font-semibold px-4 py-3">Actual</th>
                <th className="text-left font-semibold px-4 py-3 rounded-r-lg">
                  Efficiency
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {lines.map((r) => (
                <tr key={r.line} className="text-gray-800">
                  <td className="px-4 py-3 font-medium">{r.line}</td>
                  <td className="px-4 py-3">{r.target.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.actual.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <EffBadge value={r.efficiency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
