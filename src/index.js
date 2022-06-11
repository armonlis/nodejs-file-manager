import { argv, stderr, stdin } from "process";

import FileManager from "./fileManager.mjs";

const runManager = () => {
  try {
    const args = argv.slice(2);
    let user = args.length === 2 && args[0] === "--username" ? args[1] : undefined;
    user = !user && args.length === 1 && args[0].startsWith("--username=") ? args[0].slice(11) : user;
    const manager = new FileManager({user});
    manager.getWelcome();
    process.on("SIGINT", () => manager.exit());
    stdin.on("data", data => manager.make(data));
    
  }
  catch(err) {
    stderr.write(`FATAL ERROR>>> ${err.message}.\n`);
  };
};


runManager();