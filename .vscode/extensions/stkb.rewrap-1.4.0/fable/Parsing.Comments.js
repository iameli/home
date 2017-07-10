"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markerRegex = markerRegex;
exports.lineComment = lineComment;
exports.blockComment = blockComment;

var _RegExp = require("fable-core/umd/RegExp");

var _Parsing = require("./Parsing.Core");

var _Nonempty = require("./Nonempty");

var _Line = require("./Line");

var _Extensions = require("./Extensions");

var _String2 = require("fable-core/umd/String");

var _Block = require("./Block");

var _Util = require("fable-core/umd/Util");

var _Seq = require("fable-core/umd/Seq");

var _List = require("fable-core/umd/List");

function markerRegex(marker) {
  return (0, _RegExp.create)("^\\s*" + marker + "\\s*");
}

function lineComment(contentParser, marker, settings) {
  return (0, _Parsing.optionParser)((0, _Nonempty.span)(line => (0, _Line.startsWith)(marker, line)), lines => {
    const regex = markerRegex(marker);

    const prefix = (opt => _Extensions.Option.defaultValue(marker, opt))((line_1 => (0, _Line.tryMatch)(regex, line_1))(_Extensions.Option.defaultValue((0, _Nonempty.head)(lines), (0, _Nonempty.tryFind)(line_2 => (0, _Line.containsText)(line_2))(lines))));

    const prefixLength = (0, _Line.tabsToSpaces)(settings.tabWidth, prefix).length;

    const stripLine = $var78 => {
      return (tupledArg_2 => tupledArg_2[0] + tupledArg_2[1])(($var77 => (() => {
        const f_1 = str_1 => {
          return _Extensions.String.dropStart(prefixLength, str_1);
        };

        return tupledArg_1 => _Extensions.Tuple.mapFirst(f_1, tupledArg_1[0], tupledArg_1[1]);
      })()(($var76 => (() => {
        const f = p => {
          return (0, _String2.replicate)(p.length, " ");
        };

        return tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);
      })()(($var75 => (line_3 => (0, _Line.split)(regex, line_3))((str => (0, _Line.tabsToSpaces)(settings.tabWidth, str))($var75)))($var76)))($var77)))($var78));
    };

    const newPrefix = settings.reformat ? (0, _String2.trim)(prefix, "end") + " " : prefix;
    return ($var79 => (0, _Nonempty.singleton)((0, _Block.comment)(contentParser(settings), $var79)))((0, _Block.wrappable)((0, _Block.prefixes)(newPrefix, newPrefix), (arg10_ => (0, _Nonempty.map)(stripLine, arg10_))(lines)));
  });
}

function blockComment(contentParser, tailMarker, defaultTailMarker, startMarker, endMarker, settings) {
  const tailRegex = markerRegex(tailMarker);
  const startRegex = markerRegex(startMarker);

  const toComment = _arg1 => {
    const patternInput = (0, _Line.split)(startRegex, _arg1.Fields[0]);
    const newHeadPrefix = settings.reformat ? (0, _String2.trim)(patternInput[0], "end") + " " : patternInput[0];

    const originalTailPrefix = _Extensions.Option.defaultValue((0, _Line.leadingWhitespace)(_arg1.Fields[0]) + defaultTailMarker, (0, _Util.defaultArg)(_Extensions.Option.orElse((0, _Seq.tryHead)(_arg1.Fields[1]), (0, _Seq.tryFind)(line_1 => (0, _Line.containsText)(line_1), _arg1.Fields[1])), null, $var80 => (() => {
      const def = "";
      return opt => _Extensions.Option.defaultValue(def, opt);
    })()((line => (0, _Line.tryMatch)(tailRegex, line))($var80))));

    const prefixLength = (0, _Line.tabsToSpaces)(settings.tabWidth, originalTailPrefix).length;
    const newTailPrefix = settings.reformat ? (0, _Line.leadingWhitespace)(_arg1.Fields[0]) + defaultTailMarker : originalTailPrefix;

    const stripLine = line_2 => {
      const spacedLine = (0, _Line.tabsToSpaces)(settings.tabWidth, line_2);

      const linePrefixLength = ($var81 => (e2 => prefixLength < e2 ? prefixLength : e2)((str => str.length)($var81)))(($var82 => (() => {
        const def_1 = "";
        return opt_1 => _Extensions.Option.defaultValue(def_1, opt_1);
      })()((line_3 => (0, _Line.tryMatch)(tailRegex, line_3))($var82)))(spacedLine));

      return _Extensions.String.dropStart(linePrefixLength, spacedLine);
    };

    return ($var83 => (0, _Nonempty.singleton)((0, _Block.comment)(contentParser(settings), $var83)))((0, _Block.wrappable)((0, _Block.prefixes)(newHeadPrefix, newTailPrefix), new _Nonempty.Nonempty("Nonempty", [patternInput[1], (0, _List.map)(stripLine, _arg1.Fields[1])])));
  };

  return (0, _Parsing.optionParser)((() => {
    const tupledArg = [startRegex, (0, _RegExp.create)(endMarker)];
    return arg10_ => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg[0], tupledArg[1], arg10_);
  })(), toComment);
}