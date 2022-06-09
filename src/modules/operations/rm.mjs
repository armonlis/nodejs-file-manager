import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { rm } from "fs/promises";

export default async function(filePath) {
  await rm(getAbsolutePath(this.workDir, filePath));
};