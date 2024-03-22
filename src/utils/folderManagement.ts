import * as vscode from 'vscode';

/**
 * Creates a new folder.
 * folderURI can be created like so:
 * 
 * ``` vscode.Uri.parse(parentFolderURI.toString() + "newFolderName");``` 
 * @param folderURI URI containing the folder's destination with the new name.
 * 
 * @throws vscode.FileSystemError.FileExists - In case the user's directory already has a folder with the same name as the new one.
 */
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

/**
 * Renames a folder.
 * newPath can be created like so:
 * 
 * ``` vscode.Uri.parse(oldURI.toString() + "newName!");``` 
 * @param oldPath URI fetched from workspace's FS. 
 * @param newPath URI created with the user's new folder name, without the old one.
 * 
 * @throws vscode.FileSystemError.FileNotFound - In case the user's folder does not exist anymore.
 */
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

/**
 * Deletes a folder.
 * 
 * @param folderURI URI containing the folder's destination.
 * 
 * @throws vscode.FileSystemError.FileNotFound - In case the user's directory doesn't have the specified folder.
 * @throws vscode.FileSystemError.FileNotADirectory - In case the URI doesn't point to a folder.
 * 
 */
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