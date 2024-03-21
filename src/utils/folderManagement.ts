import * as vscode from 'vscode';


class OpResult<T> { //define T as a class or primitive type

    public OpResult(result:T|undefined, error:string|undefined) {
        if(result !== undefined && error !== undefined) {
            //throw exception
        }

        if(result) {
            this._hasSucceeeded = true;
            this._result = result;
        }
        else {
            this._error = error;
        }
    }


    private _hasSucceeeded:boolean = false;

    private _result:T|undefined = undefined;

    private _error:string|undefined = undefined;

     hasSucceeded():boolean {
        return this._hasSucceeeded;
    }

    getResult():T|undefined {
        return this._result;
    }

    getError():string|undefined {
        return this._error;
    }
}


//TODO refactor this code to not use anything that comes from the "interface". This is a utils class, and shouldn't know about how folders are accessed
export async function createFolder(selectedFolder: vscode.QuickPickItem, folderName:string):Promise<boolean>{
    
    let folderURI = vscode.Uri.parse(selectedFolder?.detail! + '/' + folderName);

    try {
        await vscode.workspace.fs.createDirectory(folderURI);
        return true;
    }
    catch {
        return false;
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