'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const hoverProvider_1 = require("./features/hoverProvider");
const completionItemProvider_1 = require("./features/completionItemProvider");
const signatureHelpProvider_1 = require("./features/signatureHelpProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('brightscript', new hoverProvider_1.default()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('brightscript', new completionItemProvider_1.default()));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('brightscript', new signatureHelpProvider_1.default(), '(', ','));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map