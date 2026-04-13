import type {File} from "../fileSystem/fs";
import readJsonFile from "./readJsonFile";

describe("read json file utility function", () => {
    it("should return empty array when the file is empty",() => {
        const file:File = {dirname:__dirname, filename:"empty.json"};

        const result = readJsonFile(file);
        expect(result).toEqual([]);
    });
    it("should convert string format into json format when the file is not empty",() => {
        const file:File = {dirname:__dirname, filename:"not-empty.json"};

        const result = readJsonFile<{name:string, empty:boolean}>(file);
        expect(result).not.toEqual([]);
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({empty:false})
        ]));
    });
});