import * as vscode from 'vscode';
import * as generalUtils from '../utils/general';
import * as fileUtils from '../utils/fileManagement';

export function displayHighlightedText()
{
    var editor = vscode.window.activeTextEditor;
    if(editor){
        if(editor.selection){
            generalUtils.showMessage("Selected Text: " + fileUtils.readOpenedFile(editor, editor.selection), false);
        }else{
            generalUtils.showMessage("No text has been selected!", true);
        }
    }else{
        generalUtils.showMessage("Please open a file!", true);
    }
}