import { brotliCompress, brotliDecompress, constants } from "zlib";
import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { open } from "fs/promises";
import { Transform, pipeline } from "stream";
import { promisify } from "util";

const pipeL = promisify(pipeline);

class TStream extends Transform {
  constructor(operation) {
    super();
    this.operation = operation;
  };
  _transform(chunk, _, cb) {
    this.operation === "compress" 
      ? brotliCompress(chunk, (error, data) => { 
          if (error) { throw error }
          cb(null, data); 
        }) 
      : brotliDecompress(chunk, (error, data) => {
          if (error) { throw error }
          cb(null, data); 
        })
  };
};

export default async function(src, dest, operation) {
  if (operation !== "compress" && operation !== "decompress") { throw new Error("The operation can be only compress or decompress") }
  const fileSrc = getAbsolutePath(this.workDir, src);
  const fileDest = getAbsolutePath(this.workDir, dest);
  const filehandlerSrc = await open(fileSrc, "r");
  const filehandlerDest = await open(fileDest, "wx");
  await pipeL(filehandlerSrc.createReadStream(), new TStream(operation), filehandlerDest.createWriteStream());
  await filehandlerSrc.close();
  await filehandlerDest.close();
};