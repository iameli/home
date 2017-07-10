"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssMarkers = exports.scriptMarkers = undefined;
exports.regex = regex;
exports.html = html;

var _RegExp = require("fable-core/umd/RegExp");

var _Parsing = require("./Parsing.Core");

var _Extensions = require("./Extensions");

var _Nonempty = require("./Nonempty");

var _Block = require("./Block");

var _Util = require("fable-core/umd/Util");

var _List = require("fable-core/umd/List");

var _Parsing2 = require("./Parsing.Comments");

var _Parsing3 = require("./Parsing.Markdown");

function regex(str) {
  return (0, _RegExp.create)(str, 1);
}

const scriptMarkers = exports.scriptMarkers = [regex("<script"), regex("</script>")];
const cssMarkers = exports.cssMarkers = [regex("<style"), regex("</style>")];

function html(scriptParser, cssParser, settings) {
  const embeddedScript = markers => contentParser => {
    return (0, _Parsing.optionParser)(arg10_ => (0, _Parsing.takeLinesBetweenMarkers)(markers[0], markers[1], arg10_), lines => _Extensions.Option.defaultValue((0, _Nonempty.singleton)((0, _Block.ignore)(lines)), (0, _Util.defaultArg)((0, _Util.defaultArg)(_Extensions.List.tryInit((0, _Nonempty.tail)(lines)), null, list => (0, _Nonempty.fromList)(list)), null, $var96 => (() => {
      const head = new _Block.Block("Ignore", [1]);
      return neList => (0, _Nonempty.cons)(head, neList);
    })()(($var95 => (() => {
      const last = new _Block.Block("Ignore", [1]);
      return arg10__1 => (0, _Nonempty.snoc)(last, arg10__1);
    })()(contentParser(settings)($var95)))($var96)))));
  };

  let otherParsers;
  const parsers = (0, _List.ofArray)([_Parsing.blankLines, (0, _Parsing2.blockComment)(settings_1 => (0, _Parsing3.markdown)(settings_1), "", "", "<!--", "-->", settings), embeddedScript(scriptMarkers)(scriptParser), embeddedScript(cssMarkers)(cssParser)]);

  otherParsers = lines_1 => (0, _Parsing.tryMany)(parsers, lines_1);

  const paragraphBlocks = $var98 => {
    return (() => {
      const fn_1 = lines_2 => {
        return (0, _Parsing.indentSeparatedParagraphBlock)(wrappable => (0, _Block.text)(wrappable), lines_2);
      };

      return arg10__3 => (0, _Nonempty.map)(fn_1, arg10__3);
    })()(($var97 => (() => {
      const fn = (0, _Parsing.splitIntoChunks)((0, _Parsing.afterRegex)(regex("\\>\\s*$")));
      return neList_1 => (0, _Nonempty.collect)(fn, neList_1);
    })()((0, _Parsing.splitIntoChunks)((() => {
      const regex_1 = regex("^\\s*<");
      return arg10__2 => (0, _Parsing.beforeRegex)(regex_1, arg10__2);
    })())($var97)))($var98));
  };

  const paragraphs = arg20_ => {
    return (0, _Parsing.takeLinesUntil)(otherParsers, paragraphBlocks, arg20_);
  };

  return lines_3 => (0, _Parsing.repeatUntilEnd)(otherParsers, paragraphs, lines_3);
}