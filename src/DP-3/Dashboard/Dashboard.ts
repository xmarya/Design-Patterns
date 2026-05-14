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
}
