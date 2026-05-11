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
  getDashboardData() {
    return readJsonFile<DashboardDataset>(this.file);
  }
  getByDate({ dateStarts, dateEnds }: { dateStarts: string; dateEnds: string }) {
    const dateStartsTime = new Date(dateStarts).getTime();
    const dateEndsTime = new Date(dateEnds).getTime();
    const result = this.getDashboardData().filter(({ date }) => new Date(date).getTime() >= dateStartsTime && new Date(date).getTime() <= dateEndsTime);

    return result;
  }

  getByStatus(status: DashboardDataset["status"]) {
    return this.getDashboardData().filter((ds) => ds.status === status);
  }

  getByCategory(categories: DashboardDataset["categories"]) {
    const joinedCats = categories.join().toLocaleLowerCase();
    const result = this.getDashboardData().filter(({ categories: cats }) => cats.some((cat) => joinedCats.includes(cat.toLowerCase())));

    return result;
  }

  getByKeyword(keywords: DashboardDataset["keywords"]) {
    const joinedKeywords = keywords.join().toLocaleLowerCase();
    const dataset = this.getDashboardData();
    return dataset.filter((ds) => ds.keywords.some((kw) => joinedKeywords.includes(kw.toLocaleLowerCase())));
  }
}
