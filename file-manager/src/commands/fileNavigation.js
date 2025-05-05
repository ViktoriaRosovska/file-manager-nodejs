import {readdir} from "fs/promises";
import { messageError, messageInputError, messageFolderError } from "../utils/messageLog.js";
import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { homedir } from "os";

export const ls = async (filePath) => {
   
    try {
   
        const folders = [];
        const files = [];
        const fileList = await readdir(filePath, {withFileTypes: true});
   
        for (const file of fileList) {
            if (file.isDirectory()) {
                folders.push({name: file.name, type: "directory"});
            } else {
                files.push({name: file.name, type: "file"})
            }
        }
        const sortedFiles = [...sortByName(folders), ...sortByName(files)];
        
        console.table(sortedFiles);
    } catch {
        messageError();
    }
    return filePath;
};
  

let previousPath = "";

export const cd = async (filePath) => {
   
    const currentDir = process.cwd();
    if (!filePath) {
        messageInputError();
        return filePath;
    }
    
    let targetPath;
   
    if (filePath === ".."){
        if (!previousPath) {
            messageInputError();
            return currentDir;
        }

        targetPath = previousPath;

    } else  if (filePath === "~"){
        targetPath = homedir();
    } else {
        if (path.isAbsolute(filePath)) {
                targetPath = filePath;
            } else {
                targetPath = path.resolve(currentDir, filePath);
            }
    }
    
    try {
       
        const stat = await fs.stat(targetPath);
    
        if (!stat.isDirectory()) {
            messageFolderError();
            return currentDir;
        }
        previousPath = currentDir;
        process.chdir(targetPath);
        return process.cwd();
      } catch (err) {
            messageError(err);
            return currentDir;
      }
 }


 export const up = async (filePath) => {
    const parentDir = path.dirname(filePath);
    const rootPath = path.parse(filePath).root;

    if (rootPath === filePath || parentDir === filePath)
        return filePath;

    process.chdir(parentDir);
    return process.cwd();
 }

  