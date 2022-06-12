import path from "path";

export function getAbsolutePath(workDir, src) {
  if (path.isAbsolute(src)) {
    return src;
  } else {
    return path.join(workDir, src);
  }
};