// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { displayHighlightedText } from './extensions/displayTextSelection';
import { showOpenFolderTree } from './extensions/showOpenFolderTree';
import { folderCUD } from './extensions/folderCUD';
import { populateArray } from './extensions/populateArray'; 

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let arrayPopulation = vscode.commands.registerCommand('tests.populateArray', async () => populateArray());

	let displaySelectedText = vscode.commands.registerCommand('tests.displaySelection', () => displayHighlightedText() );

	let showFileTree = vscode.commands.registerCommand('tests.showFileTree', ()=> showOpenFolderTree());

	let manageWorkspaceFolders = vscode.commands.registerCommand('tests.manageFolders', async ()=> folderCUD());
	
	context.subscriptions.push(
		arrayPopulation, 
		displaySelectedText,
		showFileTree, 
		manageWorkspaceFolders
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
