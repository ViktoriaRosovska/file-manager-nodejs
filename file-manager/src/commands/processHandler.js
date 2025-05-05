import { messageInputError } from "../utils/messageLog.js";
import * as fileNavigation from "./fileNavigation.js";
import * as fileSystem from "./fileSystem.js";
import * as hashFile from "./hashFile.js";
import * as osSystem from "./osSystem.js";

export const processHandler = async (input, currentDir) => {
    const [command, ...args] = input.split(" ");
    console.log(command, args);
    switch (command) {
        case "cat": {
            return fileSystem.cat(args[0]);
        }
        case "add": {
            return await fileSystem.add(currentDir, args.join(" "));
        }
        case "mkdir": {
            return  await fileSystem.fsmkdir(currentDir, args.join(" "));
        }
        case "rm": {
            return await fileSystem.rm(args[0], currentDir);
        }
        case "cp": {
            return await fileSystem.cp(args[0], args[1], currentDir);
        }
        case "mv": {
            return await fileSystem.mv(args[0], args[1], currentDir);
        }
        case "rn": {
            return await fileSystem.rn(args[0], args[1], currentDir);
        }
        case "cd": {
            return await fileNavigation.cd(args[0]);
        } 
        case "ls": {
            return await fileNavigation.ls(currentDir);
        }
        case "up": {
            return await fileNavigation.up(currentDir);
        }
        case "hash": {
            return await hashFile.hash(args[0], args[1], currentDir);
        }
        case "os": {
            return osSystem.osSys(args[0], currentDir);
        }
        default: {
            messageInputError();
        }
    }
}


