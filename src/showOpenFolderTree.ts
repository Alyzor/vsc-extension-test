import * as vscode from 'vscode';

import * as fs from 'fs';

export function showOpenFolderTree(){
    if(vscode.workspace.workspaceFolders?.length === 0){
        var filePath = vscode.workspace.workspaceFolders![0].uri!;
        recursiveReadDirectory(filePath);
    }else{
        vscode.window.showErrorMessage("No workspace detected! Please open a folder.");
    }
}

async function recursiveReadDirectory(dir:vscode.Uri){
    
    var currentDir:[string, number][] = [];
    await vscode.workspace.fs.readDirectory(dir).then(result => currentDir = result);
    
    var splitDirectory = dir.toString().split('/');

    var fileList:vscode.Uri[] = [];

    var dirList:vscode.Uri[] = [];

    console.log("pasta aberta: "+ splitDirectory[splitDirectory.length -1]);
    console.log("---------------------");
    currentDir.forEach(async i =>{
        var tempUri = vscode.Uri.parse(dir.toString()+"/"+i[0]);
        switch(i[1]){
            case 1:
                fileList.push(tempUri);
            break;
            case 2:
                dirList.push(tempUri);
            break;
            case 64:
                if(symLinkIsFile(tempUri)){
                    fileList.push(tempUri);
                }else{
                    fileList.push(tempUri);
                }
            break;
            default:
                vscode.window.showErrorMessage(
                    "Error!: " + i[0] + " is an unknown file!"
                );
            break;
        }
    });
    for(const file of fileList){
        var fileText:string | undefined = "";
        await readFile(file).then(text => fileText = text);
        console.log(fileText);
    };

    for (const dir of dirList){
        recursiveReadDirectory(dir);
    };

    console.log("---------------------");
}

async function readFile(file:vscode.Uri){
    try{
        const content = await vscode.workspace.fs.readFile(file);
        return Buffer.from(content).toString();
    } catch (error){
        vscode.window.showErrorMessage("Error reading file " + file +"!\n "+error);
        return undefined;
    }
}

function symLinkIsFile(path:vscode.Uri):boolean{
    const targetStats = fs.statSync(path.toString());

    return targetStats.isDirectory() || targetStats.isFile();
}