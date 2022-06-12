import path from "path";
import { stat } from "fs/promises";
import { constants } from "fs";

export default async function(newPath = "") {
  if (path.isAbsolute(newPath)) {
    const status = await stat(newPath);
    if (status.isFile()) { throw new Error(`${newPath} is a file`) }
    this.workDir = newPath;   
  } else {
    const joinedPath = path.join(this.workDir, newPath);
    const status = await stat(joinedPath);
    if (status.isFile()) { throw new Error(`${newPath} is a file`) }
    this.workDir = joinedPath;
  }
};