import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

export default async function(newPath = "") {
  if (path.isAbsolute(newPath)) {
    await access(newPath, constants.F_OK);
    this.workDir = newPath;   
  } else {
    const joinedPath = path.join(this.workDir, newPath);
    await access(joinedPath, constants.F_OK);
    this.workDir = joinedPath;
  }
};