import {readdir} from "fs/promises";
import { messageError } from "../utils/messageLog.js";


export const ls = async (currentDir) => {
   try {
   
   const folders = [];
   const files = [];
   const fileList = await readdir(currentDir, {withFileTypes: true});
   
    for (const file of fileList) {
        if (file.isDirectory()) {
            folders.push({name: file.name, type: "directory"});
        } else {
            files.push({name: file.name, type: "file"})
        }
    }
    const sortedFiles = [...folders, ...files];
    console.table(sortedFiles);
    } catch {
        messageError();
    }
    return currentDir;
};
  
  // Сортировка по алфавиту
  function sortByName(a, b) {
    return a.name.localeCompare(b.name);
  }
