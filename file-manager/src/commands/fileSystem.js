import path from "path";
import {createReadStream} from "fs";

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