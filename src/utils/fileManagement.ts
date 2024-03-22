import * as vscode from 'vscode';
import * as generalUtils from './general';

    /**
     * Creates a new file.
     * newFile can be created like so:
     * 
     * ``` vscode.Uri.parse(parentFolderURI.toString() + "newFileName");``` 
     * @param newFile URI containing the file's destination with the new name.
     * 
     * @throws vscode.FileSystemError.FileExists - In case the user's directory already has a file with the same name as the new one.
     */
    export async function newFile(newFile:vscode.Uri){
        let fs = vscode.workspace.fs;
        let fsError = vscode.FileSystemError;
        let fStat = await fs.stat(newFile);
        
        if(!fStat){
            fs.createDirectory(newFile);
        }else{
            throw fsError.FileExists();
        }
    }

    /** 
    * Renames a file.
    * newPath can be created like so:
    * 
    * ``` vscode.Uri.parse(oldURI.toString() + "newName!");``` 
    * @param oldName URI fetched from workspace's FS. 
    * @param newName URI created with the user's new file name, without the old one.
    * 
    * @throws vscode.FileSystemError.FileNotFound - In case the user's file does not exist anymore.
    */
    export async function renameFile(oldName:vscode.Uri, newName:vscode.Uri){
        let fs = vscode.workspace.fs;
        let fsError = vscode.FileSystemError;
        let fStat = await fs.stat(oldName);
        
        if(fStat){
            fs.rename(oldName, newName);
        }else{
            throw fsError.FileNotFound();
        }
    }

    /**
     * Deletes a file.
     * 
     * @param uri URI containing the file's destination.
     * 
     * @throws vscode.FileSystemError.FileNotFound - In case the user's directory doesn't have the specified file.
     * @throws vscode.FileSystemError.FileIsADirectory - In case the URI doesn't point to a file.
     * 
     */
    export async function deleteFile(uri: vscode.Uri){
        let fs = vscode.workspace.fs;
        let fsError = vscode.FileSystemError;
        let fStat = await fs.stat(uri);
       console.log(fStat); 
        if(fStat){
            if(fStat.type !== vscode.FileType.File){
                throw fsError.FileIsADirectory();
            }else{
                fs.delete(uri);
            }
        }else{
            throw fsError.FileNotFound();
        }
    }
    /**
     * Returns a string with the text written the user's currently open  file. If "selection" is defined, will return only the text that has been selected by the user. 
     * 
     * @param {string} fileName - Specified file's name.
     * @param {vscode.Selection=} selection - If specified, returns user's selected text.   
     * 
     * @returns {string}
     */
    export function readOpenedFile(file:vscode.TextEditor, selection?: vscode.Selection): string{
        return file.document.getText(selection);
    }

    /**
     * Returns a string with the text written on a specified file existing on the workspace. 
     * 
     * @param {vscode.Uri} uri - URI link of the directory where the file should be found. 
     * 
     * @returns {string}
     */
    export async function readFileOnFS(uri:vscode.Uri): Promise<string|undefined>{
        if(vscode.workspace.workspaceFolders){
            try{
                var fileContent = await vscode.workspace.fs.readFile(uri);
                return Buffer.from(fileContent).toString();
            }catch(error){
                generalUtils.showMessage("Error reading file! " + error, true);
                return undefined;
            }
        }else{
            return undefined;
        }
    }
