import path from "path";
import {createReadStream, createWriteStream} from "fs";
import { readdir, writeFile, mkdir, rename, access, stat, unlink} from "fs/promises";
import { messageError, messageInputError, messageExistError, messageNotFound, messageFolderError, messageCopyError } from "../utils/messageLog.js";

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

export const cp = async (filename, distDir, currentDir) => {
    if (!distDir) {
        messageInputError();
    }
    const filePath = path.resolve(currentDir, filename);
    const distAbsDir = path.resolve(currentDir, distDir);
    const distPath = path.join(distAbsDir, path.basename(filename));
    
    try {
        await access(filePath);
        const statFolder = await stat(distAbsDir);
        if (!statFolder.isDirectory) {
            messageFolderError();
            return currentDir;
        }
        const createReadStr = createReadStream(filePath);
        const createWriteStr = createWriteStream(distPath);

        await new Promise((res, rej) => {
            createReadStr.on("error", rej);
            createWriteStr.on("error", rej).on("finish", res);

            createReadStr.pipe(createWriteStr);
        });
        console.log("File was successful copied");
        
    } catch (err) {
        messageCopyError(filename, err);
    }
    return currentDir;
}

export const mv = async (filename, distDir, currentDir) => {
    const filePath = path.resolve(currentDir, filename);
    if (!filename) {
        messageNotFound(filename);
        return currentDir;
    }
    if (!distDir) {
        messageInputError();
        return currentDir;
    }
    try {
        await cp(filename, distDir, currentDir);
        await rm(filename, currentDir);
    } catch (err) {
        messageError(err);
    }
    return currentDir;
}

export const rm = async(filename, currentDir) => {
    const filePath = path.resolve(currentDir, filename);
    if (!filePath) {
        messageNotFound(filename);
        return currentDir;
    }
    try {
        await unlink(filePath);
        console.log(`The file ${filename} was removed from  ${currentDir} folder`);
    } catch (err) {
        messageError(err);
    }
    return currentDir;
}