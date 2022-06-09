import { stderr, stdout, env } from "process";

import up from "./modules/navigation/up.mjs";
import cd from "./modules/navigation/cd.mjs";
import ls from "./modules/navigation/ls.mjs";

export default class FileManager {
  constructor(options) {
    const {user = "Anonimus"}  = options;
    this.user = user;
    this.workDir = env.HOME;
    this.up = up.bind(this);
    this.cd = cd.bind(this);
    this.ls = ls.bind(this);
  };

  getWelcome() {
    stdout.write("------------------------------------------------------------------------------------\n");
    stdout.write(`\t\t\tWelcom to the file manager, ${this.user}!\n\n`);  
    this.getCurrentDir();  
  };

  getFarwell() {
    stdout.write(`\n\n\t\t\tThank you for using the file manager, ${this.user}!\n`);
    stdout.write("------------------------------------------------------------------------------------\n\n");  
  };

  getCurrentDir() {
    stdout.write(`You are currently in ${this.workDir} >>> `);
  };

  exit() {
    this.getFarwell();
    process.exit(0);
  };

  async make(command) {
    let commandName;
    try {
      [commandName] = command.toString("utf-8").trim().split(" ").filter(el => el !== "" && el !== " ");
      const [ , ...args] = command.toString("utf-8").split(" ");
      args.length > 0 ? args[args.length - 1] = args[args.length - 1].replace(/\n/, "") : undefined;
      if (commandName === ".exit") { this.exit() }                                                           // special check for RSSchool
      await this[commandName](...args);
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