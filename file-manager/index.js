import { getUserName } from "./src/utils/getUserName.js";
import { messageCurrentDir, messageExit, messageWelcome } from "./src/utils/messageLog.js";
import readline from "readline";
import path from "path";
import os from "os";


const args = process.argv.slice(2);

console.log(args);

const userName = getUserName(args);
console.log(userName);


const fileManager = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  console.log(messageWelcome(userName))

let currentDir = process.cwd();
console.log(messageCurrentDir(currentDir));

messageWelcome(userName);

messageExit(userName);