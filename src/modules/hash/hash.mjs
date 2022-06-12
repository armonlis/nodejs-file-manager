import { getAbsolutePath } from "../getAbsolutePath.mjs";
import { createHash } from "crypto";
import view from "../view.mjs"

export default function(filePath) {
  const hash = createHash("sha256");
  hash.update(getAbsolutePath(this.workDir, filePath));
  view(hash.digest("hex"));
};