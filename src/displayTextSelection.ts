import * as vscode from 'vscode';


export function displayHighlightedText()
{
    var editor = vscode.window.activeTextEditor;
    if(editor){
        if(editor.selection){
            vscode.window.showInformationMessage("Selected Text: " + editor.document.getText(editor.selection));
        }else{
            vscode.window.showInformationMessage("No text has been selected!");
        }
    }else{
        vscode.window.showInformationMessage("Please open a file!");
    }
}