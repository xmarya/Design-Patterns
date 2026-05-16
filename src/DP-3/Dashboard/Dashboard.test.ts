import { CategoryFilter } from "../_shared/core/QueryComponents/CategoryFilter";
import { DateFilter } from "../_shared/core/QueryComponents/DateFilter";
import { FiltersGroup } from "../_shared/core/QueryComponents/FiltersGroup";
import { KeywordFilter } from "../_shared/core/QueryComponents/KeywordFilter";
import { StatusFilter } from "../_shared/core/QueryComponents/StatusFilter";
import { Dashboard } from "./Dashboard";
import type { DashboardDataset } from "./types";

describe("Dashboard dataset filtering using QueryComponents", () => {
  const dashboard = new Dashboard();
  let data: Array<DashboardDataset>;

  beforeAll(() => {
    data = dashboard.getDashboardData();
  });

  it("exists", () => {
    expect(dashboard).toBeDefined();
  });

  it("should return an empty array when filtering by date starts: 2026-08-01 and ends: 2026-10-01", () => {
    const dateStarts = "2026-08-01";
    const dateEnds = "2026-10-01";

    const dateFilter = new DateFilter<DashboardDataset>("date", { dateStarts, dateEnds });

    const result = dateFilter.query(data);
    expect(result.length).toBeFalsy();
  });

  it("should return an array with 3 items when filtering by date starts: 2026-02-01 and ends: 2026-04-01", () => {
    const dateStarts = "2026-02-01";
    const dateEnds = "2026-04-01";

    const dateFilter = new DateFilter<DashboardDataset>("date", { dateStarts, dateEnds });

    const result = dateFilter.query(data);
    expect(result.length).toEqual(3);
  });

  it("should return an array with 2 items when filtering by 'active' status", () => {
    const statusFilter = new StatusFilter<DashboardDataset>("status", "active");
    expect(statusFilter.query(data).length).toBe(2);
  });

  it("should return an array with 1 item when filtering by 'postponed' status'", () => {
    const statusFilter = new StatusFilter<DashboardDataset>("status", "postponed");
    expect(statusFilter.query(data).length).toBe(1);
  });

  it("should return an array with 2 items when filtering by 'in-progress' status'", () => {
    const statusFilter = new StatusFilter<DashboardDataset>("status", "in-progress");
    expect(statusFilter.query(data).length).toBe(2);
  });

  it("should return an empty array when filtering by 'Engineering' category", () => {
    const catsFilter = new CategoryFilter<DashboardDataset>("categories", ["Engineering"]);
    const result = catsFilter.query(data);
    expect(result.length).toBeFalsy();
  });

  it("should return an array with 1 item when filtering by 'Finance' category", () => {
    const catsFilter = new CategoryFilter<DashboardDataset>("categories", ["Finance"]);
    const result = catsFilter.query(data);
    expect(result.length).toBe(1);
  });

  it("should get the data of category 'HR' when the letters case is different", () => {
    const result1 = new CategoryFilter<DashboardDataset>("categories", ["hr"]).query(data);
    const result2 = new CategoryFilter<DashboardDataset>("categories", ["hR"]).query(data);
    const result3 = new CategoryFilter<DashboardDataset>("categories", ["Hr"]).query(data);

    expect(result1.length).toBe(2);
    expect(result2.length).toBe(2);
    expect(result3.length).toBe(2);
  });

  it("should return an array with 2 item when filtering the category by 'Sales' and 'Management'", () => {
    const catsFilter = new CategoryFilter("categories", ["Sales", "Management"]);
    const result = catsFilter.query(data);
    expect(result.length).toBe(2);
  });

  it("should return an array with 1 item when filtering by 'May' keyword", () => {
    const kwsFilter = new KeywordFilter("keywords", ["May"]);
    const result = kwsFilter.query(data);
    expect(result.length).toBe(1);
  });

  it("should return an array with 1 item when filtering by lowercased 'january' keyword", () => {
    const kwsFilter = new KeywordFilter("keywords", ["january"]);
    const result = kwsFilter.query(data);
    expect(result.length).toBe(1);
  });

  it("should return an array with 3 items when filtering by ['february', 'mars', 'april'] keywords", () => {
    const kwsFilter = new KeywordFilter("keywords", ["february", "mars", "april"]);
    const result = kwsFilter.query(data);
    expect(result.length).toBe(3);
  });
});
