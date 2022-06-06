import { argv, stderr, stdin } from "process";

import FileManager from "./fileManager.mjs";

const runManager = () => {
  try {
    const args = argv.slice(2);
    const user = args[0] === "--username" ? args[1] : undefined;
    const manager = new FileManager({user});
    manager.getWelcome();
    process.on("SIGINT", () => manager.exit());
    stdin.on("data", data => manager.make(data));
    
  }
  catch(err) {
    stderr.write(`ERROR>>> ${err.message}.\n`);
  };
};


runManager();