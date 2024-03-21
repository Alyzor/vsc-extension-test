import * as vscode from 'vscode';

export async function createFolder(folderURI:vscode.Uri){
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(folderURI);
    
    if(!fStat){
        fs.createDirectory(folderURI);
    }else{
        throw fsError.FileExists();
    }
}

export async function renameFolder(oldPath: vscode.Uri, newPath:vscode.Uri){
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(oldPath);
    
    if(!fStat){
        throw fsError.FileNotFound();
    }else{
        fs.rename(oldPath, newPath);
    }
}

export async function deleteFolder(folderURI:vscode.Uri){
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(folderURI);
    
    if(!fStat){
        throw fsError.FileNotFound();
    }else{
        if(fStat.type !== vscode.FileType.Directory){
            throw fsError.FileNotADirectory();
        }else{
            fs.delete(folderURI);
        }
    }
}