import { stderr, stdout } from "process";

export default class FileManager {
  constructor(options) {
    const {user = "Anonimus"}  = options;
    this.user = user;
  };

  getWelcome() {
    stdout.write("------------------------------------------------------------------------------------\n\n");
    stdout.write(`\t\t\tWelcom to the file manager, ${this.user}!\n`);    
  };

  getFarwell() {
    stdout.write(`\t\t\tThank you for using the file manager, ${this.user}!\n`);
    stdout.write("------------------------------------------------------------------------------------\n\n");  
  };

  exit() {
    this.getFarwell();
    process.exit(0);
  };

  make(command) {
    let commandName;
    try {
      [commandName] = command.toString("utf-8").split(" ");
      const [ , ...args] = command.toString("utf-8").split(" ");
      commandName = commandName.replace(/\n/g, "");
      if (commandName === ".exit") { this.exit() }                                                           // special check for RSSchool
      this[commandName](args);  
    }
    catch {
      stderr.write(`ERROR>>> Invalid input. The command "${commandName}" is not supported.\n`);
    };
  }
};