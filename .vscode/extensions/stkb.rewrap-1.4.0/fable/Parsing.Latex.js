"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inlineCommands = exports.emptyCommands = exports.newlineRegex = exports.commandRegex = undefined;
exports.latex = latex;

var _RegExp = require("fable-core/umd/RegExp");

var _Parsing = require("./Parsing.Core");

var _Nonempty = require("./Nonempty");

var _Util = require("fable-core/umd/Util");

var _Seq = require("fable-core/umd/Seq");

var _List = require("fable-core/umd/List");

var _Parsing2 = require("./Parsing.Comments");

var _Parsing3 = require("./Parsing.Markdown");

const commandRegex = exports.commandRegex = (0, _RegExp.create)("^\\s*\\\\([a-z]+|\\S)");
const newlineRegex = exports.newlineRegex = (0, _RegExp.create)("\\\\(\\\\\\*?|hline|newline|break|linebreak)(\\[.*?\\])?(\\{.*?\\})?\\s*$");
const emptyCommands = exports.emptyCommands = ["begin", "documentclass", "section", "subsection", "end"];
const inlineCommands = exports.inlineCommands = ["cite", "dots", "emph", "href", "latex", "latexe", "ref", "verb"];

function latex(settings) {
  const startsWithCommand = line => {
    const m = (0, _RegExp.match)(commandRegex, line);

    if (m != null) {
      return m[1];
    } else {
      return null;
    }
  };

  const paragraphBlocks = $var105 => {
    return (() => {
      const fn = arg10_ => {
        return (0, _Parsing.firstLineIndentParagraphBlock)(settings.reformat, arg10_);
      };

      return arg10__1 => (0, _Nonempty.map)(fn, arg10__1);
    })()((0, _Parsing.splitIntoChunks)((0, _Parsing.afterRegex)(newlineRegex))($var105));
  };

  const emptyCommand = _arg1 => {
    return (0, _Util.defaultArg)((0, _Util.defaultArg)(startsWithCommand(_arg1.Fields[0]), null, x => (c => (0, _Seq.exists)(x => (0, _Util.equals)(c, x), emptyCommands))(x) ? x : null), null, _arg1_1 => [paragraphBlocks((0, _Nonempty.singleton)(_arg1.Fields[0])), (0, _Nonempty.fromList)(_arg1.Fields[1])]);
  };

  const blockCommand = lines => {
    return (0, _Util.defaultArg)((0, _Util.defaultArg)(startsWithCommand((0, _Nonempty.head)(lines)), null, x => (c_1 => !(0, _Seq.exists)(x => (0, _Util.equals)(c_1, x), inlineCommands))(x) ? x : null), null, _arg2 => paragraphs(lines));
  };

  let otherParsers;
  const parsers = (0, _List.ofArray)([_Parsing.blankLines, (0, _Parsing2.lineComment)(settings_1 => (0, _Parsing3.markdown)(settings_1), "%", settings), emptyCommand, blockCommand]);

  otherParsers = lines_1 => (0, _Parsing.tryMany)(parsers, lines_1);

  const paragraphs = arg20_ => {
    return (0, _Parsing.takeLinesUntil)(otherParsers, paragraphBlocks, arg20_);
  };

  return lines_2 => (0, _Parsing.repeatUntilEnd)(otherParsers, paragraphs, lines_2);
}