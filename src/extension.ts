// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { interfaces } from 'mocha';
import * as vscode from 'vscode';

import { LoremIpsum, loremIpsum } from 'lorem-ipsum';
import { prependListener } from 'process';
import { randomInt } from 'crypto';


interface IProperty{
	name:string,
	type:string
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	function getDocumentInterfaceListName(documentText:string):vscode.QuickPickItem[]{

		var interfaceSplit = documentText.split('interface ');

		var interfaceNameList:vscode.QuickPickItem[] = new Array;

		interfaceSplit.forEach(element => {
			var elementName = element.split('{');
			if(elementName.length === 2){

				var elementDetail = elementName[1].split(',');

				var detailList:string = "";

				elementDetail.forEach(element => {
					if(element === elementDetail[elementDetail.length-1]){
						element = element.replace('}', "");
						detailList = detailList + '$(symbol-key)' + element.trim();
					}else{
						detailList = detailList + '$(symbol-key)' + element.trim() + ' / ';
					}
				});

				interfaceNameList.push(
					{
						label: '$(symbol-interface)' + elementName[0],
						detail: detailList
					}
				);
			}
		});

		return interfaceNameList;
	}

	function showMessage(message:string, isError:boolean){
		if(isError){
			vscode.window.showErrorMessage(message);
		}else{
			vscode.window.showInformationMessage(message);
		}

	}

	let disposable = vscode.commands.registerCommand('tests.populateArray', async () => {

		var openedFile = vscode.window.activeTextEditor?.document;

		if (!openedFile) { showMessage("Please open a file!", true); }

		//Checking language
		if(openedFile?.languageId !== "typescript"){
			showMessage("Please run the extension on a .ts file!", true);
			return;
		}

		var interfaceList = getDocumentInterfaceListName(openedFile.getText());

		var selectInterface = await vscode.window.showQuickPick(
			interfaceList
			, 
			{
				title:"Select an Interface", 
				canPickMany:false,

			});
		
		if(!selectInterface){
			return;
		}

		var selectQuantity:string | undefined = "";

		while(selectQuantity === "" ){
			selectQuantity = await vscode.window.showInputBox({
				title:"Amount of fields to populate... (1...25)",
				placeHolder:"1..2..25",
				value: "1",
				validateInput: text=>{
					if (/^[0-9]*$/.test(text)){
						if(parseInt(text)>25 || parseInt(text)<1){
							return "Please choose a number between 1 and 25!";
						}else{
							return "";
						}
					}else{
						return "Please only use numbers";
					}
				}
			});
		}
		if(!selectQuantity){
			return;
		}

		if(selectInterface.detail?.match("boolean")){
			var selectBoolValue = await vscode.window.showQuickPick([
				{
					label:"$(check) True",
				},
				{
					label:"$(close) False"
				},
				{
					label:"$(ellipsis) Random"
				}
			],{
				title:"Boolean found! Do you wish to set all values to true, false or randomly assign a value?"
			});
		}

		selectInterface.label = selectInterface.label.replace("$(symbol-interface)","");
		selectInterface.detail = selectInterface.detail!.replaceAll("$(symbol-key)","");

		if(selectBoolValue){
			switch(selectBoolValue.label){
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



		var propertyList: IProperty[] = [];

		tempProperties.forEach(e=>{
			var tempProperty = e.split(":");

			propertyList.push({name:tempProperty[0].trim(), type:tempProperty[1].trim()});
		});

		if(!selectBoolValue || selectBoolValue!.label === "random"){
			generateDummyText(selectInterface.label, parseInt(selectQuantity), propertyList);
		}else{
			generateDummyText(selectInterface.label, parseInt(selectQuantity), propertyList, Boolean(JSON.parse(selectBoolValue!.label)));
		}
	});

	context.subscriptions.push(disposable);

	function generateDummyText(interfaceName:string, repeat:number, properties:IProperty[], predefinedBool?:boolean){
		var finalText:string = "var dummy"+ interfaceName + " = [ \r\n";

		for(var i= 0; i < repeat;i++){
			finalText += "	{ \r\n";

			properties.forEach(prop =>{

				finalText += "		" + prop.name + " = ";
				
				switch(prop.type){
					case "string":
						finalText += '"' + loremIpsum() + '"';
					break;
					case "number":
						finalText += Math.floor(Math.random()* 200);
					break;
					case "boolean":
						if(predefinedBool){
							finalText += predefinedBool.toString();
						}else{
							const randBool = Math.random() < 0.5;
							finalText += randBool;
						}
					break;

					default:
						finalText += "new " + prop.type;
					break;
				}
				if(prop === properties[properties.length-1]){
					finalText += "\r\n";
				}else{
					finalText += ",\r\n";
				}
			});

			if(i === repeat-1){
				finalText += "}";
			}else{
				finalText += "}, \r\n";
			}
		}

		finalText += "];";

		console.log(finalText);

		//return finalText to IDE under user's current line (newLine first, then declaration)
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
