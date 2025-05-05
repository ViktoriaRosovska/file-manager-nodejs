import path from "path";
import {createReadStream} from "fs";
import { readdir, writeFile, mkdir, rename } from "fs/promises";
import { messageError, messageInputError } from "../utils/messageLog.js";

export const cat = (filePath) => {
    if (!filePath) {
        throw new Error("Cann't read file. Invaid input");
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
                    console.log(`File with ${name} name already exist`);
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

export const rn = async (oldName, name, filePath) => {
    if (!oldName || !name) {
        messageInputError();
        return filePath;
    }

    const oldPath = path.resolve(filePath, oldName);
    const newPath = path.resolve(path.dirname(oldPath), name);

    try {
        await fs.access(oldPath); // Проверка, существует ли старый файл
    } catch {
        messageError(`Файл или папка "${oldName}" не найдены`);
        return filePath;
    }
    try {
        await fs.access(newPath); // Проверка, существует ли уже новое имя
        messageError(`Файл или папка с именем "${name}" уже существует`);
        return filePath;
    } catch {
        // Всё ок — целевого файла пока нет
    }
    try {
        await rename(oldPath, newPath);
        console.log(`Переименовано: ${oldName} → ${name}`);
    } catch (err) {
        messageError(err);
    }
    return filePath;
}
