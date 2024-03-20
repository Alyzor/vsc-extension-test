import * as vscode from 'vscode';

export async function createFolder(selectedFolder: vscode.QuickPickItem |undefined ,folderName:string):Promise<boolean | undefined>{
    if(selectedFolder !== undefined){
        var folderURI = vscode.Uri.parse(selectedFolder?.detail! + '/' + folderName);
    }else{
        return undefined;
    }
    

    try{
        await vscode.workspace.fs.stat(folderURI);
        return false;
    }catch(err){
        vscode.workspace.fs.createDirectory(folderURI);
        return true;
    }
}

export function renameFolder(selectedFolder: vscode.QuickPickItem, newFolderName:string){

    let oldPath:vscode.Uri = vscode.Uri.parse(selectedFolder.detail!);
    let newPath:vscode.Uri = vscode.Uri.parse(selectedFolder.detail!.replace(selectedFolder.label, newFolderName));

    try{
        vscode.workspace.fs.rename(oldPath, newPath);
        return;
    }catch(err){
        return err;
    }
}

export function deleteFolder(selectedFolder:vscode.QuickPickItem){
    try{
        vscode.workspace.fs.delete(vscode.Uri.parse(selectedFolder.detail!));
        return;
    }catch(err){
        return err;
    }
}