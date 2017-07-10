"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const globals = require("../language/globals");
class BrightScriptCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        let result = [];
        let shouldProvideCompletionItems = vscode_1.workspace.getConfiguration('brightscript').get('suggest.basic', true);
        if (!shouldProvideCompletionItems) {
            return Promise.resolve(result);
        }
        var range = document.getWordRangeAtPosition(position);
        var prefix = range ? document.getText(range) : '';
        if (!range) {
            range = new vscode_1.Range(position, position);
        }
        if (this.previuosCharacter(document, range.start) === '.') {
            return Promise.resolve(result);
        }
        var added = {};
        var createNewProposal = function (kind, name, entry) {
            var proposal = new vscode_1.CompletionItem(name);
            proposal.kind = kind;
            if (entry) {
                if (entry.description) {
                    proposal.documentation = entry.description;
                }
                if (entry.signature) {
                    proposal.detail = entry.signature;
                }
            }
            return proposal;
        };
        var matches = (name) => {
            return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
        };
        for (var name in globals.globalFunctions) {
            if (globals.globalFunctions.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Variable, name, globals.globalFunctions[name]));
            }
        }
        for (var name in globals.builtInFunctions) {
            if (globals.builtInFunctions.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Variable, name, globals.builtInFunctions[name]));
            }
        }
        for (var name in globals.stringFunctions) {
            if (globals.stringFunctions.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Variable, name, globals.stringFunctions[name]));
            }
        }
        for (var name in globals.mathFunctions) {
            if (globals.mathFunctions.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Variable, name, globals.mathFunctions[name]));
            }
        }
        for (var name in globals.keywords) {
            if (globals.keywords.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Variable, name, globals.keywords[name]));
            }
        }
        return Promise.resolve(result);
    }
    previuosCharacter(document, pos) {
        if (pos.character > 0) {
            let start = new vscode_1.Position(pos.line, pos.character - 1);
            let end = new vscode_1.Position(pos.line, pos.character - 0);
            let range = new vscode_1.Range(start, end);
            let char = document.getText(range);
            return char;
        }
        return '';
    }
}
exports.default = BrightScriptCompletionItemProvider;
//# sourceMappingURL=completionItemProvider.js.map