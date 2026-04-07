import { readFile, writeFile, isFileExist } from "./fs.js";

describe("file system functions", () => {
  const file = { dirname: __dirname, filename: "data.local.txt" };
  afterAll(() => {
    writeFile({ file, content: "" });
  });
  it("should return false for non-existent file", () => {
    expect(isFileExist({ dirname: __dirname, filename: "file.txt" })).toBeFalsy();
  });

  it("should create a filename 'data.local.txt' and write 'hello'", () => {
    const content = "hello";

    writeFile({ file, content });
    expect(isFileExist(file)).toBeTruthy();
    expect(readFile(file)).toMatchObject({ok:true, content: "hello"});
  });

  it("should return an error message when trying to read non-existent file", () => {
    expect(readFile({ dirname: __dirname, filename: "not-exist" }))
    .toMatchObject({ok:false, message: expect.stringMatching(/not-found/i)});
  });
});