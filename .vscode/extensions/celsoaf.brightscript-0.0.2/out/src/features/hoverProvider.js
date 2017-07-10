'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const globals = require("../language/globals");
class BrightScriptHoverProvider {
    provideHover(document, position, token) {
        let enable = vscode_1.workspace.getConfiguration('brightscript').get('suggest.basic', true);
        if (!enable) {
            return null;
        }
        let wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return;
        }
        let name = document.getText(wordRange).toLowerCase();
        var entry = globals.globalFunctions[name] || globals.builtInFunctions[name] || globals.stringFunctions[name] || globals.mathFunctions[name] || globals.keywords[name];
        if (entry && entry.description) {
            let signature = name + (entry.signature || '');
            let contents = [entry.description, { language: 'brightscript', value: signature }];
            return new vscode_1.Hover(contents, wordRange);
        }
    }
}
exports.default = BrightScriptHoverProvider;
//# sourceMappingURL=hoverProvider.js.map