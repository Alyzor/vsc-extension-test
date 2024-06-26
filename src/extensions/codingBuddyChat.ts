import * as vscode from "vscode";
import * as gpt from "./llmConnection";

export class CodingBuddyViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "tests.buddyWebview";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = await this._getHtmlForWebview(webviewView.webview);
  
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'user-prompt':
          let response = await gpt.getLLMJson(data.value);
          if(response)
          {
            webviewView.webview.postMessage({type: 'response', value: response});
          }
          break;
        case 'requesting-history':
          let history = await gpt.getMessageHistory();
          webviewView.webview.postMessage({type: 'history', value: history});
          break;
      }
    });

  }

  


  async _getHtmlForWebview(webview: vscode.Webview) {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'webview-assets/sidebar-webview', 'sidebar-chat.css'));
    const htmlUri = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(this._extensionUri, 'webview-assets/sidebar-webview', 'chat.html'));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'webview-assets/sidebar-webview', 'main.js'));
		const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));

    const nonce = getNonce();

    const header = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';style-src ${webview.cspSource}">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${codiconsUri}" rel="stylesheet">
      <link href="${styleUri}" rel="stylesheet">

      <title>Coding Buddy Chat</title>
    </head>`;

    const scriptLoad = `<script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
    return header + htmlUri.toString() + scriptLoad;
}
}
function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}