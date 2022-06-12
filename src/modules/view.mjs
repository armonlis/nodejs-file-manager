import { stdout } from "process";

export default function(content, options) {
  const considerType = options?.considerType ?? true;
  const runFunc = options?.runFunc ?? true;
  const showEOL = options?.showEOL ?? false;
  let cont = content;
  let type = typeof cont;
  cont = type === "string" && showEOL ? cont.replace(/\r\n$/, "\\r\\n").replace(/\n$/, "\\n") : cont;
  cont = type === "function" && runFunc ? cont() : cont;
  type = typeof cont;
  type = type === "object" && Array.isArray(cont) ? "array" : type;
  if (!considerType) { stdout.write(`\n${cont}\n\n`); }
  else {
    switch (type) {
      case "string" : stdout.write(`\n${cont}\n\n`); break;
      case "number" : stdout.write(`\n${cont}\n\n`); break;
      case "boolean" : stdout.write(`\n${cont}\n\n`); break;
      case "array" : cont.forEach(el => stdout.write(`\n${typeof el === "object" ? JSON.stringify(el) : el}\n`)); stdout.write("\n"); break;
      case "function" : stdout.write(`\n${cont}\n\n`) ; break;
      default :  throw new Error("This type of content can not be viewed.")   
    }
  }  
};