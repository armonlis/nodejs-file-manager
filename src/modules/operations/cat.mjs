import { stdout } from "process";
import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { open } from "fs/promises";

export default async function(filePath) {
  const filehandle = await open(getAbsolutePath(this.workDir, filePath), "r");
  const file = await filehandle.readFile({encoding: "utf-8"});
  stdout.write(`\n${file}\n`);
};