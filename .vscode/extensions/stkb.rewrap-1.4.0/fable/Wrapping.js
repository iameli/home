"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapBlocks = wrapBlocks;

var _RegExp = require("fable-core/umd/RegExp");

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _Nonempty = require("./Nonempty");

var _String2 = require("fable-core/umd/String");

var _Line = require("./Line");

var _Extensions = require("./Extensions");

var _Seq = require("fable-core/umd/Seq");

var _Block = require("./Block");

var _Rewrap = require("./Rewrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inlineTagRegex = (0, _RegExp.create)("{@[a-z]+.*?[^\\\\]}", 1);

function wrapBlocks(settings, originalLines, blocks) {
  const wrapString = width => str => {
    const loop = output => line => words => {
      loop: while (true) {
        if (words.tail != null) {
          if (line === "") {
            output = output;
            line = words.head;
            words = words.tail;
            continue loop;
          } else if (line.length + 1 + words.head.length > width) {
            output = new _List2.default(line, output);
            line = words.head;
            words = words.tail;
            continue loop;
          } else {
            output = output;
            line = line + " " + words.head;
            words = words.tail;
            continue loop;
          }
        } else {
          return new _Nonempty.Nonempty("Nonempty", [line, output]);
        }
      }
    };

    return (0, _Nonempty.rev)()((0, _Nonempty.mapTail)(s => (0, _String2.trim)(s, "end"), loop(new _List2.default())("")((0, _List.ofArray)((0, _String2.split)(str, " ")))));
  };

  const wrapWrappable = w => {
    const spacedHeadPrefix = (0, _Line.tabsToSpaces)(settings.tabWidth, w.prefixes.head);
    const tailPrefixLength = (0, _Line.tabsToSpaces)(settings.tabWidth, w.prefixes.tail).length;
    const headPrefixIndent = spacedHeadPrefix.length - tailPrefixLength;
    const wrapWidth = settings.column - tailPrefixLength;

    const freezeInlineTags = str_1 => {
      return (0, _RegExp.replace)(inlineTagRegex, str_1, m => (0, _String2.replace)(m[0], " ", "\\0"));
    };

    const unfreezeInlineTags = str_2 => {
      return (0, _String2.replace)(str_2, "\\0", " ");
    };

    const concatenatedText = freezeInlineTags(($var107 => (0, _String2.join)(" ", (0, _Nonempty.toList)($var107)))((0, _Nonempty.mapInit)(s_1 => {
      const t = (0, _String2.trim)(s_1, "end");

      if (settings.doubleSentenceSpacing ? [".", "?", "!"].some(c => (0, _String2.endsWith)(t, c)) : false) {
        return t + " ";
      } else {
        return t;
      }
    })(w.lines)));

    if (headPrefixIndent > 0) {
      return (0, _Nonempty.mapTail)((() => {
        const x = w.prefixes.tail;
        return y => x + y;
      })(), (0, _Nonempty.mapHead)($var108 => (() => {
        const x_1 = w.prefixes.head;
        return y_1 => x_1 + y_1;
      })()((str_3 => _Extensions.String.dropStart(headPrefixIndent, str_3))($var108)), (arg10_ => (0, _Nonempty.map)(unfreezeInlineTags, arg10_))(wrapString(wrapWidth)((0, _String2.replicate)(headPrefixIndent, "+") + concatenatedText))));
    } else if (headPrefixIndent < 0) {
      return (0, _Nonempty.mapTail)((() => {
        const x_2 = w.prefixes.tail;
        return y_2 => x_2 + y_2;
      })(), (0, _Nonempty.mapHead)($var109 => w.prefixes.head + (_Extensions.String.takeStart(-headPrefixIndent, concatenatedText) + $var109), (arg10__1 => (0, _Nonempty.map)(unfreezeInlineTags, arg10__1))(wrapString(wrapWidth)(_Extensions.String.dropStart(-headPrefixIndent, concatenatedText)))));
    } else {
      return (0, _Nonempty.mapTail)((() => {
        const x_3 = w.prefixes.tail;
        return y_3 => x_3 + y_3;
      })(), (0, _Nonempty.mapHead)((() => {
        const x_4 = w.prefixes.head;
        return y_4 => x_4 + y_4;
      })(), (arg10__2 => (0, _Nonempty.map)(unfreezeInlineTags, arg10__2))(wrapString(wrapWidth)(concatenatedText))));
    }
  };

  const startLine = (list => (0, _Seq.sumBy)(block => (0, _Block.length)(block), list))((0, _Seq.toList)((0, _Seq.takeWhile)(block_1 => (0, _Block.isIgnore)(block_1), (0, _Nonempty.toList)(blocks))));

  const blocksToWrap = ($var111 => (list_3 => (0, _List.reverse)(list_3))(($var110 => (list_2 => (0, _Seq.toList)((0, _Seq.skipWhile)(block_2 => (0, _Block.isIgnore)(block_2), list_2)))((list_1 => (0, _List.reverse)(list_1))($var110)))($var111)))((0, _Seq.toList)((0, _Seq.skipWhile)(block_3 => (0, _Block.isIgnore)(block_3), (0, _Nonempty.toList)(blocks))));

  const endLine = startLine + (0, _Seq.sumBy)(block_4 => (0, _Block.length)(block_4), blocksToWrap) - 1;

  const loop_1 = outputLines => remainingOriginalLines => remainingBlocks => {
    loop_1: while (true) {
      if (remainingBlocks.tail != null) {
        if (remainingBlocks.head.Case === "Ignore") {
          const patternInput = _Extensions.List.splitAt(remainingBlocks.head.Fields[0], remainingOriginalLines);

          outputLines = (0, _List.append)(outputLines, patternInput[0]);
          remainingOriginalLines = patternInput[1];
          remainingBlocks = remainingBlocks.tail;
          continue loop_1;
        } else if (remainingBlocks.head.Fields[0].Case === "Comment") {
          outputLines = outputLines;
          remainingOriginalLines = remainingOriginalLines;

          remainingBlocks = (bs => (0, _List.append)(bs, remainingBlocks.tail))((0, _Nonempty.toList)((0, _Block.splitUp)(remainingBlocks.head.Fields[0].Fields[0], remainingBlocks.head.Fields[1])));

          continue loop_1;
        } else {
          outputLines = (0, _List.append)(outputLines, (0, _Nonempty.toList)(wrapWrappable(remainingBlocks.head.Fields[1])));
          remainingOriginalLines = _Extensions.List.safeSkip((0, _Nonempty.length)()(remainingBlocks.head.Fields[1].lines), remainingOriginalLines);
          remainingBlocks = remainingBlocks.tail;
          continue loop_1;
        }
      } else {
        return outputLines;
      }
    }
  };

  const newLines = Array.from(loop_1(new _List2.default())((list_4 => _Extensions.List.safeSkip(startLine, list_4))((0, _Nonempty.toList)(originalLines)))(blocksToWrap));
  return new _Rewrap.Edit(startLine, endLine, newLines);
}