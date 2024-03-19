import * as vscode from 'vscode';
import * as generalUtils from './general';

    /**
     * Creates a new file in the specified directory.
     * 
     * @param {vscode.Uri} dir Loocation on user's workspace where file will be created.
     * @param {string} fileName Specified name for the new file.
     * @param {string} extension Specified extension for the new file.
     */
    export function newFile(file:vscode.TextEditor, extension:string){

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
