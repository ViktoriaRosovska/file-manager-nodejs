import path from "path";
import {createReadStream} from "fs";
import { readdir, writeFile, mkdir, rename, access } from "fs/promises";
import { messageError, messageInputError, messageExistError, messageNotFound } from "../utils/messageLog.js";

export const cat = (filePath) => {
    if (!filePath) {
        messageInputError();
    }
    
    const fullPath = path.resolve(process.cwd(), filePath);
    const readableStream = createReadStream(fullPath, {encoding: "utf-8"});

    readableStream.on("data", chunk => {
        process.stdout.write(chunk);
    });

    readableStream.on("error", () => {
        messageError();
    })
    return filePath;
 };

export const add = async (filePath, name) => {
        try {
            const files = await readdir(filePath);
            console.log(files);
            for (let file of files){
                if (file.includes(files)) {
                    messageExistError(file.name);
                    return filePath;
                } 
            }
            await writeFile(path.join(filePath, name), "", {flag: "wx"});
            
        
        } catch (err) {
            console.error(err);
        }
        return filePath;
 }

export const fsmkdir = async (filePath, name) => {
    try {
        if (!name) {
        messageInputError();
        return filePath;
    }
        await mkdir(path.resolve(filePath, name), {recursive: false})
       
    } catch (err) {
        messageError(err);
    } 
    return filePath;
} 

export const rn = async (oldName, newName, filePath) => {
    if (!oldName || !newName) {
        messageInputError();
        return filePath;
    }

    const oldPath = path.resolve(filePath, oldName);
    const newPath = path.resolve(path.dirname(oldPath), newName);

    try {
        await access(oldPath);
    } catch {
        messageNotFound(oldName);
        return filePath;
    }

    try {
        await access(newPath);
        messageExistError(newName);
        return filePath;
    } catch {
        messageInputError();
    }

    try {
        await rename(oldPath, newPath);
        console.log(`Rename: ${oldName} in ${newName}`);
    } catch (err) {
        messageError(err);
    }

    return filePath;
};

