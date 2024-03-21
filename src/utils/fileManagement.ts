import * as vscode from 'vscode';
import * as generalUtils from './general';

    /**
     * Creates a new file in the specified directory.
     * 
     * @param {vscode.Uri} newFile Previously created URI 
     * that points to the file's desired location.
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

    export async function deleteFile(uri: vscode.Uri){
        let fs = vscode.workspace.fs;
        let fsError = vscode.FileSystemError;
        let fStat = await fs.stat(uri);
        
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
