import { stdin, stdout } from "process";
import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { open } from "fs/promises";
import { Writable, pipeline } from "stream";
import { promisify } from "util";

const pipeL = promisify(pipeline);

class WStream extends Writable {
  _write(chunk, _, cb) {
    stdout.write(chunk);  
  };
};

export default async function(filePath) {
  const filehandle = await open(getAbsolutePath(this.workDir, filePath), "r");
  const stream = filehandle.createReadStream();
  stream.on("close", () => { stdout.write("\n"); this.printWorkDir() });
  stdout.write("\n");
  await pipeL(stream, new WStream());
};