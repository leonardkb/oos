const orders = [
  {
    order: "PO-2345",
    buyer: "ZARA",
    ready: "65%",
    delivery: "Feb 25, 2025",
    risk: "HIGH",
  },
  {
    order: "PO-2381",
    buyer: "H&M",
    ready: "92%",
    delivery: "Feb 18, 2025",
    risk: "LOW",
  },
];

function RiskBadge({ risk }) {
  const isHigh = risk === "HIGH";

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-bold ${
        isHigh ? "bg-red-600 text-white" : "bg-green-600 text-white"
      }`}
    >
      {risk}
    </span>
  );
}

export default function FinishedGoodsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4">
        <h3 className="font-semibold text-gray-800">Finished Goods Warehouse</h3>
        <div className="h-px bg-gray-100 mt-3" />
      </div>

      <div className="px-5 pb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="text-left font-semibold px-4 py-3 rounded-l-lg">
                  Order
                </th>
                <th className="text-left font-semibold px-4 py-3">Buyer</th>
                <th className="text-left font-semibold px-4 py-3">Ready</th>
                <th className="text-left font-semibold px-4 py-3">Delivery</th>
                <th className="text-left font-semibold px-4 py-3 rounded-r-lg">
                  Risk
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((r) => (
                <tr key={r.order} className="text-gray-800">
                  <td className="px-4 py-3 font-semibold">{r.order}</td>
                  <td className="px-4 py-3 font-medium">{r.buyer}</td>
                  <td className="px-4 py-3 font-medium">{r.ready}</td>
                  <td className="px-4 py-3 text-gray-600">{r.delivery}</td>
                  <td className="px-4 py-3">
                    <RiskBadge risk={r.risk} />
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
