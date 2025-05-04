export function messageWelcome(userName) {
    console.log(`Welcome to the File Manager, ${userName}!`);
}

export function messageExit(userName) {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
}

export function messageCurrentDir(dir) {
    console.log(`You current dir is: ${dir}`);
}

export function messageError() {
    console.log("\nOperation failed");
}