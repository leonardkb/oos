export const cuttingOrders = [
  {
    order: "PO-2345",
    buyer: "ZARA",
    style: "ST-1001",
    plannedPcs: 12000,
    cutPcs: 7800,
    spreadEfficiency: 82, // %
    markerUtilization: 74, // %
    due: "25 Feb 2025",
    status: "In Progress", // In Progress | Completed | Delayed
    delayReason: "Waiting for fabric relaxation",
  },
  {
    order: "PO-2381",
    buyer: "H&M",
    style: "ST-2002",
    plannedPcs: 9000,
    cutPcs: 8800,
    spreadEfficiency: 91,
    markerUtilization: 86,
    due: "18 Feb 2025",
    status: "On Track",
    delayReason: "",
  },
  {
    order: "PO-2402",
    buyer: "ZARA",
    style: "ST-3003",
    plannedPcs: 6500,
    cutPcs: 4200,
    spreadEfficiency: 73,
    markerUtilization: 69,
    due: "15 Feb 2025",
    status: "Delayed",
    delayReason: "Marker change + manpower shortage",
  },
];

export const spreadingTrend = [
  { date: "2025-02-11", efficiency: 78, markerUtil: 72 },
  { date: "2025-02-12", efficiency: 81, markerUtil: 75 },
  { date: "2025-02-13", efficiency: 83, markerUtil: 74 },
  { date: "2025-02-14", efficiency: 79, markerUtil: 70 },
  { date: "2025-02-15", efficiency: 86, markerUtil: 77 },
];
