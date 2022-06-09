import { open } from "fs/promises";
import { getAbsolutePath } from "../getAbsolutePath.mjs";

export default async function(filename) {
   const filehandle = await open(getAbsolutePath(this.workDir, filename), "wx");
   await filehandle?.close();  
};