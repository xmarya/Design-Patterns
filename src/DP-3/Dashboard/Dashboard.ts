import { fileURLToPath } from "url";
import type { File } from "../../shared/utils/fileSystem/fs";
import path from "path";
import readJsonFile from "../../shared/utils/fileSystem/readJsonFile";
import type { DashboardDataset } from "./types";
export class Dashboard {
  private file: File;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirname = path.join(__dirname, "../_shared/infra/db");
    this.file = { dirname, filename: "dataset.json" };
  }
  getByDate({ dateStarts, dateEnds }: { dateStarts: string; dateEnds: string }) {
    const dataset = readJsonFile<DashboardDataset>(this.file);
    const dateStartsTime = new Date(dateStarts).getTime();
    const dateEndsTime = new Date(dateEnds).getTime();
    const result = dataset.filter(({ date }) => new Date(date).getTime() >= dateStartsTime && new Date(date).getTime() <= dateEndsTime);

    return result;
  }

  getByStatus(status: DashboardDataset["status"]) {
    const dataset = readJsonFile<DashboardDataset>(this.file);
    return dataset.filter((ds) => ds.status === status);
  }
}
