"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blankLines = undefined;
exports.optionParser = optionParser;
exports.ignoreParser = ignoreParser;
exports.tryMany = tryMany;
exports.repeatUntilEnd = repeatUntilEnd;
exports.takeLinesUntil = takeLinesUntil;
exports.splitIntoChunks = splitIntoChunks;
exports.beforeRegex = beforeRegex;
exports.afterRegex = afterRegex;
exports.onIndent = onIndent;
exports.firstLineIndentParagraphBlock = firstLineIndentParagraphBlock;
exports.indentSeparatedParagraphBlock = indentSeparatedParagraphBlock;
exports.takeLinesBetweenMarkers = takeLinesBetweenMarkers;

var _Extensions = require("./Extensions");

var _Util = require("fable-core/umd/Util");

var _Nonempty = require("./Nonempty");

var _Block = require("./Block");

var _Line = require("./Line");

var _Seq = require("fable-core/umd/Seq");

var _String2 = require("fable-core/umd/String");

function optionParser(splitter, parser) {
  return $var46 => (() => {
    const mapping = tupledArg => {
      return _Extensions.Tuple.mapFirst(parser, tupledArg[0], tupledArg[1]);
    };

    return option => (0, _Util.defaultArg)(option, null, mapping);
  })()(splitter($var46));
}

function ignoreParser(splitter) {
  return $var48 => (() => {
    let mapping;

    const f = $var47 => {
      return (0, _Nonempty.singleton)((0, _Block.ignore)($var47));
    };

    mapping = tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);

    return option => (0, _Util.defaultArg)(option, null, mapping);
  })()(splitter($var48));
}

function tryMany(parsers, lines) {
  tryMany: while (true) {
    if (parsers.tail != null) {
      const matchValue = parsers.head(lines);

      if (matchValue == null) {
        parsers = parsers.tail;
        lines = lines;
        continue tryMany;
      } else {
        return matchValue;
      }
    } else {
      return null;
    }
  }
}

function repeatUntilEnd(optionParser_1, partialParser, lines) {
  const patternInput = _Extensions.Option.defaultWith(() => partialParser(lines), optionParser_1(lines));

  if (patternInput[1] != null) {
    return _Nonempty.Nonempty.op_Addition(patternInput[0], repeatUntilEnd(optionParser_1, partialParser, patternInput[1]));
  } else {
    return patternInput[0];
  }
}

function takeLinesUntil(otherParser, parser, _arg1) {
  const bufferToBlocks = $var49 => {
    return parser((0, _Nonempty.rev)()($var49));
  };

  const loopFrom2ndLine = buffer => lines => {
    loopFrom2ndLine: while (true) {
      const matchValue = (0, _Nonempty.fromList)(lines);

      if (matchValue != null) {
        const tail = matchValue.Fields[1];
        const head = matchValue.Fields[0];
        const matchValue_1 = otherParser(matchValue);

        if (matchValue_1 != null) {
          return (() => {
            let f;
            const arg00_ = bufferToBlocks(buffer);

            f = b => (0, _Nonempty.append)(arg00_, b);

            return tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);
          })()(matchValue_1);
        } else {
          buffer = (0, _Nonempty.cons)(head, buffer);
          lines = tail;
          continue loopFrom2ndLine;
        }
      } else {
        return [bufferToBlocks(buffer), null];
      }
    }
  };

  return loopFrom2ndLine((0, _Nonempty.singleton)(_arg1.Fields[0]))(_arg1.Fields[1]);
}

function splitIntoChunks(splitFn) {
  return (0, _Nonempty.unfold)(splitFn);
}

function beforeRegex(regex, _arg1) {
  const matchValue = (0, _Nonempty.span)($var50 => (value => !value)((line => (0, _Line.contains)(regex, line))($var50)))(_arg1);

  if (matchValue == null) {
    return (() => {
      const f = list => {
        return (0, _Nonempty.fromList)(list);
      };

      return tupledArg => _Extensions.Tuple.mapSecond(f, tupledArg[0], tupledArg[1]);
    })()((() => {
      const f_1 = t => {
        return new _Nonempty.Nonempty("Nonempty", [_arg1.Fields[0], t]);
      };

      return tupledArg_1 => _Extensions.Tuple.mapFirst(f_1, tupledArg_1[0], tupledArg_1[1]);
    })()(_Extensions.List.span($var51 => (value_1 => !value_1)((line_1 => (0, _Line.contains)(regex, line_1))($var51)))(_arg1.Fields[1])));
  } else {
    return matchValue;
  }
}

function afterRegex(regex) {
  return (0, _Nonempty.splitAfter)(line => (0, _Line.contains)(regex, line));
}

function onIndent(tabWidth, _arg1) {
  const indentSize = $var53 => {
    return (str_1 => str_1.length)(($var52 => (str => (0, _Line.tabsToSpaces)(tabWidth, str))((line => (0, _Line.leadingWhitespace)(line))($var52)))($var53));
  };

  const firstLineIndentSize = indentSize(_arg1.Fields[0]);
  return (() => {
    const f = list => {
      return (0, _Nonempty.fromList)(list);
    };

    return tupledArg => _Extensions.Tuple.mapSecond(f, tupledArg[0], tupledArg[1]);
  })()((() => {
    const f_1 = tail => {
      return new _Nonempty.Nonempty("Nonempty", [_arg1.Fields[0], tail]);
    };

    return tupledArg_1 => _Extensions.Tuple.mapFirst(f_1, tupledArg_1[0], tupledArg_1[1]);
  })()(_Extensions.List.span(line_1 => Math.abs(indentSize(line_1) - firstLineIndentSize) < 2)(_arg1.Fields[1])));
}

function firstLineIndentParagraphBlock(reformat, _arg1) {
  const prefixes = reformat ? (0, _Block.prefixes)("", "") : (0, _Block.prefixes)((0, _Line.leadingWhitespace)(_arg1.Fields[0]), (0, _Line.leadingWhitespace)((opt => _Extensions.Option.defaultValue(_arg1.Fields[0], opt))((0, _Seq.tryHead)(_arg1.Fields[1]))));
  const trimmedLines = (0, _Nonempty.map)(l => (0, _String2.trim)(l, "start"), _arg1);
  return (0, _Block.text)((0, _Block.wrappable)(prefixes, trimmedLines));
}

function indentSeparatedParagraphBlock(textType, lines) {
  const prefix = (0, _Line.leadingWhitespace)((0, _Nonempty.head)(lines));
  const trimmedLines = (0, _Nonempty.map)(str => _Extensions.String.trimStart(str), lines);
  return textType((0, _Block.wrappable)((0, _Block.prefixes)(prefix, prefix), trimmedLines));
}

function takeLinesBetweenMarkers(startRegex, endRegex, _arg1) {
  const takeUntilEndMarker = prefix => {
    return (() => {
      const f = (0, _Nonempty.replaceHead)(_arg1.Fields[0]);
      return tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);
    })()(afterRegex(endRegex)((0, _Nonempty.mapHead)((() => {
      const n = prefix.length;
      return str => _Extensions.String.dropStart(n, str);
    })(), _arg1)));
  };

  return (option => (0, _Util.defaultArg)(option, null, takeUntilEndMarker))((line => (0, _Line.tryMatch)(startRegex, line))(_arg1.Fields[0]));
}

const blankLines = exports.blankLines = ignoreParser((0, _Nonempty.span)(l => (0, _Line.isBlank)(l)));