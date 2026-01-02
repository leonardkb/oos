// Your sample "current snapshot" line data
export const lines = [
  { line: "Line 1", target: 1200, actual: 1180, efficiency: "98%" },
  { line: "Line 2", target: 1300, actual: 1040, efficiency: "80%" },
  { line: "Line 3", target: 1100, actual: 760,  efficiency: "69%" },
];

// Trend data for Section 1 (Target vs Actual over dates)
// In real app this comes from DB/API.
export const trendData = [
  { date: "2025-01-01", customer: "ZARA", style: "ST-1001", line: "Line 1", target: 1200, actual: 1180 },
  { date: "2025-01-02", customer: "ZARA", style: "ST-1001", line: "Line 1", target: 1200, actual: 1100 },
  { date: "2025-01-03", customer: "ZARA", style: "ST-1001", line: "Line 1", target: 1200, actual: 1230 },

  { date: "2025-01-01", customer: "H&M",  style: "ST-2002", line: "Line 2", target: 1300, actual: 1040 },
  { date: "2025-01-02", customer: "H&M",  style: "ST-2002", line: "Line 2", target: 1300, actual: 1200 },
  { date: "2025-01-03", customer: "H&M",  style: "ST-2002", line: "Line 2", target: 1300, actual: 1280 },

  { date: "2025-01-01", customer: "ZARA", style: "ST-3003", line: "Line 3", target: 1100, actual: 760 },
  { date: "2025-01-02", customer: "ZARA", style: "ST-3003", line: "Line 3", target: 1100, actual: 820 },
  { date: "2025-01-03", customer: "ZARA", style: "ST-3003", line: "Line 3", target: 1100, actual: 900 },
];
