    import path from "path";
    import { promisify } from "util";
    import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync } from "fs";
    import { pipeline } from "stream";
    import { createBrotliCompress } from "zlib";
    import { messageError, messageExistError, messageInputError, messageNotFound, messageFileError } from "../utils/messageLog.js";
    
    export const compress = async (filename, distDir, currentDir) => {
        if (!filename) {
            messageInputError();
            return currentDir;
        }
        const filePath = path.resolve(currentDir, filename);
        
        if (!existsSync(filePath)) {
            messageExistError(filePath);
            return currentDir;
        }

        const distDirPath = path.resolve(currentDir, distDir ? distDir : currentDir);
        
        if (!existsSync(distDirPath)) {
            mkdirSync(distDirPath, { recursive: true });
        }
    
        const distFilePath = path.resolve(distDirPath, `${filename}.br`);
        try {
            const stats = statSync(distFilePath);
            if (stats.isDirectory()) {
                messageFileError(filename);
                return currentDir;
            }
        } catch (err) {
            messageNotFound(err);
        }
    
        const pipe = promisify(pipeline);
    
        try {
            const stream = createReadStream(filePath);
            const destination = createWriteStream(distFilePath);
            const brotli = createBrotliCompress();

            await pipe(stream, brotli, destination);
    
            console.log(`File successfully compressed to ${distFilePath}`);
        } catch (err) {
            messageError(err);
        }
    
        return currentDir;
    };