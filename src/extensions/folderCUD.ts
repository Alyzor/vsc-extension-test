import * as vscode from 'vscode';
import { generalUtils } from '../utils/general';
import { workspaceNavigation } from '../utils/workspaceNavigation';

export async function folderCUD(){

    var userSelections = await vscode.window.showQuickPick(
        [
            {
                label:"Create",
                value: "create"
            },				
            {
                label:"Rename",
                value: "rename"
            },				
            {
                label:"Delete",
                value: "delete"
            },
        ]
        ,
        {
            title:"Select an option...",
            canPickMany:false
        }
    );

    if(!userSelections){
        generalUtils.showMessage("Please select an option!", true);
        return;
    }

    if(userSelections.value === "create"){
        createNewFolder();
    }else
    if(userSelections.value === "rename"){
        renameFolder();
    }else
    {
        deleteFolder();
    }
}

interface folderDetails{
    name: string,
    uri: vscode.Uri
}

async function createNewFolder(){
    let existingFolders = await workspaceNavigation.getWorkspaceFolders();

    if(existingFolders === undefined){
         return; 
    }

    let folderName = await vscode.window.showInputBox(
        {
        title:"Select a name for your new folder.",
        placeHolder:"New_Folder"
        }
    );
    if(folderName === undefined){
        return;
    }else if (folderName === ""){
        generalUtils.showMessage("Please input a name for your new folder!", true);
    }

    var folderList:folderDetails[] = []; 

    for(let folder of existingFolders){
        var folderPush:folderDetails = {name: "", uri: folder};
        var tempName = folder.toString().split('/');
        folderPush.name = tempName[tempName.length-1];
        folderList.push(folderPush);
    }
    
    //TODO: display folders as tree and make user select where to store new folder.
}

function renameFolder(){

}

function deleteFolder(){

}