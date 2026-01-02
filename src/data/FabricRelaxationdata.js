export const relaxationBatches = [
  {
    batchId: "FB-221",
    fabricType: "Cotton Jersey",
    supplier: "Supplier A",
    rack: "Rack A1",
    receivedAt: "2025-01-03 09:15",
    requiredHours: 24,
    elapsedHours: 18,
    status: "Relaxing", // Relaxing | Ready | Violation
  },
  {
    batchId: "FB-229",
    fabricType: "Polyester",
    supplier: "Supplier B",
    rack: "Rack A1",
    receivedAt: "2025-01-02 10:00",
    requiredHours: 24,
    elapsedHours: 26,
    status: "Ready",
  },
  {
    batchId: "FB-232",
    fabricType: "Rib Knit",
    supplier: "Supplier A",
    rack: "Rack B2",
    receivedAt: "2025-01-03 08:00",
    requiredHours: 24,
    elapsedHours: 9,
    status: "Violation",
  },
  {
    batchId: "FB-240",
    fabricType: "Cotton Poplin",
    supplier: "Supplier C",
    rack: "Rack C1",
    receivedAt: "2025-01-01 12:30",
    requiredHours: 12,
    elapsedHours: 14,
    status: "Ready",
  },
];

export const racks = [
  { rack: "Rack A1", capacity: 12 },
  { rack: "Rack B2", capacity: 10 },
  { rack: "Rack C1", capacity: 8 },
  { rack: "Rack D3", capacity: 12 },
];
