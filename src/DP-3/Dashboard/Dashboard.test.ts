import { Dashboard } from "./Dashboard";
import type { DashboardDataset } from "./types";

describe("Dashboard dataset filtering", () => {
  const dashboard = new Dashboard();
  it("exists", () => {
    expect(dashboard).toBeDefined();
  });

  it("should return an empty array when filtering by date starts: 2026-08-01 and ends: 2026-10-01", () => {
    const dateStarts = "2026-08-01";
    const dateEnds = "2026-10-01";

    const result: Array<DashboardDataset> = dashboard.getByDate({ dateStarts, dateEnds });

    expect(result.length).toBeFalsy();
  });

  it("should return an array with 3 items when filtering by date starts: 2026-02-01 and ends: 2026-04-01", () => {
    const dateStarts = "2026-02-01";
    const dateEnds = "2026-04-01";

    const result: Array<DashboardDataset> = dashboard.getByDate({ dateStarts, dateEnds });

    expect(result.length).toEqual(3);
  });
});
