import * as fs from "fs";

export function readLines(filename: string) : string[] {
    return fs.readFileSync(filename).toString().split("\r\n");
}