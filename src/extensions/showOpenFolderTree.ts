import * as vscode from 'vscode';

import * as fs from 'fs';
import {workspaceNavigation} from '../utils/workspaceNavigation';

export function showOpenFolderTree(){
    workspaceNavigation.getWorkspaceFilesAndFolders().then(res=> console.log(res));
}
