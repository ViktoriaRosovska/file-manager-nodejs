import path from "path";
import {createReadStream} from "fs";
import { readdir, writeFile } from "fs/promises";

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
    
 };

export const add = async (filePath, name) => {
        try {
            const files = await readdir(filePath);
            console.log(files);
            for (let file of files){
                if (file.at(files)) {
                    console.log(`File with ${name} name already exist`);
                    return filePath;
                } 
            }
            await writeFile(path.join(filePath, name), "", {flag: "wx"});
            return filePath;
        
        } catch (err) {
            console.error(err);
        }
 }

