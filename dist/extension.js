/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(__webpack_require__(1));
const displayTextSelection_1 = __webpack_require__(2);
const showOpenFolderTree_1 = __webpack_require__(5);
const folderCUD_1 = __webpack_require__(8);
const fileCUD_1 = __webpack_require__(10);
const populateArray_1 = __webpack_require__(11);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let arrayPopulation = vscode.commands.registerCommand('tests.populateArray', async () => (0, populateArray_1.populateArray)());
    let displaySelectedText = vscode.commands.registerCommand('tests.displaySelection', () => (0, displayTextSelection_1.displayHighlightedText)());
    let showFileTree = vscode.commands.registerCommand('tests.showFileTree', () => (0, showOpenFolderTree_1.showOpenFolderTree)());
    let manageWorkspaceFolders = vscode.commands.registerCommand('tests.manageFolders', async () => (0, folderCUD_1.folderCUD)());
    let manageWorkspaceFiles = vscode.commands.registerCommand('tests.manageFiles', async () => (0, fileCUD_1.fileCUD)());
    context.subscriptions.push(arrayPopulation, displaySelectedText, showFileTree, manageWorkspaceFolders, manageWorkspaceFiles);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.displayHighlightedText = void 0;
const vscode = __importStar(__webpack_require__(1));
const generalUtils = __importStar(__webpack_require__(3));
const fileUtils = __importStar(__webpack_require__(4));
function displayHighlightedText() {
    var editor = vscode.window.activeTextEditor;
    if (editor) {
        if (editor.selection) {
            generalUtils.showMessage("Selected Text: " + fileUtils.readOpenedFile(editor, editor.selection), false);
        }
        else {
            generalUtils.showMessage("No text has been selected!", true);
        }
    }
    else {
        generalUtils.showMessage("Please open a file!", true);
    }
}
exports.displayHighlightedText = displayHighlightedText;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showMessage = void 0;
const vscode = __importStar(__webpack_require__(1));
/**
 * Displays vscode's native message "pop-up".
 *
 * @param {string} message Message to specify on pop-up.
 * @param {boolean} isError true -> Show error message / false -> show information message.
 */
function showMessage(message, isError) {
    if (isError) {
        vscode.window.showErrorMessage(message);
    }
    else {
        vscode.window.showInformationMessage(message);
    }
}
exports.showMessage = showMessage;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readFileOnFS = exports.readOpenedFile = exports.deleteFile = exports.renameFile = exports.newFile = void 0;
const vscode = __importStar(__webpack_require__(1));
const generalUtils = __importStar(__webpack_require__(3));
/**
 * Creates a new file in the specified directory.
 *
 * @param {vscode.Uri} newFile Previously created URI
 * that points to the file's desired location.
 */
async function newFile(newFile) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(newFile);
    if (!fStat) {
        fs.createDirectory(newFile);
    }
    else {
        throw fsError.FileExists();
    }
}
exports.newFile = newFile;
async function renameFile(oldName, newName) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(oldName);
    if (fStat) {
        fs.rename(oldName, newName);
    }
    else {
        throw fsError.FileNotFound();
    }
}
exports.renameFile = renameFile;
async function deleteFile(uri) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(uri);
    if (fStat) {
        if (fStat.type !== vscode.FileType.File) {
            throw fsError.FileIsADirectory();
        }
        else {
            fs.delete(uri);
        }
    }
    else {
        throw fsError.FileNotFound();
    }
}
exports.deleteFile = deleteFile;
/**
 * Returns a string with the text written the user's currently open  file. If "selection" is defined, will return only the text that has been selected by the user.
 *
 * @param {string} fileName - Specified file's name.
 * @param {vscode.Selection=} selection - If specified, returns user's selected text.
 *
 * @returns {string}
 */
function readOpenedFile(file, selection) {
    return file.document.getText(selection);
}
exports.readOpenedFile = readOpenedFile;
/**
 * Returns a string with the text written on a specified file existing on the workspace.
 *
 * @param {vscode.Uri} uri - URI link of the directory where the file should be found.
 *
 * @returns {string}
 */
async function readFileOnFS(uri) {
    if (vscode.workspace.workspaceFolders) {
        try {
            var fileContent = await vscode.workspace.fs.readFile(uri);
            return Buffer.from(fileContent).toString();
        }
        catch (error) {
            generalUtils.showMessage("Error reading file! " + error, true);
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.readFileOnFS = readFileOnFS;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showOpenFolderTree = void 0;
const workspaceNavigation = __importStar(__webpack_require__(6));
function showOpenFolderTree() {
    workspaceNavigation.getWorkspaceFilesAndFolders().then(res => console.log(res));
}
exports.showOpenFolderTree = showOpenFolderTree;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getItemListAsQuickPickItemList = exports.getWorkspaceFolders = exports.getWorkspaceFiles = exports.getWorkspaceFilesAndFolders = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(7));
const generalUtils = __importStar(__webpack_require__(3));
/**
 * Returns all files and folders present on the user's workspace in an URI format
 *
 * USAGE EXAMPLE:
 * ``` let res = await getWorkspaceFilesAndFolders(); ```
 * @returns workspaceResult (folders AND files present on the user's workspace) | undefined.
 *
 * */
async function getWorkspaceFilesAndFolders() {
    try {
        const res = await fetchRequestedDataFromWorkspace();
        if (res === undefined) {
            return undefined;
        }
        else {
            return res;
        }
    }
    catch (error) {
        console.error("Error fetching workspace data:", error);
        return undefined;
    }
}
exports.getWorkspaceFilesAndFolders = getWorkspaceFilesAndFolders;
/**
 * Returns an array with URI links of all files present on the current workspace.
 *
 * USAGE EXAMPLE:
 * ``` let res = await getWorkspaceFiles(); ```
 * @returns vscodde.Uri[] | undefined
 */
async function getWorkspaceFiles() {
    try {
        const res = await fetchRequestedDataFromWorkspace();
        if (res === undefined) {
            return undefined;
        }
        else {
            return res.files;
        }
    }
    catch (error) {
        console.error("Error fetching workspace files:", error);
        return undefined;
    }
}
exports.getWorkspaceFiles = getWorkspaceFiles;
/**
 * Returns an array with URI links of all folders/directories present on the current workspace.
 *
 * USAGE EXAMPLE:
 * ``` let res = await getWorkspaceFolders(); ```
 * @returns vscodde.Uri[] | undefined
 */
async function getWorkspaceFolders() {
    try {
        const res = await fetchRequestedDataFromWorkspace();
        if (res === undefined) {
            return undefined;
        }
        else {
            return res.folders;
        }
    }
    catch (error) {
        console.error("Error fetching workspace files:", error);
        return undefined;
    }
}
exports.getWorkspaceFolders = getWorkspaceFolders;
async function fetchRequestedDataFromWorkspace() {
    if (!vscode.workspace.workspaceFolders) {
        generalUtils.showMessage("No workspace detected.", true);
        return undefined;
    }
    var result = { folders: [], files: [] };
    for (const folder of vscode.workspace.workspaceFolders) {
        await recursiveGetFolders(folder.uri).then(res => {
            result.folders.push(folder.uri);
            result.files = result.files.concat(res.files);
            result.folders = result.folders.concat(res.folders);
        });
    }
    ;
    return result;
}
async function recursiveGetFolders(uri) {
    var currentDirectory = [];
    await vscode.workspace.fs.readDirectory(uri).then(result => currentDirectory = result);
    var returnDir = [];
    var returnFiles = [];
    for (const file of currentDirectory) {
        var tempUri = vscode.Uri.parse(uri.toString() + "/" + file[0]);
        if (file[1] === vscode.FileType.Directory) {
            returnDir.push(tempUri);
        }
        else if (file[1] === vscode.FileType.File) {
            returnFiles.push(tempUri);
        }
        else if (file[1] === vscode.FileType.SymbolicLink) {
            const target = fs.readlinkSync(tempUri.toString());
            const targetStat = fs.statSync(target);
            if (targetStat.isDirectory()) {
                returnDir.push(tempUri);
            }
            else if (targetStat.isFile()) {
                returnFiles.push(tempUri);
            }
            else {
                console.error("Unknown file type for symbolic link target:", target);
            }
        }
        else {
            generalUtils.showMessage("Error! Couldn't read file " + file[0] + "!", true);
        }
    }
    var finalDirs = returnDir;
    for (const dir of returnDir) {
        await recursiveGetFolders(dir).then(res => {
            finalDirs = finalDirs.concat(res.folders);
            returnFiles = returnFiles.concat(res.files);
        });
    }
    var finalResponse = { folders: finalDirs, files: returnFiles };
    return finalResponse;
}
function symLinkIsFile(path) {
    var symLink = fs.statSync(path.toString());
    return symLink.isFile();
}
async function getItemListAsQuickPickItemList(existingItems) {
    if (existingItems === undefined) {
        return [];
    }
    var folderList = [];
    for (let folder of existingItems) {
        var folderPush = { name: "", uri: folder };
        var tempName = folder.toString().split('/');
        folderPush.name = tempName[tempName.length - 1];
        folderList.push(folderPush);
    }
    folderList = folderList.sort((a, b) => (a.uri.toString() < b.uri.toString() ? -1 : 1));
    return organizeItemsInPickItem(folderList);
}
exports.getItemListAsQuickPickItemList = getItemListAsQuickPickItemList;
function organizeItemsInPickItem(folderList) {
    var folderQuickPickList = [];
    for (let folder of folderList) {
        if (folder === folderList[0]) {
            folderQuickPickList.push({
                label: 'ROOT: ' + folder.name,
                detail: folder.uri.toString()
            });
        }
        else {
            folderQuickPickList.push({
                label: folder.name,
                detail: folder.uri.toString()
            });
        }
    }
    return folderQuickPickList;
}


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.folderCUD = void 0;
const vscode = __importStar(__webpack_require__(1));
const generalUtils = __importStar(__webpack_require__(3));
const workspaceNavigation = __importStar(__webpack_require__(6));
const folderManagement = __importStar(__webpack_require__(9));
async function folderCUD() {
    var userSelections = await vscode.window.showQuickPick([
        {
            label: "Create",
            value: "create"
        },
        {
            label: "Rename",
            value: "rename"
        },
        {
            label: "Delete",
            value: "delete"
        },
    ], {
        title: "Select an option...",
        canPickMany: false
    });
    if (!userSelections) {
        generalUtils.showMessage("Please select an option!", true);
        return;
    }
    if (userSelections.value === "create") {
        createNewFolder();
    }
    else if (userSelections.value === "rename") {
        renameFolder();
    }
    else {
        deleteFolder();
    }
}
exports.folderCUD = folderCUD;
async function createNewFolder() {
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if (!folderUriList) {
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);
    if (folderList.length === 0) {
        return;
    }
    let folderName = await vscode.window.showInputBox({
        title: "Select a name for your new folder.",
        placeHolder: "New_Folder"
    });
    if (folderName === undefined || folderName === "") {
        generalUtils.showMessage("Please input a name for your new folder!", true);
        return;
    }
    var selectedFolder = await vscode.window.showQuickPick(folderList, {
        title: "Select where to create your new folder: ",
        placeHolder: "Search here if there are too many folders!"
    });
    let newPath = vscode.Uri.parse(selectedFolder.detail + '/' + folderName);
    folderManagement.createFolder(newPath).catch(() => generalUtils.showMessage("Folder already exists!", true));
}
async function renameFolder() {
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if (!folderUriList) {
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);
    folderList.splice(0, 1);
    var selectedFolder = await vscode.window.showQuickPick(folderList, {
        title: "Select the folder you wish to rename",
        placeHolder: "Search for folder...",
    });
    if (!selectedFolder) {
        generalUtils.showMessage("Please select a folder to rename.", true);
        return;
    }
    let newFolderName = await vscode.window.showInputBox({
        title: "Please select a new name for your folder: ",
        placeHolder: selectedFolder.label
    });
    if (newFolderName === undefined || newFolderName === "") {
        generalUtils.showMessage("Please input a name for your new folder!", true);
        return;
    }
    let oldPath = vscode.Uri.parse(selectedFolder.detail);
    let newPath = vscode.Uri.parse(selectedFolder.detail.replace(selectedFolder.label, newFolderName));
    folderManagement.renameFolder(oldPath, newPath).catch(() => generalUtils.showMessage("Error! File not found!", true));
}
async function deleteFolder() {
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if (!folderUriList) {
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);
    folderList.splice(0, 1);
    var selectedFolder = await vscode.window.showQuickPick(folderList, {
        title: "Select the folder you wish to delete",
        placeHolder: "Search for folder...",
    });
    if (!selectedFolder) {
        generalUtils.showMessage("Please select a folder to delete.", true);
        return;
    }
    var willDeleteFolder = await vscode.window.showInputBox({
        title: "To confirm, please write the name of the folder",
        placeHolder: selectedFolder.label
    });
    if (willDeleteFolder === selectedFolder.label) {
        folderManagement.deleteFolder(vscode.Uri.parse(selectedFolder.detail)).catch((err) => {
            if (err === vscode.FileSystemError.FileNotFound) {
                generalUtils.showMessage("Error! Folder does not exist.", true);
            }
            else {
                generalUtils.showMessage("Error! Not a folder.", true);
            }
        });
        let deletionState = folderManagement.deleteFolder(vscode.Uri.parse(selectedFolder.detail));
        if (deletionState === undefined) {
            generalUtils.showMessage("Folder " + selectedFolder.label + " deleted successfully!", false);
        }
        else {
            generalUtils.showMessage("Error! " + deletionState, true);
        }
    }
    else {
        generalUtils.showMessage("The name you wrote doesn't match with the folder's name!", true);
        return;
    }
}


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteFolder = exports.renameFolder = exports.createFolder = void 0;
const vscode = __importStar(__webpack_require__(1));
async function createFolder(folderURI) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(folderURI);
    if (!fStat) {
        fs.createDirectory(folderURI);
    }
    else {
        throw fsError.FileExists();
    }
}
exports.createFolder = createFolder;
async function renameFolder(oldPath, newPath) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(oldPath);
    if (!fStat) {
        throw fsError.FileNotFound();
    }
    else {
        fs.rename(oldPath, newPath);
    }
}
exports.renameFolder = renameFolder;
async function deleteFolder(folderURI) {
    let fs = vscode.workspace.fs;
    let fsError = vscode.FileSystemError;
    let fStat = await fs.stat(folderURI);
    if (!fStat) {
        throw fsError.FileNotFound();
    }
    else {
        if (fStat.type !== vscode.FileType.Directory) {
            throw fsError.FileNotADirectory();
        }
        else {
            fs.delete(folderURI);
        }
    }
}
exports.deleteFolder = deleteFolder;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fileCUD = void 0;
const vscode = __importStar(__webpack_require__(1));
const generalUtils = __importStar(__webpack_require__(3));
const fileManagement = __importStar(__webpack_require__(4));
const workspaceNavigation = __importStar(__webpack_require__(6));
async function fileCUD() {
    var userSelections = await vscode.window.showQuickPick([
        {
            label: "Create",
            value: "create"
        },
        {
            label: "Rename",
            value: "rename"
        },
        {
            label: "Delete",
            value: "delete"
        },
    ], {
        title: "Select an option...",
        canPickMany: false
    });
    if (!userSelections) {
        generalUtils.showMessage("Please select an option!", true);
        return;
    }
    if (userSelections.value === "create") {
        createNewFile();
    }
    else if (userSelections.value === "rename") {
        renameFile();
    }
    else {
        deleteFile();
    }
}
exports.fileCUD = fileCUD;
async function createNewFile() {
    let folderUriList = await workspaceNavigation.getWorkspaceFolders();
    if (!folderUriList) {
        return;
    }
    let folderList = await workspaceNavigation.getItemListAsQuickPickItemList(folderUriList);
    if (!folderList) {
        return;
    }
    let selectedFolder = await vscode.window.showQuickPick(folderList, {
        title: "Select where to create your new file!",
        placeHolder: "Search for a folder here!"
    });
    if (!selectedFolder) {
        generalUtils.showMessage("Please select a folder!", true);
        return;
    }
    let fileName = await vscode.window.showInputBox({ title: "Select a name AND extension for your new file!", placeHolder: "file.extension" });
    if (fileName === "" || fileName === undefined) {
        return;
    }
    else if (!fileName.includes(".")) {
        return;
    }
    var newFile = vscode.Uri.parse(selectedFolder.detail.toString() + '/' + fileName);
    fileManagement.newFile(newFile).catch(() => generalUtils.showMessage("File already exists!", true));
}
async function renameFile() {
    let fileUriList = await workspaceNavigation.getWorkspaceFiles();
    if (!fileUriList) {
        return;
    }
    let fileList = await workspaceNavigation.getItemListAsQuickPickItemList(fileUriList);
    if (!fileList) {
        return;
    }
    let selectedFile = await vscode.window.showQuickPick(fileList, {
        title: "Select a file to rename...",
        placeHolder: "Search here for the file's name!"
    });
    if (!selectedFile) {
        return;
    }
    let newFileName = await vscode.window.showInputBox({ title: "Select a new name AND extension for your file!", placeHolder: selectedFile.label });
    if (!newFileName) {
        return;
    }
    var fileLocation = selectedFile.detail?.split("/").slice(0, -1).join("/") + "/";
    console.log(fileLocation);
    let fileUri = vscode.Uri.parse(fileLocation + newFileName);
    fileManagement.renameFile(vscode.Uri.parse(selectedFile.detail), fileUri).catch(() => generalUtils.showMessage("Error! File not found.", true));
}
async function deleteFile() {
    let fileUriList = await workspaceNavigation.getWorkspaceFiles();
    if (!fileUriList) {
        return;
    }
    let fileList = await workspaceNavigation.getItemListAsQuickPickItemList(fileUriList);
    if (!fileList) {
        return;
    }
    let selectedFile = await vscode.window.showQuickPick(fileList, {
        title: "Select a file to delete...",
        placeHolder: "Search here for the file's name!"
    });
    if (!selectedFile) {
        return;
    }
    let newFileName = await vscode.window.showInputBox({ title: "Please confirm the name AND extension of the file you wish to delete...", placeHolder: selectedFile.label });
    if (!newFileName || newFileName !== selectedFile.label) {
        return;
    }
    let fileUri = vscode.Uri.parse(selectedFile.detail.toString() + "/" + newFileName);
    fileManagement.deleteFile(fileUri).catch((err) => {
        if (err === vscode.FileSystemError.FileIsADirectory) {
            generalUtils.showMessage("Error! The selected file is a folder.", true);
        }
        else {
            generalUtils.showMessage("Error! File not found.", true);
        }
    });
}


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.populateArray = void 0;
const vscode = __importStar(__webpack_require__(1));
const generalUtils = __importStar(__webpack_require__(3));
const lorem_ipsum_1 = __webpack_require__(12);
async function populateArray() {
    var openedFile = vscode.window.activeTextEditor?.document;
    if (!openedFile) {
        generalUtils.showMessage("Please open a file!", true);
    }
    //Checking language
    if (openedFile?.languageId !== "typescript") {
        generalUtils.showMessage("Please run the extension on a .ts file!", true);
        return;
    }
    var interfaceList = getDocumentInterfaceListName(openedFile.getText());
    var selectInterface = await vscode.window.showQuickPick(interfaceList, {
        title: "Select an Interface",
        canPickMany: false,
    });
    if (!selectInterface) {
        return;
    }
    var selectQuantity = "";
    while (selectQuantity === "") {
        selectQuantity = await vscode.window.showInputBox({
            title: "Amount of fields to populate... (1...25)",
            placeHolder: "1..2..25",
            value: "1",
            validateInput: text => {
                if (/^[0-9]*$/.test(text)) {
                    if (parseInt(text) > 25 || parseInt(text) < 1) {
                        return "Please choose a number between 1 and 25!";
                    }
                    else {
                        return "";
                    }
                }
                else {
                    return "Please only use numbers";
                }
            }
        });
    }
    if (!selectQuantity) {
        return;
    }
    if (selectInterface.detail?.match("boolean")) {
        var selectBoolValue = await vscode.window.showQuickPick([
            {
                label: "$(check) True",
            },
            {
                label: "$(close) False"
            },
            {
                label: "$(ellipsis) Random"
            }
        ], {
            title: "Boolean found! Do you wish to set all values to true, false or randomly assign a value?"
        });
    }
    selectInterface.label = selectInterface.label.replace("$(symbol-interface)", "");
    selectInterface.detail = selectInterface.detail.replaceAll("$(symbol-key)", "");
    if (selectBoolValue) {
        switch (selectBoolValue.label) {
            case "$(close) False":
                selectBoolValue.label = selectBoolValue.label.replace("$(close) ", "").toLowerCase();
                break;
            case "$(check) True":
                selectBoolValue.label = selectBoolValue.label.replace("$(check) ", "").toLowerCase();
                break;
            default:
                selectBoolValue.label = selectBoolValue.label.replace("$(ellipsis) ", "").toLowerCase();
                break;
        }
        selectBoolValue.label.trim();
    }
    var tempProperties = selectInterface.detail.split('/');
    var propertyList = [];
    tempProperties.forEach(e => {
        var tempProperty = e.split(":");
        propertyList.push({ name: tempProperty[0].trim(), type: tempProperty[1].trim() });
    });
    if (!selectBoolValue || selectBoolValue.label === "random") {
        generateDummyText(selectInterface.label, parseInt(selectQuantity), propertyList);
    }
    else {
        generateDummyText(selectInterface.label, parseInt(selectQuantity), propertyList, Boolean(JSON.parse(selectBoolValue.label)));
    }
}
exports.populateArray = populateArray;
function generateDummyText(interfaceName, repeat, properties, predefinedBool) {
    var finalText = "var dummy" + interfaceName + " = [ \r\n";
    for (var i = 0; i < repeat; i++) {
        finalText += "	{ \r\n";
        properties.forEach(prop => {
            finalText += "		" + prop.name + ": ";
            switch (prop.type) {
                case "string":
                    finalText += '"' + (0, lorem_ipsum_1.loremIpsum)() + '"';
                    break;
                case "number":
                    finalText += Math.floor(Math.random() * 200);
                    break;
                case "boolean":
                    if (predefinedBool) {
                        finalText += predefinedBool.toString();
                    }
                    else {
                        const randBool = Math.random() < 0.5;
                        finalText += randBool;
                    }
                    break;
                default:
                    finalText += "new " + prop.type;
                    break;
            }
            if (prop === properties[properties.length - 1]) {
                finalText += "\r\n";
            }
            else {
                finalText += ",\r\n";
            }
        });
        if (i === repeat - 1) {
            finalText += "}";
        }
        else {
            finalText += "}, \r\n";
        }
    }
    finalText += "];";
    console.log(finalText);
    //get user's current positions
    var userSelection = vscode.window.activeTextEditor?.selection;
    console.log(userSelection?.active.line);
    console.log(userSelection?.isEmpty);
    console.log(userSelection?.start.character);
    var editor = vscode.window.activeTextEditor;
    editor?.edit(builder => {
        builder.insert(userSelection.active, "\r\n" + finalText);
    });
    var lineAdded = userSelection.active.line + 2;
    generalUtils.showMessage("Created placeholder dummy" + interfaceName + " on line " + lineAdded, false);
    //return finalText to IDE under user's current line (newLine first, then declaration)
}
function getDocumentInterfaceListName(documentText) {
    var interfaceSplit = documentText.split('interface ');
    var interfaceNameList = new Array;
    interfaceSplit.forEach(element => {
        var elementName = element.split('{');
        if (elementName.length === 2) {
            var elementDetail = elementName[1].split(',');
            var detailList = "";
            elementDetail.forEach(element => {
                if (element === elementDetail[elementDetail.length - 1]) {
                    element = element.replace('}', "");
                    detailList = detailList + '$(symbol-key)' + element.trim();
                }
                else {
                    detailList = detailList + '$(symbol-key)' + element.trim() + ' / ';
                }
            });
            interfaceNameList.push({
                label: '$(symbol-interface)' + elementName[0],
                detail: detailList
            });
        }
    });
    return interfaceNameList;
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "LoremIpsum", ({
  enumerable: true,
  get: function get() {
    return _LoremIpsum["default"];
  }
}));
exports.loremIpsum = void 0;

var _formats = __webpack_require__(13);

var _units = __webpack_require__(14);

var _words = __webpack_require__(15);

var _LoremIpsum = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loremIpsum = function loremIpsum() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? _formats.FORMAT_PLAIN : _ref$format,
      _ref$paragraphLowerBo = _ref.paragraphLowerBound,
      paragraphLowerBound = _ref$paragraphLowerBo === void 0 ? 3 : _ref$paragraphLowerBo,
      _ref$paragraphUpperBo = _ref.paragraphUpperBound,
      paragraphUpperBound = _ref$paragraphUpperBo === void 0 ? 7 : _ref$paragraphUpperBo,
      random = _ref.random,
      _ref$sentenceLowerBou = _ref.sentenceLowerBound,
      sentenceLowerBound = _ref$sentenceLowerBou === void 0 ? 5 : _ref$sentenceLowerBou,
      _ref$sentenceUpperBou = _ref.sentenceUpperBound,
      sentenceUpperBound = _ref$sentenceUpperBou === void 0 ? 15 : _ref$sentenceUpperBou,
      _ref$units = _ref.units,
      units = _ref$units === void 0 ? _units.UNIT_SENTENCES : _ref$units,
      _ref$words = _ref.words,
      words = _ref$words === void 0 ? _words.WORDS : _ref$words,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? "" : _ref$suffix;

  var options = {
    random: random,
    sentencesPerParagraph: {
      max: paragraphUpperBound,
      min: paragraphLowerBound
    },
    words: words,
    wordsPerSentence: {
      max: sentenceUpperBound,
      min: sentenceLowerBound
    }
  };
  var lorem = new _LoremIpsum["default"](options, format, suffix);

  switch (units) {
    case _units.UNIT_PARAGRAPHS:
    case _units.UNIT_PARAGRAPH:
      return lorem.generateParagraphs(count);

    case _units.UNIT_SENTENCES:
    case _units.UNIT_SENTENCE:
      return lorem.generateSentences(count);

    case _units.UNIT_WORDS:
    case _units.UNIT_WORD:
      return lorem.generateWords(count);

    default:
      return "";
  }
};

exports.loremIpsum = loremIpsum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb3JlbUlwc3VtIiwiY291bnQiLCJmb3JtYXQiLCJGT1JNQVRfUExBSU4iLCJwYXJhZ3JhcGhMb3dlckJvdW5kIiwicGFyYWdyYXBoVXBwZXJCb3VuZCIsInJhbmRvbSIsInNlbnRlbmNlTG93ZXJCb3VuZCIsInNlbnRlbmNlVXBwZXJCb3VuZCIsInVuaXRzIiwiVU5JVF9TRU5URU5DRVMiLCJ3b3JkcyIsIldPUkRTIiwic3VmZml4Iiwib3B0aW9ucyIsInNlbnRlbmNlc1BlclBhcmFncmFwaCIsIm1heCIsIm1pbiIsIndvcmRzUGVyU2VudGVuY2UiLCJsb3JlbSIsIkxvcmVtSXBzdW0iLCJVTklUX1BBUkFHUkFQSFMiLCJVTklUX1BBUkFHUkFQSCIsImdlbmVyYXRlUGFyYWdyYXBocyIsIlVOSVRfU0VOVEVOQ0UiLCJnZW5lcmF0ZVNlbnRlbmNlcyIsIlVOSVRfV09SRFMiLCJVTklUX1dPUkQiLCJnZW5lcmF0ZVdvcmRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvcmVtRm9ybWF0LCBGT1JNQVRfUExBSU4gfSBmcm9tIFwiLi9jb25zdGFudHMvZm9ybWF0c1wiO1xyXG5pbXBvcnQge1xyXG4gIExvcmVtVW5pdCxcclxuICBVTklUX1BBUkFHUkFQSCxcclxuICBVTklUX1BBUkFHUkFQSFMsXHJcbiAgVU5JVF9TRU5URU5DRVMsXHJcbiAgVU5JVF9TRU5URU5DRSxcclxuICBVTklUX1dPUkRTLFxyXG4gIFVOSVRfV09SRCxcclxufSBmcm9tIFwiLi9jb25zdGFudHMvdW5pdHNcIjtcclxuaW1wb3J0IHsgV09SRFMgfSBmcm9tIFwiLi9jb25zdGFudHMvd29yZHNcIjtcclxuaW1wb3J0IHsgSVBybmcgfSBmcm9tIFwiLi9saWIvZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCBMb3JlbUlwc3VtIGZyb20gXCIuL2xpYi9Mb3JlbUlwc3VtXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMb3JlbUlwc3VtUGFyYW1zIHtcclxuICBjb3VudD86IG51bWJlcjtcclxuICBmb3JtYXQ/OiBMb3JlbUZvcm1hdDtcclxuICBwYXJhZ3JhcGhMb3dlckJvdW5kPzogbnVtYmVyO1xyXG4gIHBhcmFncmFwaFVwcGVyQm91bmQ/OiBudW1iZXI7XHJcbiAgcmFuZG9tPzogSVBybmc7XHJcbiAgc2VudGVuY2VMb3dlckJvdW5kPzogbnVtYmVyO1xyXG4gIHNlbnRlbmNlVXBwZXJCb3VuZD86IG51bWJlcjtcclxuICB1bml0cz86IExvcmVtVW5pdDtcclxuICB3b3Jkcz86IHN0cmluZ1tdO1xyXG4gIHN1ZmZpeD86IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgbG9yZW1JcHN1bSA9ICh7XHJcbiAgY291bnQgPSAxLFxyXG4gIGZvcm1hdCA9IEZPUk1BVF9QTEFJTixcclxuICBwYXJhZ3JhcGhMb3dlckJvdW5kID0gMyxcclxuICBwYXJhZ3JhcGhVcHBlckJvdW5kID0gNyxcclxuICByYW5kb20sXHJcbiAgc2VudGVuY2VMb3dlckJvdW5kID0gNSxcclxuICBzZW50ZW5jZVVwcGVyQm91bmQgPSAxNSxcclxuICB1bml0cyA9IFVOSVRfU0VOVEVOQ0VTLFxyXG4gIHdvcmRzID0gV09SRFMsXHJcbiAgc3VmZml4ID0gXCJcIixcclxufTogSUxvcmVtSXBzdW1QYXJhbXMgPSB7fSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIHJhbmRvbSxcclxuICAgIHNlbnRlbmNlc1BlclBhcmFncmFwaDoge1xyXG4gICAgICBtYXg6IHBhcmFncmFwaFVwcGVyQm91bmQsXHJcbiAgICAgIG1pbjogcGFyYWdyYXBoTG93ZXJCb3VuZCxcclxuICAgIH0sXHJcbiAgICB3b3JkcyxcclxuICAgIHdvcmRzUGVyU2VudGVuY2U6IHtcclxuICAgICAgbWF4OiBzZW50ZW5jZVVwcGVyQm91bmQsXHJcbiAgICAgIG1pbjogc2VudGVuY2VMb3dlckJvdW5kLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBjb25zdCBsb3JlbTogTG9yZW1JcHN1bSA9IG5ldyBMb3JlbUlwc3VtKG9wdGlvbnMsIGZvcm1hdCwgc3VmZml4KTtcclxuXHJcbiAgc3dpdGNoICh1bml0cykge1xyXG4gICAgY2FzZSBVTklUX1BBUkFHUkFQSFM6XHJcbiAgICBjYXNlIFVOSVRfUEFSQUdSQVBIOlxyXG4gICAgICByZXR1cm4gbG9yZW0uZ2VuZXJhdGVQYXJhZ3JhcGhzKGNvdW50KTtcclxuICAgIGNhc2UgVU5JVF9TRU5URU5DRVM6XHJcbiAgICBjYXNlIFVOSVRfU0VOVEVOQ0U6XHJcbiAgICAgIHJldHVybiBsb3JlbS5nZW5lcmF0ZVNlbnRlbmNlcyhjb3VudCk7XHJcbiAgICBjYXNlIFVOSVRfV09SRFM6XHJcbiAgICBjYXNlIFVOSVRfV09SRDpcclxuICAgICAgcmV0dXJuIGxvcmVtLmdlbmVyYXRlV29yZHMoY291bnQpO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgbG9yZW1JcHN1bSwgTG9yZW1JcHN1bSB9O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFTQTs7QUFFQTs7OztBQWVBLElBQU1BLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBV21CO0VBQUEsK0VBQWYsRUFBZTtFQUFBLHNCQVZwQ0MsS0FVb0M7RUFBQSxJQVZwQ0EsS0FVb0MsMkJBVjVCLENBVTRCO0VBQUEsdUJBVHBDQyxNQVNvQztFQUFBLElBVHBDQSxNQVNvQyw0QkFUM0JDLHFCQVMyQjtFQUFBLGlDQVJwQ0MsbUJBUW9DO0VBQUEsSUFScENBLG1CQVFvQyxzQ0FSZCxDQVFjO0VBQUEsaUNBUHBDQyxtQkFPb0M7RUFBQSxJQVBwQ0EsbUJBT29DLHNDQVBkLENBT2M7RUFBQSxJQU5wQ0MsTUFNb0MsUUFOcENBLE1BTW9DO0VBQUEsaUNBTHBDQyxrQkFLb0M7RUFBQSxJQUxwQ0Esa0JBS29DLHNDQUxmLENBS2U7RUFBQSxpQ0FKcENDLGtCQUlvQztFQUFBLElBSnBDQSxrQkFJb0Msc0NBSmYsRUFJZTtFQUFBLHNCQUhwQ0MsS0FHb0M7RUFBQSxJQUhwQ0EsS0FHb0MsMkJBSDVCQyxxQkFHNEI7RUFBQSxzQkFGcENDLEtBRW9DO0VBQUEsSUFGcENBLEtBRW9DLDJCQUY1QkMsWUFFNEI7RUFBQSx1QkFEcENDLE1BQ29DO0VBQUEsSUFEcENBLE1BQ29DLDRCQUQzQixFQUMyQjs7RUFDcEMsSUFBTUMsT0FBTyxHQUFHO0lBQ2RSLE1BQU0sRUFBTkEsTUFEYztJQUVkUyxxQkFBcUIsRUFBRTtNQUNyQkMsR0FBRyxFQUFFWCxtQkFEZ0I7TUFFckJZLEdBQUcsRUFBRWI7SUFGZ0IsQ0FGVDtJQU1kTyxLQUFLLEVBQUxBLEtBTmM7SUFPZE8sZ0JBQWdCLEVBQUU7TUFDaEJGLEdBQUcsRUFBRVIsa0JBRFc7TUFFaEJTLEdBQUcsRUFBRVY7SUFGVztFQVBKLENBQWhCO0VBYUEsSUFBTVksS0FBaUIsR0FBRyxJQUFJQyxzQkFBSixDQUFlTixPQUFmLEVBQXdCWixNQUF4QixFQUFnQ1csTUFBaEMsQ0FBMUI7O0VBRUEsUUFBUUosS0FBUjtJQUNFLEtBQUtZLHNCQUFMO0lBQ0EsS0FBS0MscUJBQUw7TUFDRSxPQUFPSCxLQUFLLENBQUNJLGtCQUFOLENBQXlCdEIsS0FBekIsQ0FBUDs7SUFDRixLQUFLUyxxQkFBTDtJQUNBLEtBQUtjLG9CQUFMO01BQ0UsT0FBT0wsS0FBSyxDQUFDTSxpQkFBTixDQUF3QnhCLEtBQXhCLENBQVA7O0lBQ0YsS0FBS3lCLGlCQUFMO0lBQ0EsS0FBS0MsZ0JBQUw7TUFDRSxPQUFPUixLQUFLLENBQUNTLGFBQU4sQ0FBb0IzQixLQUFwQixDQUFQOztJQUNGO01BQ0UsT0FBTyxFQUFQO0VBWEo7QUFhRCxDQXhDRCJ9

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FORMAT_PLAIN = exports.FORMAT_HTML = exports.FORMATS = void 0;
var FORMAT_HTML = "html";
exports.FORMAT_HTML = FORMAT_HTML;
var FORMAT_PLAIN = "plain";
exports.FORMAT_PLAIN = FORMAT_PLAIN;
var FORMATS = [FORMAT_HTML, FORMAT_PLAIN];
exports.FORMATS = FORMATS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGT1JNQVRfSFRNTCIsIkZPUk1BVF9QTEFJTiIsIkZPUk1BVFMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RhbnRzL2Zvcm1hdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEZPUk1BVF9IVE1MID0gXCJodG1sXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNQVRfUExBSU4gPSBcInBsYWluXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNQVRTID0gW0ZPUk1BVF9IVE1MLCBGT1JNQVRfUExBSU5dO1xyXG5leHBvcnQgdHlwZSBMb3JlbUZvcm1hdCA9IFwicGxhaW5cIiB8IFwiaHRtbFwiO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQU1BLFdBQVcsR0FBRyxNQUFwQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsT0FBckI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLENBQUNGLFdBQUQsRUFBY0MsWUFBZCxDQUFoQiJ9

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UNIT_WORDS = exports.UNIT_WORD = exports.UNIT_SENTENCES = exports.UNIT_SENTENCE = exports.UNIT_PARAGRAPHS = exports.UNIT_PARAGRAPH = exports.UNITS = void 0;
var UNIT_WORDS = "words";
exports.UNIT_WORDS = UNIT_WORDS;
var UNIT_WORD = "word";
exports.UNIT_WORD = UNIT_WORD;
var UNIT_SENTENCES = "sentences";
exports.UNIT_SENTENCES = UNIT_SENTENCES;
var UNIT_SENTENCE = "sentence";
exports.UNIT_SENTENCE = UNIT_SENTENCE;
var UNIT_PARAGRAPHS = "paragraphs";
exports.UNIT_PARAGRAPHS = UNIT_PARAGRAPHS;
var UNIT_PARAGRAPH = "paragraph";
exports.UNIT_PARAGRAPH = UNIT_PARAGRAPH;
var UNITS = [UNIT_WORDS, UNIT_WORD, UNIT_SENTENCES, UNIT_SENTENCE, UNIT_PARAGRAPHS, UNIT_PARAGRAPH];
exports.UNITS = UNITS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVTklUX1dPUkRTIiwiVU5JVF9XT1JEIiwiVU5JVF9TRU5URU5DRVMiLCJVTklUX1NFTlRFTkNFIiwiVU5JVF9QQVJBR1JBUEhTIiwiVU5JVF9QQVJBR1JBUEgiLCJVTklUUyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvdW5pdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFVOSVRfV09SRFMgPSBcIndvcmRzXCI7XG5leHBvcnQgY29uc3QgVU5JVF9XT1JEID0gXCJ3b3JkXCI7XG5leHBvcnQgY29uc3QgVU5JVF9TRU5URU5DRVMgPSBcInNlbnRlbmNlc1wiO1xuZXhwb3J0IGNvbnN0IFVOSVRfU0VOVEVOQ0UgPSBcInNlbnRlbmNlXCI7XG5leHBvcnQgY29uc3QgVU5JVF9QQVJBR1JBUEhTID0gXCJwYXJhZ3JhcGhzXCI7XG5leHBvcnQgY29uc3QgVU5JVF9QQVJBR1JBUEggPSBcInBhcmFncmFwaFwiO1xuZXhwb3J0IGNvbnN0IFVOSVRTID0gW1xuICBVTklUX1dPUkRTLFxuICBVTklUX1dPUkQsXG4gIFVOSVRfU0VOVEVOQ0VTLFxuICBVTklUX1NFTlRFTkNFLFxuICBVTklUX1BBUkFHUkFQSFMsXG4gIFVOSVRfUEFSQUdSQVBILFxuXTtcbmV4cG9ydCB0eXBlIExvcmVtVW5pdCA9IFwid29yZHNcIiB8IFwid29yZFwiIHwgXCJzZW50ZW5jZXNcIiB8IFwic2VudGVuY2VcIiB8IFwicGFyYWdyYXBoc1wiIHwgXCJwYXJhZ3JhcGhcIjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsVUFBVSxHQUFHLE9BQW5COztBQUNBLElBQU1DLFNBQVMsR0FBRyxNQUFsQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsV0FBdkI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLFVBQXRCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxZQUF4Qjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsV0FBdkI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHLENBQ25CTixVQURtQixFQUVuQkMsU0FGbUIsRUFHbkJDLGNBSG1CLEVBSW5CQyxhQUptQixFQUtuQkMsZUFMbUIsRUFNbkJDLGNBTm1CLENBQWQifQ==

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WORDS = void 0;
var WORDS = ["ad", "adipisicing", "aliqua", "aliquip", "amet", "anim", "aute", "cillum", "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", "duis", "ea", "eiusmod", "elit", "enim", "esse", "est", "et", "eu", "ex", "excepteur", "exercitation", "fugiat", "id", "in", "incididunt", "ipsum", "irure", "labore", "laboris", "laborum", "Lorem", "magna", "minim", "mollit", "nisi", "non", "nostrud", "nulla", "occaecat", "officia", "pariatur", "proident", "qui", "quis", "reprehenderit", "sint", "sit", "sunt", "tempor", "ullamco", "ut", "velit", "veniam", "voluptate"];
exports.WORDS = WORDS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJXT1JEUyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvd29yZHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFdPUkRTID0gW1xyXG4gIFwiYWRcIixcclxuICBcImFkaXBpc2ljaW5nXCIsXHJcbiAgXCJhbGlxdWFcIixcclxuICBcImFsaXF1aXBcIixcclxuICBcImFtZXRcIixcclxuICBcImFuaW1cIixcclxuICBcImF1dGVcIixcclxuICBcImNpbGx1bVwiLFxyXG4gIFwiY29tbW9kb1wiLFxyXG4gIFwiY29uc2VjdGV0dXJcIixcclxuICBcImNvbnNlcXVhdFwiLFxyXG4gIFwiY3VscGFcIixcclxuICBcImN1cGlkYXRhdFwiLFxyXG4gIFwiZGVzZXJ1bnRcIixcclxuICBcImRvXCIsXHJcbiAgXCJkb2xvclwiLFxyXG4gIFwiZG9sb3JlXCIsXHJcbiAgXCJkdWlzXCIsXHJcbiAgXCJlYVwiLFxyXG4gIFwiZWl1c21vZFwiLFxyXG4gIFwiZWxpdFwiLFxyXG4gIFwiZW5pbVwiLFxyXG4gIFwiZXNzZVwiLFxyXG4gIFwiZXN0XCIsXHJcbiAgXCJldFwiLFxyXG4gIFwiZXVcIixcclxuICBcImV4XCIsXHJcbiAgXCJleGNlcHRldXJcIixcclxuICBcImV4ZXJjaXRhdGlvblwiLFxyXG4gIFwiZnVnaWF0XCIsXHJcbiAgXCJpZFwiLFxyXG4gIFwiaW5cIixcclxuICBcImluY2lkaWR1bnRcIixcclxuICBcImlwc3VtXCIsXHJcbiAgXCJpcnVyZVwiLFxyXG4gIFwibGFib3JlXCIsXHJcbiAgXCJsYWJvcmlzXCIsXHJcbiAgXCJsYWJvcnVtXCIsXHJcbiAgXCJMb3JlbVwiLFxyXG4gIFwibWFnbmFcIixcclxuICBcIm1pbmltXCIsXHJcbiAgXCJtb2xsaXRcIixcclxuICBcIm5pc2lcIixcclxuICBcIm5vblwiLFxyXG4gIFwibm9zdHJ1ZFwiLFxyXG4gIFwibnVsbGFcIixcclxuICBcIm9jY2FlY2F0XCIsXHJcbiAgXCJvZmZpY2lhXCIsXHJcbiAgXCJwYXJpYXR1clwiLFxyXG4gIFwicHJvaWRlbnRcIixcclxuICBcInF1aVwiLFxyXG4gIFwicXVpc1wiLFxyXG4gIFwicmVwcmVoZW5kZXJpdFwiLFxyXG4gIFwic2ludFwiLFxyXG4gIFwic2l0XCIsXHJcbiAgXCJzdW50XCIsXHJcbiAgXCJ0ZW1wb3JcIixcclxuICBcInVsbGFtY29cIixcclxuICBcInV0XCIsXHJcbiAgXCJ2ZWxpdFwiLFxyXG4gIFwidmVuaWFtXCIsXHJcbiAgXCJ2b2x1cHRhdGVcIixcclxuXTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxJQUFNQSxLQUFLLEdBQUcsQ0FDbkIsSUFEbUIsRUFFbkIsYUFGbUIsRUFHbkIsUUFIbUIsRUFJbkIsU0FKbUIsRUFLbkIsTUFMbUIsRUFNbkIsTUFObUIsRUFPbkIsTUFQbUIsRUFRbkIsUUFSbUIsRUFTbkIsU0FUbUIsRUFVbkIsYUFWbUIsRUFXbkIsV0FYbUIsRUFZbkIsT0FabUIsRUFhbkIsV0FibUIsRUFjbkIsVUFkbUIsRUFlbkIsSUFmbUIsRUFnQm5CLE9BaEJtQixFQWlCbkIsUUFqQm1CLEVBa0JuQixNQWxCbUIsRUFtQm5CLElBbkJtQixFQW9CbkIsU0FwQm1CLEVBcUJuQixNQXJCbUIsRUFzQm5CLE1BdEJtQixFQXVCbkIsTUF2Qm1CLEVBd0JuQixLQXhCbUIsRUF5Qm5CLElBekJtQixFQTBCbkIsSUExQm1CLEVBMkJuQixJQTNCbUIsRUE0Qm5CLFdBNUJtQixFQTZCbkIsY0E3Qm1CLEVBOEJuQixRQTlCbUIsRUErQm5CLElBL0JtQixFQWdDbkIsSUFoQ21CLEVBaUNuQixZQWpDbUIsRUFrQ25CLE9BbENtQixFQW1DbkIsT0FuQ21CLEVBb0NuQixRQXBDbUIsRUFxQ25CLFNBckNtQixFQXNDbkIsU0F0Q21CLEVBdUNuQixPQXZDbUIsRUF3Q25CLE9BeENtQixFQXlDbkIsT0F6Q21CLEVBMENuQixRQTFDbUIsRUEyQ25CLE1BM0NtQixFQTRDbkIsS0E1Q21CLEVBNkNuQixTQTdDbUIsRUE4Q25CLE9BOUNtQixFQStDbkIsVUEvQ21CLEVBZ0RuQixTQWhEbUIsRUFpRG5CLFVBakRtQixFQWtEbkIsVUFsRG1CLEVBbURuQixLQW5EbUIsRUFvRG5CLE1BcERtQixFQXFEbkIsZUFyRG1CLEVBc0RuQixNQXREbUIsRUF1RG5CLEtBdkRtQixFQXdEbkIsTUF4RG1CLEVBeURuQixRQXpEbUIsRUEwRG5CLFNBMURtQixFQTJEbkIsSUEzRG1CLEVBNERuQixPQTVEbUIsRUE2RG5CLFFBN0RtQixFQThEbkIsV0E5RG1CLENBQWQifQ==

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _formats = __webpack_require__(13);

var _lineEndings = __webpack_require__(17);

var _generator = _interopRequireDefault(__webpack_require__(18));

var _util = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoremIpsum = /*#__PURE__*/function () {
  function LoremIpsum() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _formats.FORMAT_PLAIN;
    var suffix = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, LoremIpsum);

    this.format = format;
    this.suffix = suffix;

    _defineProperty(this, "generator", void 0);

    if (_formats.FORMATS.indexOf(format.toLowerCase()) === -1) {
      throw new Error("".concat(format, " is an invalid format. Please use ").concat(_formats.FORMATS.join(" or "), "."));
    }

    this.generator = new _generator["default"](options);
  }

  _createClass(LoremIpsum, [{
    key: "getLineEnding",
    value: function getLineEnding() {
      if (this.suffix) {
        return this.suffix;
      }

      if (!(0, _util.isReactNative)() && (0, _util.isNode)() && (0, _util.isWindows)()) {
        return _lineEndings.LINE_ENDINGS.WIN32;
      }

      return _lineEndings.LINE_ENDINGS.POSIX;
    }
  }, {
    key: "formatString",
    value: function formatString(str) {
      if (this.format === _formats.FORMAT_HTML) {
        return "<p>".concat(str, "</p>");
      }

      return str;
    }
  }, {
    key: "formatStrings",
    value: function formatStrings(strings) {
      var _this = this;

      return strings.map(function (str) {
        return _this.formatString(str);
      });
    }
  }, {
    key: "generateWords",
    value: function generateWords(num) {
      return this.formatString(this.generator.generateRandomWords(num));
    }
  }, {
    key: "generateSentences",
    value: function generateSentences(num) {
      return this.formatString(this.generator.generateRandomParagraph(num));
    }
  }, {
    key: "generateParagraphs",
    value: function generateParagraphs(num) {
      var makeString = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, _util.makeArrayOfStrings)(num, makeString)).join(this.getLineEnding());
    }
  }]);

  return LoremIpsum;
}();

var _default = LoremIpsum;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMb3JlbUlwc3VtIiwib3B0aW9ucyIsImZvcm1hdCIsIkZPUk1BVF9QTEFJTiIsInN1ZmZpeCIsIkZPUk1BVFMiLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJFcnJvciIsImpvaW4iLCJnZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJpc1JlYWN0TmF0aXZlIiwiaXNOb2RlIiwiaXNXaW5kb3dzIiwiTElORV9FTkRJTkdTIiwiV0lOMzIiLCJQT1NJWCIsInN0ciIsIkZPUk1BVF9IVE1MIiwic3RyaW5ncyIsIm1hcCIsImZvcm1hdFN0cmluZyIsIm51bSIsImdlbmVyYXRlUmFuZG9tV29yZHMiLCJnZW5lcmF0ZVJhbmRvbVBhcmFncmFwaCIsIm1ha2VTdHJpbmciLCJiaW5kIiwiZm9ybWF0U3RyaW5ncyIsIm1ha2VBcnJheU9mU3RyaW5ncyIsImdldExpbmVFbmRpbmciXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL0xvcmVtSXBzdW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRk9STUFUX0hUTUwsIEZPUk1BVF9QTEFJTiwgRk9STUFUUywgTG9yZW1Gb3JtYXQgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2Zvcm1hdHNcIjtcclxuaW1wb3J0IHsgTElORV9FTkRJTkdTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9saW5lRW5kaW5nc1wiO1xyXG5pbXBvcnQgR2VuZXJhdG9yLCB7IElHZW5lcmF0b3JPcHRpb25zIH0gZnJvbSBcIi4uL2xpYi9nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgaXNOb2RlLCBpc1JlYWN0TmF0aXZlLCBpc1dpbmRvd3MsIG1ha2VBcnJheU9mU3RyaW5ncyB9IGZyb20gXCIuLi91dGlsXCI7XHJcblxyXG5jbGFzcyBMb3JlbUlwc3VtIHtcclxuICBwdWJsaWMgZ2VuZXJhdG9yOiBHZW5lcmF0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgb3B0aW9uczogSUdlbmVyYXRvck9wdGlvbnMgPSB7fSxcclxuICAgIHB1YmxpYyBmb3JtYXQ6IExvcmVtRm9ybWF0ID0gRk9STUFUX1BMQUlOLFxyXG4gICAgcHVibGljIHN1ZmZpeD86IHN0cmluZyxcclxuICApIHtcclxuICAgIGlmIChGT1JNQVRTLmluZGV4T2YoZm9ybWF0LnRvTG93ZXJDYXNlKCkpID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYCR7Zm9ybWF0fSBpcyBhbiBpbnZhbGlkIGZvcm1hdC4gUGxlYXNlIHVzZSAke0ZPUk1BVFMuam9pbihcIiBvciBcIil9LmAsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3Iob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGluZUVuZGluZygpIHtcclxuICAgIGlmICh0aGlzLnN1ZmZpeCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdWZmaXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1JlYWN0TmF0aXZlKCkgJiYgaXNOb2RlKCkgJiYgaXNXaW5kb3dzKCkpIHtcclxuICAgICAgcmV0dXJuIExJTkVfRU5ESU5HUy5XSU4zMjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTElORV9FTkRJTkdTLlBPU0lYO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5mb3JtYXQgPT09IEZPUk1BVF9IVE1MKSB7XHJcbiAgICAgIHJldHVybiBgPHA+JHtzdHJ9PC9wPmA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFN0cmluZ3Moc3RyaW5nczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5tYXAoKHN0cikgPT4gdGhpcy5mb3JtYXRTdHJpbmcoc3RyKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2VuZXJhdGVXb3JkcyhudW0/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0U3RyaW5nKHRoaXMuZ2VuZXJhdG9yLmdlbmVyYXRlUmFuZG9tV29yZHMobnVtKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2VuZXJhdGVTZW50ZW5jZXMobnVtPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdFN0cmluZyh0aGlzLmdlbmVyYXRvci5nZW5lcmF0ZVJhbmRvbVBhcmFncmFwaChudW0pKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZW5lcmF0ZVBhcmFncmFwaHMobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbWFrZVN0cmluZyA9IHRoaXMuZ2VuZXJhdG9yLmdlbmVyYXRlUmFuZG9tUGFyYWdyYXBoLmJpbmQoXHJcbiAgICAgIHRoaXMuZ2VuZXJhdG9yLFxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdFN0cmluZ3MobWFrZUFycmF5T2ZTdHJpbmdzKG51bSwgbWFrZVN0cmluZykpLmpvaW4oXHJcbiAgICAgIHRoaXMuZ2V0TGluZUVuZGluZygpLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvcmVtSXBzdW07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVTtFQUdKLHNCQUlFO0lBQUEsSUFIQUMsT0FHQSx1RUFINkIsRUFHN0I7SUFBQSxJQUZPQyxNQUVQLHVFQUY2QkMscUJBRTdCO0lBQUEsSUFET0MsTUFDUDs7SUFBQTs7SUFBQSxLQUZPRixNQUVQLEdBRk9BLE1BRVA7SUFBQSxLQURPRSxNQUNQLEdBRE9BLE1BQ1A7O0lBQUE7O0lBQ0EsSUFBSUMsZ0JBQUEsQ0FBUUMsT0FBUixDQUFnQkosTUFBTSxDQUFDSyxXQUFQLEVBQWhCLE1BQTBDLENBQUMsQ0FBL0MsRUFBa0Q7TUFDaEQsTUFBTSxJQUFJQyxLQUFKLFdBQ0ROLE1BREMsK0NBQzBDRyxnQkFBQSxDQUFRSSxJQUFSLENBQWEsTUFBYixDQUQxQyxPQUFOO0lBR0Q7O0lBQ0QsS0FBS0MsU0FBTCxHQUFpQixJQUFJQyxxQkFBSixDQUFjVixPQUFkLENBQWpCO0VBQ0Q7Ozs7V0FFRCx5QkFBdUI7TUFDckIsSUFBSSxLQUFLRyxNQUFULEVBQWlCO1FBQ2YsT0FBTyxLQUFLQSxNQUFaO01BQ0Q7O01BRUQsSUFBSSxDQUFDLElBQUFRLG1CQUFBLEdBQUQsSUFBb0IsSUFBQUMsWUFBQSxHQUFwQixJQUFnQyxJQUFBQyxlQUFBLEdBQXBDLEVBQWlEO1FBQy9DLE9BQU9DLHlCQUFBLENBQWFDLEtBQXBCO01BQ0Q7O01BRUQsT0FBT0QseUJBQUEsQ0FBYUUsS0FBcEI7SUFDRDs7O1dBRUQsc0JBQW9CQyxHQUFwQixFQUF5QztNQUN2QyxJQUFJLEtBQUtoQixNQUFMLEtBQWdCaUIsb0JBQXBCLEVBQWlDO1FBQy9CLG9CQUFhRCxHQUFiO01BQ0Q7O01BQ0QsT0FBT0EsR0FBUDtJQUNEOzs7V0FFRCx1QkFBcUJFLE9BQXJCLEVBQWtEO01BQUE7O01BQ2hELE9BQU9BLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQUNILEdBQUQ7UUFBQSxPQUFTLEtBQUksQ0FBQ0ksWUFBTCxDQUFrQkosR0FBbEIsQ0FBVDtNQUFBLENBQVosQ0FBUDtJQUNEOzs7V0FFRCx1QkFBcUJLLEdBQXJCLEVBQTJDO01BQ3pDLE9BQU8sS0FBS0QsWUFBTCxDQUFrQixLQUFLWixTQUFMLENBQWVjLG1CQUFmLENBQW1DRCxHQUFuQyxDQUFsQixDQUFQO0lBQ0Q7OztXQUVELDJCQUF5QkEsR0FBekIsRUFBK0M7TUFDN0MsT0FBTyxLQUFLRCxZQUFMLENBQWtCLEtBQUtaLFNBQUwsQ0FBZWUsdUJBQWYsQ0FBdUNGLEdBQXZDLENBQWxCLENBQVA7SUFDRDs7O1dBRUQsNEJBQTBCQSxHQUExQixFQUErQztNQUM3QyxJQUFNRyxVQUFVLEdBQUcsS0FBS2hCLFNBQUwsQ0FBZWUsdUJBQWYsQ0FBdUNFLElBQXZDLENBQ2pCLEtBQUtqQixTQURZLENBQW5CO01BR0EsT0FBTyxLQUFLa0IsYUFBTCxDQUFtQixJQUFBQyx3QkFBQSxFQUFtQk4sR0FBbkIsRUFBd0JHLFVBQXhCLENBQW5CLEVBQXdEakIsSUFBeEQsQ0FDTCxLQUFLcUIsYUFBTCxFQURLLENBQVA7SUFHRDs7Ozs7O2VBR1k5QixVIn0=

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LINE_ENDINGS = void 0;
var LINE_ENDINGS = {
  POSIX: "\n",
  WIN32: "\r\n"
};
exports.LINE_ENDINGS = LINE_ENDINGS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMSU5FX0VORElOR1MiLCJQT1NJWCIsIldJTjMyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy9saW5lRW5kaW5ncy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgTElORV9FTkRJTkdTID0ge1xyXG4gIFBPU0lYOiBcIlxcblwiLFxyXG4gIFdJTjMyOiBcIlxcclxcblwiLFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQU1BLFlBQVksR0FBRztFQUMxQkMsS0FBSyxFQUFFLElBRG1CO0VBRTFCQyxLQUFLLEVBQUU7QUFGbUIsQ0FBckIifQ==

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _words = __webpack_require__(15);

var _util = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Generator = /*#__PURE__*/function () {
  function Generator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$sentencesPerPara = _ref.sentencesPerParagraph,
        sentencesPerParagraph = _ref$sentencesPerPara === void 0 ? {
      max: 7,
      min: 3
    } : _ref$sentencesPerPara,
        _ref$wordsPerSentence = _ref.wordsPerSentence,
        wordsPerSentence = _ref$wordsPerSentence === void 0 ? {
      max: 15,
      min: 5
    } : _ref$wordsPerSentence,
        random = _ref.random,
        seed = _ref.seed,
        _ref$words = _ref.words,
        words = _ref$words === void 0 ? _words.WORDS : _ref$words;

    _classCallCheck(this, Generator);

    _defineProperty(this, "sentencesPerParagraph", void 0);

    _defineProperty(this, "wordsPerSentence", void 0);

    _defineProperty(this, "random", void 0);

    _defineProperty(this, "words", void 0);

    if (sentencesPerParagraph.min > sentencesPerParagraph.max) {
      throw new Error("Minimum number of sentences per paragraph (".concat(sentencesPerParagraph.min, ") cannot exceed maximum (").concat(sentencesPerParagraph.max, ")."));
    }

    if (wordsPerSentence.min > wordsPerSentence.max) {
      throw new Error("Minimum number of words per sentence (".concat(wordsPerSentence.min, ") cannot exceed maximum (").concat(wordsPerSentence.max, ")."));
    }

    this.sentencesPerParagraph = sentencesPerParagraph;
    this.words = words;
    this.wordsPerSentence = wordsPerSentence;
    this.random = random || Math.random;
  }

  _createClass(Generator, [{
    key: "generateRandomInteger",
    value: function generateRandomInteger(min, max) {
      return Math.floor(this.random() * (max - min + 1) + min);
    }
  }, {
    key: "generateRandomWords",
    value: function generateRandomWords(num) {
      var _this = this;

      var _this$wordsPerSentenc = this.wordsPerSentence,
          min = _this$wordsPerSentenc.min,
          max = _this$wordsPerSentenc.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this.pluckRandomWord(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "generateRandomSentence",
    value: function generateRandomSentence(num) {
      return "".concat((0, _util.capitalize)(this.generateRandomWords(num)), ".");
    }
  }, {
    key: "generateRandomParagraph",
    value: function generateRandomParagraph(num) {
      var _this2 = this;

      var _this$sentencesPerPar = this.sentencesPerParagraph,
          min = _this$sentencesPerPar.min,
          max = _this$sentencesPerPar.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this2.generateRandomSentence(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "pluckRandomWord",
    value: function pluckRandomWord() {
      var min = 0;
      var max = this.words.length - 1;
      var index = this.generateRandomInteger(min, max);
      return this.words[index];
    }
  }]);

  return Generator;
}();

var _default = Generator;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHZW5lcmF0b3IiLCJzZW50ZW5jZXNQZXJQYXJhZ3JhcGgiLCJtYXgiLCJtaW4iLCJ3b3Jkc1BlclNlbnRlbmNlIiwicmFuZG9tIiwic2VlZCIsIndvcmRzIiwiV09SRFMiLCJFcnJvciIsIk1hdGgiLCJmbG9vciIsIm51bSIsImxlbmd0aCIsImdlbmVyYXRlUmFuZG9tSW50ZWdlciIsIm1ha2VBcnJheU9mTGVuZ3RoIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJpbmRleCIsInBsdWNrUmFuZG9tV29yZCIsInRyaW0iLCJjYXBpdGFsaXplIiwiZ2VuZXJhdGVSYW5kb21Xb3JkcyIsImdlbmVyYXRlUmFuZG9tU2VudGVuY2UiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXT1JEUyB9IGZyb20gXCIuLi9jb25zdGFudHMvd29yZHNcIjtcclxuaW1wb3J0IHsgY2FwaXRhbGl6ZSwgbWFrZUFycmF5T2ZMZW5ndGggfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRzIHtcclxuICBtaW46IG51bWJlcjtcclxuICBtYXg6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSVBybmcgPSAoKSA9PiBudW1iZXI7XHJcblxyXG5leHBvcnQgdHlwZSBJU2VlZFJhbmRvbSA9IG5ldyAoc2VlZD86IHN0cmluZykgPT4gSVBybmc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRoIHtcclxuICBzZWVkcmFuZG9tOiBJU2VlZFJhbmRvbTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2VuZXJhdG9yT3B0aW9ucyB7XHJcbiAgc2VudGVuY2VzUGVyUGFyYWdyYXBoPzogSUJvdW5kcztcclxuICB3b3Jkc1BlclNlbnRlbmNlPzogSUJvdW5kcztcclxuICByYW5kb20/OiBJUHJuZztcclxuICBzZWVkPzogc3RyaW5nO1xyXG4gIHdvcmRzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmNsYXNzIEdlbmVyYXRvciB7XHJcbiAgcHVibGljIHNlbnRlbmNlc1BlclBhcmFncmFwaDogSUJvdW5kcztcclxuICBwdWJsaWMgd29yZHNQZXJTZW50ZW5jZTogSUJvdW5kcztcclxuICBwdWJsaWMgcmFuZG9tOiBJUHJuZztcclxuICBwdWJsaWMgd29yZHM6IHN0cmluZ1tdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICBzZW50ZW5jZXNQZXJQYXJhZ3JhcGggPSB7IG1heDogNywgbWluOiAzIH0sXHJcbiAgICB3b3Jkc1BlclNlbnRlbmNlID0geyBtYXg6IDE1LCBtaW46IDUgfSxcclxuICAgIHJhbmRvbSxcclxuICAgIHNlZWQsXHJcbiAgICB3b3JkcyA9IFdPUkRTLFxyXG4gIH06IElHZW5lcmF0b3JPcHRpb25zID0ge30pIHtcclxuICAgIGlmIChzZW50ZW5jZXNQZXJQYXJhZ3JhcGgubWluID4gc2VudGVuY2VzUGVyUGFyYWdyYXBoLm1heCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYE1pbmltdW0gbnVtYmVyIG9mIHNlbnRlbmNlcyBwZXIgcGFyYWdyYXBoICgke1xyXG4gICAgICAgICAgc2VudGVuY2VzUGVyUGFyYWdyYXBoLm1pblxyXG4gICAgICAgIH0pIGNhbm5vdCBleGNlZWQgbWF4aW11bSAoJHtzZW50ZW5jZXNQZXJQYXJhZ3JhcGgubWF4fSkuYCxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod29yZHNQZXJTZW50ZW5jZS5taW4gPiB3b3Jkc1BlclNlbnRlbmNlLm1heCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYE1pbmltdW0gbnVtYmVyIG9mIHdvcmRzIHBlciBzZW50ZW5jZSAoJHtcclxuICAgICAgICAgIHdvcmRzUGVyU2VudGVuY2UubWluXHJcbiAgICAgICAgfSkgY2Fubm90IGV4Y2VlZCBtYXhpbXVtICgke3dvcmRzUGVyU2VudGVuY2UubWF4fSkuYCxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbnRlbmNlc1BlclBhcmFncmFwaCA9IHNlbnRlbmNlc1BlclBhcmFncmFwaDtcclxuICAgIHRoaXMud29yZHMgPSB3b3JkcztcclxuICAgIHRoaXMud29yZHNQZXJTZW50ZW5jZSA9IHdvcmRzUGVyU2VudGVuY2U7XHJcbiAgICB0aGlzLnJhbmRvbSA9IHJhbmRvbSB8fCBNYXRoLnJhbmRvbTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZW5lcmF0ZVJhbmRvbUludGVnZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdlbmVyYXRlUmFuZG9tV29yZHMobnVtPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMud29yZHNQZXJTZW50ZW5jZTtcclxuICAgIGNvbnN0IGxlbmd0aCA9IG51bSB8fCB0aGlzLmdlbmVyYXRlUmFuZG9tSW50ZWdlcihtaW4sIG1heCk7XHJcbiAgICByZXR1cm4gbWFrZUFycmF5T2ZMZW5ndGgobGVuZ3RoKVxyXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvcjogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5wbHVja1JhbmRvbVdvcmQoKX0gJHthY2N1bXVsYXRvcn1gO1xyXG4gICAgICB9LCBcIlwiKVxyXG4gICAgICAudHJpbSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdlbmVyYXRlUmFuZG9tU2VudGVuY2UobnVtPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHtjYXBpdGFsaXplKHRoaXMuZ2VuZXJhdGVSYW5kb21Xb3JkcyhudW0pKX0uYDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZW5lcmF0ZVJhbmRvbVBhcmFncmFwaChudW0/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpcy5zZW50ZW5jZXNQZXJQYXJhZ3JhcGg7XHJcbiAgICBjb25zdCBsZW5ndGggPSBudW0gfHwgdGhpcy5nZW5lcmF0ZVJhbmRvbUludGVnZXIobWluLCBtYXgpO1xyXG4gICAgcmV0dXJuIG1ha2VBcnJheU9mTGVuZ3RoKGxlbmd0aClcclxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3I6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2VuZXJhdGVSYW5kb21TZW50ZW5jZSgpfSAke2FjY3VtdWxhdG9yfWA7XHJcbiAgICAgIH0sIFwiXCIpXHJcbiAgICAgIC50cmltKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGx1Y2tSYW5kb21Xb3JkKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtaW4gPSAwO1xyXG4gICAgY29uc3QgbWF4ID0gdGhpcy53b3Jkcy5sZW5ndGggLSAxO1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdlbmVyYXRlUmFuZG9tSW50ZWdlcihtaW4sIG1heCk7XHJcbiAgICByZXR1cm4gdGhpcy53b3Jkc1tpbmRleF07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZW5lcmF0b3I7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0lBdUJNQSxTO0VBTUoscUJBTTJCO0lBQUEsK0VBQUosRUFBSTtJQUFBLGlDQUx6QkMscUJBS3lCO0lBQUEsSUFMekJBLHFCQUt5QixzQ0FMRDtNQUFFQyxHQUFHLEVBQUUsQ0FBUDtNQUFVQyxHQUFHLEVBQUU7SUFBZixDQUtDO0lBQUEsaUNBSnpCQyxnQkFJeUI7SUFBQSxJQUp6QkEsZ0JBSXlCLHNDQUpOO01BQUVGLEdBQUcsRUFBRSxFQUFQO01BQVdDLEdBQUcsRUFBRTtJQUFoQixDQUlNO0lBQUEsSUFIekJFLE1BR3lCLFFBSHpCQSxNQUd5QjtJQUFBLElBRnpCQyxJQUV5QixRQUZ6QkEsSUFFeUI7SUFBQSxzQkFEekJDLEtBQ3lCO0lBQUEsSUFEekJBLEtBQ3lCLDJCQURqQkMsWUFDaUI7O0lBQUE7O0lBQUE7O0lBQUE7O0lBQUE7O0lBQUE7O0lBQ3pCLElBQUlQLHFCQUFxQixDQUFDRSxHQUF0QixHQUE0QkYscUJBQXFCLENBQUNDLEdBQXRELEVBQTJEO01BQ3pELE1BQU0sSUFBSU8sS0FBSixzREFFRlIscUJBQXFCLENBQUNFLEdBRnBCLHNDQUd3QkYscUJBQXFCLENBQUNDLEdBSDlDLFFBQU47SUFLRDs7SUFFRCxJQUFJRSxnQkFBZ0IsQ0FBQ0QsR0FBakIsR0FBdUJDLGdCQUFnQixDQUFDRixHQUE1QyxFQUFpRDtNQUMvQyxNQUFNLElBQUlPLEtBQUosaURBRUZMLGdCQUFnQixDQUFDRCxHQUZmLHNDQUd3QkMsZ0JBQWdCLENBQUNGLEdBSHpDLFFBQU47SUFLRDs7SUFFRCxLQUFLRCxxQkFBTCxHQUE2QkEscUJBQTdCO0lBQ0EsS0FBS00sS0FBTCxHQUFhQSxLQUFiO0lBQ0EsS0FBS0gsZ0JBQUwsR0FBd0JBLGdCQUF4QjtJQUNBLEtBQUtDLE1BQUwsR0FBY0EsTUFBTSxJQUFJSyxJQUFJLENBQUNMLE1BQTdCO0VBQ0Q7Ozs7V0FFRCwrQkFBNkJGLEdBQTdCLEVBQTBDRCxHQUExQyxFQUErRDtNQUM3RCxPQUFPUSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLTixNQUFMLE1BQWlCSCxHQUFHLEdBQUdDLEdBQU4sR0FBWSxDQUE3QixJQUFrQ0EsR0FBN0MsQ0FBUDtJQUNEOzs7V0FFRCw2QkFBMkJTLEdBQTNCLEVBQWlEO01BQUE7O01BQy9DLDRCQUFxQixLQUFLUixnQkFBMUI7TUFBQSxJQUFRRCxHQUFSLHlCQUFRQSxHQUFSO01BQUEsSUFBYUQsR0FBYix5QkFBYUEsR0FBYjtNQUNBLElBQU1XLE1BQU0sR0FBR0QsR0FBRyxJQUFJLEtBQUtFLHFCQUFMLENBQTJCWCxHQUEzQixFQUFnQ0QsR0FBaEMsQ0FBdEI7TUFDQSxPQUFPLElBQUFhLHVCQUFBLEVBQWtCRixNQUFsQixFQUNKRyxNQURJLENBQ0csVUFBQ0MsV0FBRCxFQUFzQkMsS0FBdEIsRUFBZ0Q7UUFDdEQsaUJBQVUsS0FBSSxDQUFDQyxlQUFMLEVBQVYsY0FBb0NGLFdBQXBDO01BQ0QsQ0FISSxFQUdGLEVBSEUsRUFJSkcsSUFKSSxFQUFQO0lBS0Q7OztXQUVELGdDQUE4QlIsR0FBOUIsRUFBb0Q7TUFDbEQsaUJBQVUsSUFBQVMsZ0JBQUEsRUFBVyxLQUFLQyxtQkFBTCxDQUF5QlYsR0FBekIsQ0FBWCxDQUFWO0lBQ0Q7OztXQUVELGlDQUErQkEsR0FBL0IsRUFBcUQ7TUFBQTs7TUFDbkQsNEJBQXFCLEtBQUtYLHFCQUExQjtNQUFBLElBQVFFLEdBQVIseUJBQVFBLEdBQVI7TUFBQSxJQUFhRCxHQUFiLHlCQUFhQSxHQUFiO01BQ0EsSUFBTVcsTUFBTSxHQUFHRCxHQUFHLElBQUksS0FBS0UscUJBQUwsQ0FBMkJYLEdBQTNCLEVBQWdDRCxHQUFoQyxDQUF0QjtNQUNBLE9BQU8sSUFBQWEsdUJBQUEsRUFBa0JGLE1BQWxCLEVBQ0pHLE1BREksQ0FDRyxVQUFDQyxXQUFELEVBQXNCQyxLQUF0QixFQUFnRDtRQUN0RCxpQkFBVSxNQUFJLENBQUNLLHNCQUFMLEVBQVYsY0FBMkNOLFdBQTNDO01BQ0QsQ0FISSxFQUdGLEVBSEUsRUFJSkcsSUFKSSxFQUFQO0lBS0Q7OztXQUVELDJCQUFpQztNQUMvQixJQUFNakIsR0FBRyxHQUFHLENBQVo7TUFDQSxJQUFNRCxHQUFHLEdBQUcsS0FBS0ssS0FBTCxDQUFXTSxNQUFYLEdBQW9CLENBQWhDO01BQ0EsSUFBTUssS0FBSyxHQUFHLEtBQUtKLHFCQUFMLENBQTJCWCxHQUEzQixFQUFnQ0QsR0FBaEMsQ0FBZDtNQUNBLE9BQU8sS0FBS0ssS0FBTCxDQUFXVyxLQUFYLENBQVA7SUFDRDs7Ozs7O2VBR1lsQixTIn0=

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "capitalize", ({
  enumerable: true,
  get: function get() {
    return _capitalize["default"];
  }
}));
Object.defineProperty(exports, "isNode", ({
  enumerable: true,
  get: function get() {
    return _isNode["default"];
  }
}));
Object.defineProperty(exports, "isReactNative", ({
  enumerable: true,
  get: function get() {
    return _isReactNative["default"];
  }
}));
Object.defineProperty(exports, "isWindows", ({
  enumerable: true,
  get: function get() {
    return _isWindows["default"];
  }
}));
Object.defineProperty(exports, "makeArrayOfLength", ({
  enumerable: true,
  get: function get() {
    return _makeArrayOfLength["default"];
  }
}));
Object.defineProperty(exports, "makeArrayOfStrings", ({
  enumerable: true,
  get: function get() {
    return _makeArrayOfStrings["default"];
  }
}));

var _capitalize = _interopRequireDefault(__webpack_require__(20));

var _isNode = _interopRequireDefault(__webpack_require__(21));

var _isReactNative = _interopRequireDefault(__webpack_require__(22));

var _isWindows = _interopRequireDefault(__webpack_require__(23));

var _makeArrayOfLength = _interopRequireDefault(__webpack_require__(25));

var _makeArrayOfStrings = _interopRequireDefault(__webpack_require__(26));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhcGl0YWxpemUgZnJvbSBcIi4vY2FwaXRhbGl6ZVwiO1xyXG5pbXBvcnQgaXNOb2RlIGZyb20gXCIuL2lzTm9kZVwiO1xyXG5pbXBvcnQgaXNSZWFjdE5hdGl2ZSBmcm9tIFwiLi9pc1JlYWN0TmF0aXZlXCI7XHJcbmltcG9ydCBpc1dpbmRvd3MgZnJvbSBcIi4vaXNXaW5kb3dzXCI7XHJcbmltcG9ydCBtYWtlQXJyYXlPZkxlbmd0aCBmcm9tIFwiLi9tYWtlQXJyYXlPZkxlbmd0aFwiO1xyXG5pbXBvcnQgbWFrZUFycmF5T2ZTdHJpbmdzIGZyb20gXCIuL21ha2VBcnJheU9mU3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuICBjYXBpdGFsaXplLFxyXG4gIGlzTm9kZSxcclxuICBpc1JlYWN0TmF0aXZlLFxyXG4gIGlzV2luZG93cyxcclxuICBtYWtlQXJyYXlPZkxlbmd0aCxcclxuICBtYWtlQXJyYXlPZlN0cmluZ3MsXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0EifQ==

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/**
 * @param str  A string that may or may not be capitalized.
 * @returns    A capitalized string.
 */
var capitalize = function capitalize(str) {
  var trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

var _default = capitalize;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjYXBpdGFsaXplIiwic3RyIiwidHJpbW1lZCIsInRyaW0iLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvY2FwaXRhbGl6ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQHBhcmFtIHN0ciAgQSBzdHJpbmcgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBjYXBpdGFsaXplZC5cclxuICogQHJldHVybnMgICAgQSBjYXBpdGFsaXplZCBzdHJpbmcuXHJcbiAqL1xyXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB0cmltbWVkID0gc3RyLnRyaW0oKTtcclxuICByZXR1cm4gdHJpbW1lZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRyaW1tZWQuc2xpY2UoMSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYXBpdGFsaXplO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLEdBQUQsRUFBeUI7RUFDMUMsSUFBTUMsT0FBTyxHQUFHRCxHQUFHLENBQUNFLElBQUosRUFBaEI7RUFDQSxPQUFPRCxPQUFPLENBQUNFLE1BQVIsQ0FBZSxDQUFmLEVBQWtCQyxXQUFsQixLQUFrQ0gsT0FBTyxDQUFDSSxLQUFSLENBQWMsQ0FBZCxDQUF6QztBQUNELENBSEQ7O2VBS2VOLFUifQ==

/***/ }),
/* 21 */
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/**
 * @returns  True if the runtime is NodeJS.
 */
var isNode = function isNode() {
  return  true && !!module.exports;
};

var _default = isNode;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc05vZGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaXNOb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAcmV0dXJucyAgVHJ1ZSBpZiB0aGUgcnVudGltZSBpcyBOb2RlSlMuXHJcbiAqL1xyXG5jb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgISFtb2R1bGUuZXhwb3J0cztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlzTm9kZTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBZTtFQUM1QixPQUFPLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsQ0FBQyxDQUFDQSxNQUFNLENBQUNDLE9BQWpEO0FBQ0QsQ0FGRDs7ZUFJZUYsTSJ9

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/**
 * Check if runtime is ReactNative.
 * Solution based on https://github.com/knicklabs/lorem-ipsum.js/pull/52/files
 *
 * @returns  True if runtime is ReactNative.
 */
var isReactNative = function isReactNative() {
  var isReactNativeResult = false;

  try {
    isReactNativeResult = navigator.product === "ReactNative";
  } catch (e) {
    isReactNativeResult = false;
  }

  return isReactNativeResult;
};

var _default = isReactNative;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc1JlYWN0TmF0aXZlIiwiaXNSZWFjdE5hdGl2ZVJlc3VsdCIsIm5hdmlnYXRvciIsInByb2R1Y3QiLCJlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaXNSZWFjdE5hdGl2ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ2hlY2sgaWYgcnVudGltZSBpcyBSZWFjdE5hdGl2ZS5cclxuICogU29sdXRpb24gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2tuaWNrbGFicy9sb3JlbS1pcHN1bS5qcy9wdWxsLzUyL2ZpbGVzXHJcbiAqXHJcbiAqIEByZXR1cm5zICBUcnVlIGlmIHJ1bnRpbWUgaXMgUmVhY3ROYXRpdmUuXHJcbiAqL1xyXG5jb25zdCBpc1JlYWN0TmF0aXZlID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGxldCBpc1JlYWN0TmF0aXZlUmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpc1JlYWN0TmF0aXZlUmVzdWx0ID0gbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwiUmVhY3ROYXRpdmVcIjtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpc1JlYWN0TmF0aXZlUmVzdWx0ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaXNSZWFjdE5hdGl2ZVJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlzUmVhY3ROYXRpdmU7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBZTtFQUNuQyxJQUFJQyxtQkFBNEIsR0FBRyxLQUFuQzs7RUFFQSxJQUFJO0lBQ0ZBLG1CQUFtQixHQUFHQyxTQUFTLENBQUNDLE9BQVYsS0FBc0IsYUFBNUM7RUFDRCxDQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0lBQ1ZILG1CQUFtQixHQUFHLEtBQXRCO0VBQ0Q7O0VBRUQsT0FBT0EsbUJBQVA7QUFDRCxDQVZEOztlQVllRCxhIn0=

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _platforms = __webpack_require__(24);

/**
 * @returns True if process is windows.
 */
var isWindows = function isWindows() {
  var isWindowsResult = false;

  try {
    isWindowsResult = process.platform === _platforms.SUPPORTED_PLATFORMS.WIN32;
  } catch (e) {
    isWindowsResult = false;
  }

  return isWindowsResult;
};

var _default = isWindows;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc1dpbmRvd3MiLCJpc1dpbmRvd3NSZXN1bHQiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJTVVBQT1JURURfUExBVEZPUk1TIiwiV0lOMzIiLCJlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaXNXaW5kb3dzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNVUFBPUlRFRF9QTEFURk9STVMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL3BsYXRmb3Jtc1wiO1xyXG5cclxuLyoqXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgcHJvY2VzcyBpcyB3aW5kb3dzLlxyXG4gKi9cclxuY29uc3QgaXNXaW5kb3dzID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGxldCBpc1dpbmRvd3NSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB0cnkge1xyXG4gICAgaXNXaW5kb3dzUmVzdWx0ID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gU1VQUE9SVEVEX1BMQVRGT1JNUy5XSU4zMjtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpc1dpbmRvd3NSZXN1bHQgPSBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIGlzV2luZG93c1Jlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlzV2luZG93cztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBZTtFQUMvQixJQUFJQyxlQUF3QixHQUFHLEtBQS9COztFQUNBLElBQUk7SUFDRkEsZUFBZSxHQUFHQyxPQUFPLENBQUNDLFFBQVIsS0FBcUJDLDhCQUFBLENBQW9CQyxLQUEzRDtFQUNELENBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7SUFDVkwsZUFBZSxHQUFHLEtBQWxCO0VBQ0Q7O0VBQ0QsT0FBT0EsZUFBUDtBQUNELENBUkQ7O2VBVWVELFMifQ==

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SUPPORTED_PLATFORMS = void 0;
var SUPPORTED_PLATFORMS = {
  DARWIN: "darwin",
  LINUX: "linux",
  WIN32: "win32"
};
exports.SUPPORTED_PLATFORMS = SUPPORTED_PLATFORMS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTVVBQT1JURURfUExBVEZPUk1TIiwiREFSV0lOIiwiTElOVVgiLCJXSU4zMiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvcGxhdGZvcm1zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBTVVBQT1JURURfUExBVEZPUk1TID0ge1xyXG4gIERBUldJTjogXCJkYXJ3aW5cIixcclxuICBMSU5VWDogXCJsaW51eFwiLFxyXG4gIFdJTjMyOiBcIndpbjMyXCIsXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsbUJBQW1CLEdBQUc7RUFDakNDLE1BQU0sRUFBRSxRQUR5QjtFQUVqQ0MsS0FBSyxFQUFFLE9BRjBCO0VBR2pDQyxLQUFLLEVBQUU7QUFIMEIsQ0FBNUIifQ==

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/**
 * @param length Length "x".
 * @returns      An array of indexes of length "x".
 */
var makeArrayOfLength = function makeArrayOfLength() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return Array.apply(null, Array(length)).map(function (item, index) {
    return index;
  });
};

var _default = makeArrayOfLength;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWtlQXJyYXlPZkxlbmd0aCIsImxlbmd0aCIsIkFycmF5IiwiYXBwbHkiLCJtYXAiLCJpdGVtIiwiaW5kZXgiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9tYWtlQXJyYXlPZkxlbmd0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQHBhcmFtIGxlbmd0aCBMZW5ndGggXCJ4XCIuXHJcbiAqIEByZXR1cm5zICAgICAgQW4gYXJyYXkgb2YgaW5kZXhlcyBvZiBsZW5ndGggXCJ4XCIuXHJcbiAqL1xyXG5jb25zdCBtYWtlQXJyYXlPZkxlbmd0aCA9IChsZW5ndGg6IG51bWJlciA9IDApOiBudW1iZXJbXSA9PiB7XHJcbiAgcmV0dXJuIEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGxlbmd0aCkpLm1hcChcclxuICAgIChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpOiBudW1iZXIgPT4gaW5kZXgsXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VBcnJheU9mTGVuZ3RoO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsR0FBa0M7RUFBQSxJQUFqQ0MsTUFBaUMsdUVBQWhCLENBQWdCO0VBQzFELE9BQU9DLEtBQUssQ0FBQ0MsS0FBTixDQUFZLElBQVosRUFBa0JELEtBQUssQ0FBQ0QsTUFBRCxDQUF2QixFQUFpQ0csR0FBakMsQ0FDTCxVQUFDQyxJQUFELEVBQVlDLEtBQVo7SUFBQSxPQUFzQ0EsS0FBdEM7RUFBQSxDQURLLENBQVA7QUFHRCxDQUpEOztlQU1lTixpQiJ9

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _makeArrayOfLength = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param length  Length "x".
 * @returns       An array of strings of length "x".
 */
var makeArrayOfStrings = function makeArrayOfStrings(length, makeString) {
  var arr = (0, _makeArrayOfLength["default"])(length);
  return arr.map(function () {
    return makeString();
  });
};

var _default = makeArrayOfStrings;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWtlQXJyYXlPZlN0cmluZ3MiLCJsZW5ndGgiLCJtYWtlU3RyaW5nIiwiYXJyIiwibWFrZUFycmF5T2ZMZW5ndGgiLCJtYXAiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9tYWtlQXJyYXlPZlN0cmluZ3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VBcnJheU9mTGVuZ3RoIGZyb20gXCIuL21ha2VBcnJheU9mTGVuZ3RoXCI7XHJcbi8qKlxyXG4gKiBAcGFyYW0gbGVuZ3RoICBMZW5ndGggXCJ4XCIuXHJcbiAqIEByZXR1cm5zICAgICAgIEFuIGFycmF5IG9mIHN0cmluZ3Mgb2YgbGVuZ3RoIFwieFwiLlxyXG4gKi9cclxuY29uc3QgbWFrZUFycmF5T2ZTdHJpbmdzID0gKFxyXG4gIGxlbmd0aDogbnVtYmVyLFxyXG4gIG1ha2VTdHJpbmc6ICgpID0+IHN0cmluZyxcclxuKTogc3RyaW5nW10gPT4ge1xyXG4gIGNvbnN0IGFyciA9IG1ha2VBcnJheU9mTGVuZ3RoKGxlbmd0aCk7XHJcbiAgcmV0dXJuIGFyci5tYXAoKCkgPT4gbWFrZVN0cmluZygpKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VBcnJheU9mU3RyaW5ncztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FDekJDLE1BRHlCLEVBRXpCQyxVQUZ5QixFQUdaO0VBQ2IsSUFBTUMsR0FBRyxHQUFHLElBQUFDLDZCQUFBLEVBQWtCSCxNQUFsQixDQUFaO0VBQ0EsT0FBT0UsR0FBRyxDQUFDRSxHQUFKLENBQVE7SUFBQSxPQUFNSCxVQUFVLEVBQWhCO0VBQUEsQ0FBUixDQUFQO0FBQ0QsQ0FORDs7ZUFRZUYsa0IifQ==

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map