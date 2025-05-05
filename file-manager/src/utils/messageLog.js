export function messageWelcome(userName) {
    console.log(`Welcome to the File Manager, ${userName}!`);
}

export function messageExit(userName) {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
}

export function messageCurrentDir(dir) {
    console.log(`You current dir is: ${dir}`);
}

export function messageError(err) {
    console.error(`Operation failed: `, err ? `: ${err.message}` : "");
}

export function messageInputError(err) {
    console.log(`Invalid input`, err ? `: ${err.message}` : "");
}

export function messageFolderError(dir) {
    console.log(`${dir} is not a folder`);
}

export function  messageExistError(name) {
    console.error(`The file or folder with name ${name} already exist`);
}

export function messageNotFound(name) {
    console.error(`The file of folder with name ${name} doesn't exist`);
}