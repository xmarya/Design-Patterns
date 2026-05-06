export type DashboardDataset = {
  date: string;
  status: "in-progress" | "active" | "postponed";
  categories: Array<string>;
  keywords: Array<string>;
};
