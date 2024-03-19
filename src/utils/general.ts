import * as vscode from 'vscode';

export class generalUtils{
    /**
     * Displays vscode's native message "pop-up".
     * 
     * @param {string} message Message to specify on pop-up.
     * @param {boolean} isError true -> Show error message / false -> show information message.
     */
    static showMessage(message:string, isError:boolean){
		if(isError){
			vscode.window.showErrorMessage(message);
		}else{
			vscode.window.showInformationMessage(message);
		}

	}
}