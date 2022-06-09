import os from "os";
import view from "../view.mjs";

export default async function(request) {
  const options = {
    showEOL: false,
    runFunc: true,
    considerType: true,
  }
  let res;
  switch (request) {
    case "--EOL" : res = os[request.slice(2)]; options.showEOL = true; break;
    case "--cpus" : res = os[request.slice(2)]; break;
    case "--homedir" : res = os[request.slice(2)]; break;
    case "--username" : res = os.userInfo().username; break;
    case "--arhitecture" : res = os.arch(); break;
    default: res = null; break;
  };
  if (!res) { throw new Error(`The flag ${request} is not supported`) }
  view(res, options);
}