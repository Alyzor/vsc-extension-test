import * as vscode from 'vscode';
import * as  generalUtils from '../utils/general';
import * as workspaceNavigation from '../utils/workspaceNavigation';
import * as folderManagement from '../utils/folderManagement';

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
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if(!folderUriList){
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);

    if(folderList.length === 0){
        return;
    }
    let folderName = await vscode.window.showInputBox(
        {
        title:"Select a name for your new folder.",
        placeHolder:"New_Folder"
        }
    );

    if(folderName === undefined|| folderName === ""){
        generalUtils.showMessage("Please input a name for your new folder!", true);
        return;
    }

    var selectedFolder = await vscode.window.showQuickPick(
        folderList
    , {
        title:"Select where to create your new folder: ", 
    placeHolder:"Search here if there are too many folders!"}
    );
    var creationState = await folderManagement.createFolder(selectedFolder, folderName);

    if(creationState === undefined){
        generalUtils.showMessage("No folder selected!", true);
    }else if(creationState === false){
        generalUtils.showMessage("Folder already exists!", true);
    }else{
        generalUtils.showMessage("Folder created successfully!", false);
    }
}


async function renameFolder(){
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if(!folderUriList){
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);

    folderList.splice(0,1);

    var selectedFolder = await vscode.window.showQuickPick(
        folderList,
        {
            title: "Select the folder you wish to rename",
            placeHolder: "Search for folder...",
        }
    );
    if(!selectedFolder){
        generalUtils.showMessage("Please select a folder to rename.", true);
        return;
    }

    let newFolderName = await vscode.window.showInputBox(
        {
            title: "Please select a new name for your folder: ",
            placeHolder: selectedFolder.label
        }
    );

    if(newFolderName === undefined || newFolderName === ""){
        generalUtils.showMessage("Please input a name for your new folder!", true);
        return;
    }
    let renameState = folderManagement.renameFolder(selectedFolder, newFolderName);

    if(renameState === undefined){
        generalUtils.showMessage("Renamed folder " + selectedFolder.label +" to "+ newFolderName +"!", false);
    }else{
        generalUtils.showMessage("Error! " + renameState, true);
    }
}

async function deleteFolder(){
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if(!folderUriList){
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);

    folderList.splice(0,1);

    var selectedFolder = await vscode.window.showQuickPick(
        folderList,
        {
            title: "Select the folder you wish to delete",
            placeHolder: "Search for folder...",
        }
    );
    if(!selectedFolder){
        generalUtils.showMessage("Please select a folder to delete.", true);
        return;
    }

    var willDeleteFolder = await vscode.window.showInputBox({
        title: "To confirm, please write the name of the folder",
        placeHolder:selectedFolder.label
    });

    if(willDeleteFolder === selectedFolder.label){
        let deletionState = folderManagement.deleteFolder(selectedFolder);
        if(deletionState === undefined){
            generalUtils.showMessage("Folder " + selectedFolder.label! + " deleted successfully!",false);
        }else{
            generalUtils.showMessage("Error! "+ deletionState,true);
        }
    }else{
        generalUtils.showMessage("The name you wrote doesn't match with the folder's name!", true);
        return;
    }


}