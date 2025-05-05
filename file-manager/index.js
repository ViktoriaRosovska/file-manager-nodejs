import { getUserName } from "./src/utils/getUserName.js";
import { messageCurrentDir, messageError, messageExit, messageWelcome, messageInputError } from "./src/utils/messageLog.js";
import readline from "readline";
import {processHandler} from "./src/commands/processHandler.js";
import process from 'process';

const args = process.argv.slice(2);
const userName = getUserName(args);

const fileManager = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

messageWelcome(userName)

let currentDir = process.cwd();

messageCurrentDir(currentDir);

fileManager.prompt();

fileManager.on("line", async (input) => {
    if (input.trim() === ".exit") {
        messageExit(userName);
        process.exit();
    }
    try {
        console.log("Command handler");
        currentDir = await processHandler(input.trim(), currentDir);
        if (currentDir) {
            messageCurrentDir(currentDir);
        }
        
        fileManager.prompt();
    } catch (err) {
        messageInputError(err);
    }
});

fileManager.on("close", async () => {
    messageExit(userName);
    process.exit();
})

fileManager.on('SIGINT', async () => {
    messageExit(userName);
    process.exit();
})

fileManager.on('error', async (error) => {
   messageError(error);
})