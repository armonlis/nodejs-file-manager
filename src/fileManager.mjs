import { stderr, stdout, env } from "process";

import up from "./modules/navigation/up.mjs";

export default class FileManager {
  constructor(options) {
    const {user = "Anonimus"}  = options;
    this.user = user;
    this.workDir = env.HOME;
    this.up = up.bind(this);
  };

  getWelcome() {
    stdout.write("------------------------------------------------------------------------------------\n\n");
    stdout.write(`\t\t\tWelcom to the file manager, ${this.user}!\n`);  
    this.getCurrentDir();  
  };

  getFarwell() {
    stdout.write(`\t\t\tThank you for using the file manager, ${this.user}!\n`);
    stdout.write("------------------------------------------------------------------------------------\n\n");  
  };

  getCurrentDir() {
    stdout.write(`You are currently in ${this.workDir}\n>>>`);
  };

  exit() {
    this.getFarwell();
    process.exit(0);
  };

  make(command) {
    let commandName;
    try {
      [commandName] = command.toString("utf-8").trim().split(" ").filter(el => el !== "" && el !== " ");
      const [ , ...args] = command.toString("utf-8").split(" ");
      if (commandName === ".exit") { this.exit() }                                                           // special check for RSSchool
      this[commandName](args);
      this.getCurrentDir();  
    }
    catch(error) {
      if (error.message === "this[commandName] is not a function") {
        stderr.write(`ERROR>>> Invalid input. The command "${commandName}" is not supported.\n`);
      } else {
        stderr.write(`ERROR>>> The operation failed. ${error.message}.\n`);  
      }
      this.getCurrentDir();
    };
  }
};