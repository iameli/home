"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = exports.css = exports.java = exports.javadocMarkers = exports.cBlockMarkers = exports.stdBlockComment = exports.stdLineComment = undefined;
exports.customSourceCode = customSourceCode;
exports.sourceCode = sourceCode;

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _Parsing = require("./Parsing.Core");

var _Block = require("./Block");

var _Nonempty = require("./Nonempty");

var _Parsing2 = require("./Parsing.Comments");

var _Parsing3 = require("./Parsing.Markdown");

var _Util = require("fable-core/umd/Util");

var _Parsing4 = require("./Parsing.DocComments");

var _Parsing5 = require("./Parsing.Html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customSourceCode(commentParsers, settings) {
  let otherParsers;
  const parsers = new _List2.default(_Parsing.blankLines, (0, _List.map)(cp => cp(settings), commentParsers));

  otherParsers = lines => (0, _Parsing.tryMany)(parsers, lines);

  let codeParser;

  const parser = $var104 => {
    return (() => {
      const fn = lines_1 => {
        return (0, _Parsing.indentSeparatedParagraphBlock)(wrappable => (0, _Block.code)(wrappable), lines_1);
      };

      return arg10__1 => (0, _Nonempty.map)(fn, arg10__1);
    })()((0, _Parsing.splitIntoChunks)(arg10_ => (0, _Parsing.onIndent)(settings.tabWidth, arg10_))($var104));
  };

  codeParser = arg20_ => (0, _Parsing.takeLinesUntil)(otherParsers, parser, arg20_);

  return lines_2 => (0, _Parsing.repeatUntilEnd)(otherParsers, codeParser, lines_2);
}

const stdLineComment = exports.stdLineComment = marker => settings => (0, _Parsing2.lineComment)(settings_1 => (0, _Parsing3.markdown)(settings_1), marker, settings);

const stdBlockComment = exports.stdBlockComment = (() => {
  const tupledArg = ["", ""];
  return tupledArg_1 => settings => (0, _Parsing2.blockComment)(settings_1 => (0, _Parsing3.markdown)(settings_1), tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1], settings);
})();

function sourceCode(maybeSingleMarker, maybeBlockMarkers) {
  const commentParsers = (0, _List.choose)(x => x, (0, _List.ofArray)([(option => (0, _Util.defaultArg)(option, null, stdLineComment))(maybeSingleMarker), (option_1 => (0, _Util.defaultArg)(option_1, null, stdBlockComment))(maybeBlockMarkers)]));
  return settings => customSourceCode(commentParsers, settings);
}

const cBlockMarkers = exports.cBlockMarkers = ["/\\*", "\\*/"];
const javadocMarkers = exports.javadocMarkers = ["/\\*\\*", "\\*/"];

const java = exports.java = (() => {
  const commentParsers = (0, _List.ofArray)([(() => {
    const tupledArg = ["\\*", " * "];
    const startMarker = javadocMarkers[0];
    const endMarker = javadocMarkers[1];
    return settings => (0, _Parsing2.blockComment)(settings_1 => (0, _Parsing4.javadoc)(settings_1), tupledArg[0], tupledArg[1], startMarker, endMarker, settings);
  })(), stdBlockComment(cBlockMarkers), stdLineComment("//")]);
  return settings_2 => customSourceCode(commentParsers, settings_2);
})();

const css = exports.css = sourceCode(null, cBlockMarkers);

const html = exports.html = settings => (0, _Parsing5.html)(java, css, settings);