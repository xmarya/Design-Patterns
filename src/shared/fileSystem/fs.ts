import fs from "fs";
import path from "path";

export type File = { dirname: string; filename: string };
const FILE_PATH = ({ dirname, filename }: File) => path.join(dirname, filename);

function isFileExist(file: File) {
  return fs.existsSync(FILE_PATH(file));
}

function writeFile({ file, content }: { file: File; content: any }) {
  // this should deal with its cases of exist and non-existent files
  if (!isFileExist(file)) {
    fs.writeFileSync(FILE_PATH(file), content, "utf8");
    return;
  }

  fs.appendFileSync(FILE_PATH(file), content, "utf8");
}

function readFile(file: File) {
  // this should deal with its cases of exist and non-existent files
  if (!isFileExist(file)) return "Error:not-found";
  const content = fs.readFileSync(FILE_PATH(file), { encoding: "utf8" });
  return content;
}

export { isFileExist, writeFile, readFile };
