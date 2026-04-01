import fs from "fs";
import path from "path";

const FILE_PATH = ({ dirname, filename }: { dirname: string; filename: string }) => path.join(dirname, filename);

function writeFile({ dirname, filename, content }: { dirname: string; filename: string; content: string }) {

  fs.writeFileSync(FILE_PATH({dirname, filename}), content, "utf8")
}

function readFile({ dirname, filename }: { dirname: string; filename: string }) {
  const filePath = { dirname, filename };
  if (!fs.existsSync(FILE_PATH(filePath))) return "Error:not-found";

  return "hello";
}

export { writeFile, readFile };
