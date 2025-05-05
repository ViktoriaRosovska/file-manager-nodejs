import os from "os";
import { messageError, messageInputError } from "../utils/messageLog.js";

export const osSys = (command, currentDir) => {
    switch (command) {
        case "--EOL": {
            console.log(JSON.stringify(os.EOL));
            break;
        }
        case "--cpus": {
            console.table(os.cpus().map((cpu) => ({
                Model: cpu.model,
                ClockRate: `${(cpu.speed / 1000).toFixed(2)} GHz`
            })));
            break;
        }
        case "--homedir": {
            console.log(os.homedir());
            break;
        }
        case "--username": {
            console.log(os.userInfo().username);
            break;
        }
        case "--architecture": {
            console.log(os.arch());
            break;
        }
        default: {
            messageInputError();
        }
    }
    return currentDir;
    
}