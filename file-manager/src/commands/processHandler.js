import * as fileNavigation from "./fileNavigation.js";
import * as fileSystem from "./fileSystem.js";

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
            return console.log("mkdir");
        }
        case "rn": {
            return console.log("rename file");
        }
        case "cp": {
            return console.log("copy file");
        }
        case "mv": {
            return console.log("move file");
        }
        case "rm": {
            return console.log("remove file");
        }
        case "cd": {
            return await fileNavigation.cd(currentDir, args[0]);
        } 
        case "ls": {
            return await fileNavigation.ls(currentDir);
        }
        case "up": {
            return await fileNavigation.up(currentDir);
        }
    }
}


