import * as vscode from 'vscode';
import * as workspaceNavigation from '../utils/workspaceNavigation';

export function showOpenFolderTree(){
    workspaceNavigation.getWorkspaceFilesAndFolders().then(res=> console.log(res));
}
