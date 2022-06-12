import { cp, rm } from "fs/promises";
import { getAbsolutePath } from "../getAbsolutePath.mjs";

export default async function(src, dest, remove = false) {
  await cp(getAbsolutePath(this.workDir, src), getAbsolutePath(this.workDir, dest), { errorOnExist: true });
  if (remove) { await rm(getAbsolutePath(this.workDir, src)) }
};