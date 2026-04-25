import { readFile, type File } from "./fs";

function readJsonFile<T>(file: File): Array<T> {
  const result = readFile<string>(file);

  const content: Array<T> = result.ok === true && result.content.length ? JSON.parse(result.content) : [];

  return content;
}

export default readJsonFile;
