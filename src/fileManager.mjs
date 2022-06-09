import { stderr, stdout, env, stdin } from "process";

import up from "./modules/navigation/up.mjs";
import cd from "./modules/navigation/cd.mjs";
import ls from "./modules/navigation/ls.mjs";
import cat from "./modules/operations/cat.mjs";
import add from "./modules/operations/add.mjs";
import rn from "./modules/operations/rn.mjs";
import cp from "./modules/operations/cp.mjs";
import rm from "./modules/operations/rm.mjs";

export default class FileManager {
  constructor(options) {
    const {user = "Anonimus"}  = options;
    this.user = user;
    this.workDir = env.HOME;
    this.up = up.bind(this);
    this.cd = cd.bind(this);
    this.ls = ls.bind(this);
    this.cat = cat.bind(this);
    this.add = add.bind(this);
    this.rn = rn.bind(this);
    this.cp = cp.bind(this);
    this.mv = (src, dest) => cp.bind(this, src, dest, true)();
    this.rm = rm.bind(this);
  };

  getWelcome() {
    stdout.write("------------------------------------------------------------------------------------\n");
    stdout.write(`\t\t\tWelcom to the file manager, ${this.user}!\n\n`);  
    stdout.write(`You are currently in ${this.workDir} >>> `);  
  };

  getFarwell() {
    stdout.write(`\n\n\t\t\tThank you for using the file manager, ${this.user}!\n`);
    stdout.write("------------------------------------------------------------------------------------\n\n");  
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
      if (commandName === ".exit") { this.exit() }                                                            // special check for RSSchool
      await this[commandName](...args);
      stdout.write(`You are currently in ${this.workDir} >>> `);
    }
    catch(error) {
      if (error.message === "this[commandName] is not a function") {
        stderr.write(`ERROR>>> Invalid input. The command "${commandName}" is not supported.\n`);
      } else {
        stderr.write(`ERROR>>> The operation failed. ${error.message}.\n`);  
      }
      stdout.write(`You are currently in ${this.workDir} >>> `);
    };
  }
};