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
const vscode = __importStar(__webpack_require__(1));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
    function showMessage(message, isError) {
        if (isError) {
            vscode.window.showErrorMessage(message);
        }
        else {
            vscode.window.showInformationMessage(message);
        }
    }
    let disposable = vscode.commands.registerCommand('tests.populateArray', async () => {
        var openedFile = vscode.window.activeTextEditor?.document;
        if (!openedFile) {
            showMessage("Please open a file!", true);
        }
        //Checking language
        if (openedFile?.languageId !== "typescript") {
            showMessage("Please run the extension on a .ts file!", true);
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
    });
    context.subscriptions.push(disposable);
    function generateDummyText(interfaceName, repeat, properties, predefinedBool) {
        var finalText = "	var dummy" + interfaceName + " = [ \r\n";
        for (var i = 0; i < repeat; i++) {
            finalText += "{ \r\n";
            //TODO: Dummy text wil be assigned to each property HERE!!!
            if (i === repeat - 1) {
                finalText += "} \r\n";
            }
            else {
                finalText += "}, \r\n";
            }
        }
        finalText += "];";
        //return finalText to IDE under user's current line (newLine first, then declaration)
    }
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

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