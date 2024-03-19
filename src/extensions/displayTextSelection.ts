import * as vscode from 'vscode';
import { generalUtils } from '../utils/general';
import { fileUtils } from '../utils/fileManagement';

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