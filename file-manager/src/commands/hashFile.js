import path from "path";
import { messageNotFound, messageHashError } from "../utils/messageLog.js";
import { createHmac, createHash } from "crypto";
import { access, stat } from "fs/promises";
import { createReadStream } from "fs";

export const hash = async (filename, secret, currentDir) => {
   
    const filePath = path.resolve(currentDir, filename);

    if (!filename) {
            messageNotFound(filename);
            return currentDir;
    }

    try {
        await access(filePath);
        const statFile = await stat(filePath);
            if (!statFile.isFile()) {
                messageNotFound(filename);
                return currentDir;
            }

        let hash; 

        if (secret) {
            hash = createHmac('sha256', secret);
        } else {
            hash = createHash('sha256');
        }
        
        const stream = createReadStream(filePath);
        
        await new Promise((res, rej) => {
            stream.on('data', (chunk) => {
                hash.update(chunk);
            })

            stream.on('end', ()=> {
                const result = hash.digest('hex');
                console.log(result);
                res();
            })

            stream.on('error', (err) => {
                console.error("Error in reading file: ", err );
                rej(err);
            })
        })
           
    } catch(err) {
        messageHashError(err)
    }
    return currentDir;
};