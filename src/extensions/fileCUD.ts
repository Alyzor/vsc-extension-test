import * as vscode from 'vscode';
import * as generalUtils from '../utils/general';
import * as fileManagement from '../utils/fileManagement';
import * as workspaceNavigation from '../utils/workspaceNavigation';

export async function fileCUD(){
    
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
        createNewFile();
    }else
    if(userSelections.value === "rename"){
        renameFile();
    }else
    {
        deleteFile();
    }
}


async function createNewFile(){
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if(!folderUriList){
        return;
    }

    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);
    folderList[0].label = "ROOT: " + folderList[0].label;
    if(!folderList){ return; }
    let selectedFolder = await vscode.window.showQuickPick(
        folderList, 
        {
            title: "Select where to create your new file!",
            placeHolder: "Search for a folder here!"
        }
    );

    if(!selectedFolder){
        generalUtils.showMessage("Please select a folder!", true);
        return;
    }

    let fileName = await vscode.window.showInputBox({title:"Select a name AND extension for your new file!", placeHolder:"file.extension"});

    if(fileName === "" || fileName === undefined){
        return;
    }else if(!fileName.includes(".")){
        return;
    }

    var newFile = vscode.Uri.parse(selectedFolder.detail!.toString() + '/' + fileName);

    fileManagement.newFile(newFile)
    .catch(()=> generalUtils.showMessage("File already exists!", true))
    .then(()=>generalUtils.showMessage("File created successfully!", false));
}

async function renameFile(){
    let fileUriList = await workspaceNavigation.getWorkspaceFiles();
    if(!fileUriList) { return; }
    let fileList = await workspaceNavigation.getItemListAsQuickPickItemList(fileUriList);

    if(!fileList){ return; }

    let selectedFile = await vscode.window.showQuickPick(
        fileList,
        {
            title: "Select a file to rename...",
            placeHolder: "Search here for the file's name!"
        }
    );
    
    if(!selectedFile) { return; }

    let newFileName = await vscode.window.showInputBox({title:"Select a new name AND extension for your file!", placeHolder:selectedFile.label});
    
    if(!newFileName) { return; }
    
    var fileLocation = selectedFile.detail?.split("/").slice(0, -1).join("/")+"/";
    console.log(fileLocation);
    let fileUri = vscode.Uri.parse(fileLocation! + newFileName);

    fileManagement.renameFile(vscode.Uri.parse(selectedFile.detail!), fileUri)
    .catch(()=> generalUtils.showMessage("Error! File not found.", true))
    .then(()=>generalUtils.showMessage("File deleted successfully!", false));
}

async function deleteFile(){
    let fileUriList = await workspaceNavigation.getWorkspaceFiles();
    if(!fileUriList) { return; }
    let fileList = await workspaceNavigation.getItemListAsQuickPickItemList(fileUriList);

    if(!fileList){ return; }
    let selectedFile = await vscode.window.showQuickPick(
        fileList,
        {
            title: "Select a file to delete...",
            placeHolder: "Search here for the file's name!"
        }
    );
    
    if(!selectedFile) { return; }
    let newFileName = await vscode.window.showInputBox({title:"Please confirm the name AND extension of the file you wish to delete...", placeHolder:selectedFile.label});
    
    if(!newFileName || newFileName !== selectedFile.label) { return; }
    
    let fileUri = vscode.Uri.parse(selectedFile.detail!.toString());

    fileManagement.deleteFile(fileUri).catch((err)=>{
        if(err === vscode.FileSystemError.FileIsADirectory){
            generalUtils.showMessage("Error! The selected file is a folder." , true);
        }else{
            generalUtils.showMessage("Error! File not found." , true);
        }
    }).then(()=>generalUtils.showMessage("File deleted successfully!", false));
}