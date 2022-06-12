import { rename, access } from "fs/promises";
import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { constants } from "fs";
import path from "path";

export default async function(oldPath, newFilename) {
  const pathToFile = getAbsolutePath(this.workDir, oldPath);
  const pathToNewFile = path.join(path.dirname(pathToFile), newFilename);
  try {
    await access(pathToNewFile, constants.F_OK);
    throw new Error(`The file ${newFilename} is already exist`)     
  }
  catch(error) {
    if (error.message === `The file ${newFilename} is already exist`) { throw error }
    try {
      await rename(pathToFile, pathToNewFile);  
    }
    catch (error) {
      throw(error)
    };  
  };
};