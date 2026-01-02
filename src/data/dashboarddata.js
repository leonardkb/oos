export const kpis = [
  { title: "Today's Production", value: "12,450 pcs", trend: "+4%" },
  { title: "Overall Efficiency", value: "82%", trend: "-3%" },
  { title: "Orders at Risk", value: "3", trend: "⚠️" },
  { title: "Warehouse Stock", value: "58,300 pcs", trend: "+1.2%" }
];

export const aiSummary = `
Today's performance shows a dip in Line 3 efficiency due to operator shortage.
Order PO-2345 is at risk due to delayed finishing.
Fabric batch FB-221 requires additional relaxation time.
`;

export const alerts = [
  { type: "warning", message: "Line 3 efficiency dropped below 70%" },
  { type: "danger", message: "Order PO-2345 may miss delivery date" },
  { type: "info", message: "Fabric batch FB-221 under relaxation threshold" }
];
