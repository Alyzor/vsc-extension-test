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
    let newPath = vscode.Uri.parse(selectedFolder!.detail! + '/' + folderName);
    
    folderManagement.createFolder(newPath).catch(()=> generalUtils.showMessage("Folder already exists!", true));
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
    
    let oldPath:vscode.Uri = vscode.Uri.parse(selectedFolder.detail!);
    let newPath:vscode.Uri = vscode.Uri.parse(selectedFolder.detail!.replace(selectedFolder.label, newFolderName));

    folderManagement.renameFolder(oldPath, newPath).catch(()=> generalUtils.showMessage("Error! File not found!", true));
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

        folderManagement.deleteFolder(vscode.Uri.parse(selectedFolder!.detail!)).catch((err)=>{
            if(err === vscode.FileSystemError.FileNotFound){
                generalUtils.showMessage("Error! Folder does not exist.", true);
            }else{
                generalUtils.showMessage("Error! Not a folder.", true);
            }
        });
        let deletionState = folderManagement.deleteFolder(vscode.Uri.parse(selectedFolder.detail!));
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