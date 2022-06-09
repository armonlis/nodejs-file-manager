import { readdir } from "fs/promises";
import { stdout } from "process";

export default async function() {
  const contents = await readdir(this.workDir);
  contents.forEach(el => stdout.write(`${el}\n`));
};