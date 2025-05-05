export function getUserName(arg){
    const userNameArg = arg.find(argUser => argUser.startsWith("--username="));
    const userName = userNameArg ? userNameArg.split("=")[1] : "Anonymous"; 
    return userName;
}