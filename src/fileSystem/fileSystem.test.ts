import { readFile, writeFile, isFileExist } from "./fs.js";

describe("file system functions", () => {
  it("should return false for non-existent file", () => {
    expect(isFileExist({ dirname: __dirname, filename: "file.txt" })).toBeFalsy();
  });

  it("should create a filename 'data.local.txt' and write 'hello'", () => {
    const content = "hello";
    const file = { dirname: __dirname, filename: "data.local.txt" };
    writeFile({ file, content });
    expect(isFileExist(file)).toBeTruthy();
    expect(readFile(file)).toEqual("hello");
  });

  it("should return an error when trying to read non-existent file", () => {
    expect(readFile({ dirname: __dirname, filename: "not-exist" })).toContain("not-found");
  });

  it("should append new content without overwriting the file", () => {
    const content = "world";
    const file = { dirname: __dirname, filename: "data.local.txt" };
    writeFile({ file, content });
    expect(readFile(file)).toEqual("hello world");
  });
});