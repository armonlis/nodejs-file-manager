import path from "path";
import { stderr } from "process";

export default function() {
  this.workDir = this.workDir.split(path.sep).pop().length === 0 ? this.workDir : this.workDir.split(path.sep).slice(0, -1).join(path.sep);
};