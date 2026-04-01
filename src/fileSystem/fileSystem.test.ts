import { readFile, writeFile } from "./fs.js";


describe("file system functions", () => {
    it("should write 'hello' to a filename 'data.local.txt'", () => {
        const filename = "data.local.txt";
        const content = "hello";
        writeFile({dirname:__dirname, filename, content});
        expect(readFile({dirname:__dirname, filename})).toEqual("hello");
    });

    it("should return an error when trying to read non-existent file",() => {
        expect(readFile({dirname:__dirname, filename:"not-exist"})).toContain("not-found");
    });
});