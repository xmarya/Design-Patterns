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

  it("should return an array with 2 items when filtering by 'active' status", () => {
    const result = dashboard.getByStatus("active");
    expect(result.length).toBe(2);
  });

  it("should return an array with 1 item when filtering by 'postponed' status'", () => {
    const result = dashboard.getByStatus("postponed");
    expect(result.length).toBe(1);
  });

  it("should return an array with 2 items when filtering by 'in-progress' status'", () => {
    const result = dashboard.getByStatus("in-progress");
    expect(result.length).toBe(2);
  });

  it("should return an empty array when filtering by 'Engineering' category", () => {
    const result = dashboard.getByCategory(["Engineering"]);
    expect(result.length).toBeFalsy();
  });

  it("should return an array with 1 item when filtering by 'Finance' category", () => {
    const result = dashboard.getByCategory(["Finance"]);
    expect(result.length).toBe(1);
  });

  it("should get the data of category 'HR' when the letters case is different", () => {
    expect(dashboard.getByCategory(["hr"]).length).toBe(2);
    expect(dashboard.getByCategory(["hR"]).length).toBe(2);
    expect(dashboard.getByCategory(["Hr"]).length).toBe(2);
  });

  it("should return an array with 2 item when filtering the category by 'Sales' and 'Management'", () => {
    expect(dashboard.getByCategory(["Sales", "Management"]).length).toBe(2);
  })
});
