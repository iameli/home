'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const globals = require("../language/globals");
var _NL = '\n'.charCodeAt(0);
var _TAB = '\t'.charCodeAt(0);
var _WSB = ' '.charCodeAt(0);
var _LBracket = '['.charCodeAt(0);
var _RBracket = ']'.charCodeAt(0);
var _LCurly = '{'.charCodeAt(0);
var _RCurly = '}'.charCodeAt(0);
var _LParent = '('.charCodeAt(0);
var _RParent = ')'.charCodeAt(0);
var _Comma = ','.charCodeAt(0);
var _Quote = '\''.charCodeAt(0);
var _DQuote = '"'.charCodeAt(0);
var _USC = '_'.charCodeAt(0);
var _a = 'a'.charCodeAt(0);
var _z = 'z'.charCodeAt(0);
var _A = 'A'.charCodeAt(0);
var _Z = 'Z'.charCodeAt(0);
var _0 = '0'.charCodeAt(0);
var _9 = '9'.charCodeAt(0);
var BOF = 0;
class BackwardIterator {
    constructor(model, offset, lineNumber) {
        this.lineNumber = lineNumber;
        this.offset = offset;
        this.line = model.lineAt(this.lineNumber).text;
        this.model = model;
    }
    hasNext() {
        return this.lineNumber >= 0;
    }
    next() {
        if (this.offset < 0) {
            if (this.lineNumber > 0) {
                this.lineNumber--;
                this.line = this.model.lineAt(this.lineNumber).text;
                this.offset = this.line.length - 1;
                return _NL;
            }
            this.lineNumber = -1;
            return BOF;
        }
        var ch = this.line.charCodeAt(this.offset);
        this.offset--;
        return ch;
    }
}
class BrightScriptSignatureHelpProvider {
    provideSignatureHelp(document, position, token) {
        let enable = vscode_1.workspace.getConfiguration('brightscript').get('suggest.basic', true);
        if (!enable) {
            return null;
        }
        var iterator = new BackwardIterator(document, position.character - 1, position.line);
        var paramCount = this.readArguments(iterator);
        if (paramCount < 0) {
            return null;
        }
        var ident = this.readIdent(iterator);
        if (!ident) {
            return null;
        }
        var entry = globals.globalFunctions[ident] || globals.keywords[ident];
        if (!entry || !entry.signature) {
            return null;
        }
        var paramsString = entry.signature.substring(0, entry.signature.lastIndexOf(')') + 1);
        let signatureInfo = new vscode_1.SignatureInformation(ident + paramsString, entry.description);
        var re = /\w*\s+\&?\$[\w_\.]+|void/g;
        var match = null;
        while ((match = re.exec(paramsString)) !== null) {
            signatureInfo.parameters.push({ label: match[0], documentation: '' });
        }
        let ret = new vscode_1.SignatureHelp();
        ret.signatures.push(signatureInfo);
        ret.activeSignature = 0;
        ret.activeParameter = Math.min(paramCount, signatureInfo.parameters.length - 1);
        return Promise.resolve(ret);
    }
    readArguments(iterator) {
        var parentNesting = 0;
        var bracketNesting = 0;
        var curlyNesting = 0;
        var paramCount = 0;
        while (iterator.hasNext()) {
            var ch = iterator.next();
            switch (ch) {
                case _LParent:
                    parentNesting--;
                    if (parentNesting < 0) {
                        return paramCount;
                    }
                    break;
                case _RParent:
                    parentNesting++;
                    break;
                case _LCurly:
                    curlyNesting--;
                    break;
                case _RCurly:
                    curlyNesting++;
                    break;
                case _LBracket:
                    bracketNesting--;
                    break;
                case _RBracket:
                    bracketNesting++;
                    break;
                case _DQuote:
                case _Quote:
                    while (iterator.hasNext() && ch !== iterator.next()) {
                        // find the closing quote or double quote
                    }
                    break;
                case _Comma:
                    if (!parentNesting && !bracketNesting && !curlyNesting) {
                        paramCount++;
                    }
                    break;
            }
        }
        return -1;
    }
    isIdentPart(ch) {
        if (ch === _USC ||
            ch >= _a && ch <= _z ||
            ch >= _A && ch <= _Z ||
            ch >= _0 && ch <= _9 ||
            ch >= 0x80 && ch <= 0xFFFF) {
            return true;
        }
        return false;
    }
    readIdent(iterator) {
        var identStarted = false;
        var ident = '';
        while (iterator.hasNext()) {
            var ch = iterator.next();
            if (!identStarted && (ch === _WSB || ch === _TAB || ch === _NL)) {
                continue;
            }
            if (this.isIdentPart(ch)) {
                identStarted = true;
                ident = String.fromCharCode(ch) + ident;
            }
            else if (identStarted) {
                return ident;
            }
        }
        return ident;
    }
}
exports.default = BrightScriptSignatureHelpProvider;
//# sourceMappingURL=signatureHelpProvider.js.map