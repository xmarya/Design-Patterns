export type DashboardDataset = {
  date: Date;
  status: "in-progress" | "active" | "postponed";
  categories: Array<string>;
  keywords: Array<string>;
};
