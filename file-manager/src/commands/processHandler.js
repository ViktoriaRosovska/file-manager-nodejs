import * as fileNavigation from "./fileNavigation.js";
import * as fileSystem from "./fileSystem.js";

export const processHandler = async (input, currentDir) => {
    const [command, ...args] = input.split(" ");
    console.log(command, args);
    switch (command) {
        case "cat": {
            return fileSystem.cat(args[0]);
        } 
        case "ls": {
            return await fileNavigation.ls(currentDir);
        }
    }
}


