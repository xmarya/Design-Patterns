import fs from "fs";
import path from "path";

export type File = { dirname: string; filename: string };
const FILE_PATH = ({ dirname, filename }: File) => path.join(dirname, filename);

function isFileExist(file: File) {
  return fs.existsSync(FILE_PATH(file));
}

function writeFile({ file, content }: { file: File; content: any }) {
  fs.writeFileSync(FILE_PATH(file), content, "utf8");
}

function readFile<T>(file: File):{ok:false, message:string} |  {ok:true, content:T}{
  if (!isFileExist(file)) return {ok:false, message:"Error:not-found"};
  const content = fs.readFileSync(FILE_PATH(file), { encoding: "utf8" }) as T;
  return {ok:true, content};
}

export { isFileExist, writeFile, readFile };
