"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyToBlocks = applyToBlocks;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = require("fable-core/umd/Util");

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _Nonempty = require("./Nonempty");

var _Extensions = require("./Extensions");

var _Block = require("./Block");

var _Seq = require("fable-core/umd/Seq");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LineRange {
  [_Symbol3.default.reflection]() {
    return {
      type: "Selections.LineRange",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        s: "number",
        e: "number"
      }
    };
  }

  Equals(other) {
    return (0, _Util.equalsRecords)(this, other);
  }

  CompareTo(other) {
    return (0, _Util.compareRecords)(this, other);
  }

  constructor(s, e) {
    this.s = s;
    this.e = e;
  }

  get startLine() {
    return this.s;
  }

  get endLine() {
    return this.e;
  }

  get length() {
    if (this.endLine - this.startLine + 1 > 0) {
      return this.endLine - this.startLine + 1;
    } else {
      return 0;
    }
  }

  get isEmpty() {
    return this.endLine < this.startLine;
  }

  static fromStartEnd(startLine, endLine) {
    return new LineRange(startLine, endLine);
  }

  static fromStartLength(startLine, length) {
    return new LineRange(startLine, startLine + length - 1);
  }

  static fromSelection(s) {
    const startLine = s.active.line < s.anchor.line ? s.active.line : s.anchor.line;
    const endLine = s.active.line > s.anchor.line ? s.active.line : s.anchor.line;
    const isEmpty = startLine === endLine ? s.anchor.character === s.active.character : false;

    if (isEmpty) {
      return new LineRange(startLine, startLine - 1);
    } else if (s.active.line > s.anchor.line ? s.active.character === 0 : false) {
      return new LineRange(s.anchor.line, s.active.line - 1);
    } else if (s.anchor.line > s.active.line ? s.anchor.character === 0 : false) {
      return new LineRange(s.active.line, s.anchor.line - 1);
    } else {
      return new LineRange(startLine, endLine);
    }
  }

  get shiftStartDown() {
    if (this.endLine > this.startLine) {
      return new LineRange(this.startLine + 1, this.endLine);
    } else {
      return null;
    }
  }

  get shiftEndUp() {
    if (this.endLine > this.startLine) {
      return new LineRange(this.startLine, this.endLine - 1);
    } else {
      return null;
    }
  }

}

(0, _Symbol2.setType)("Selections.LineRange", LineRange);

function intersects(r1, r2) {
  intersects: while (true) {
    if (r2.isEmpty) {
      const $var45 = r2;
      r2 = r1;
      r1 = $var45;
      continue intersects;
    } else if (r1.isEmpty) {
      if (r1.startLine >= r2.startLine) {
        return r1.startLine <= r2.endLine;
      } else {
        return false;
      }
    } else {
      return (r1.startLine > r2.startLine ? r1.startLine : r2.startLine) <= (r1.endLine < r2.endLine ? r1.endLine : r2.endLine);
    }
  }
}

const normalizeRanges = (() => {
  const loop = output => input => {
    loop: while (true) {
      if (input.tail != null) {
        if (input.tail.tail != null) {
          if (input.head.endLine === input.tail.head.startLine) {
            if (input.head.isEmpty ? input.tail.head.isEmpty : false) {
              output = output;
              input = new _List2.default(input.tail.head, input.tail.tail);
              continue loop;
            } else if (input.head.isEmpty) {
              const matchValue = input.tail.head.shiftStartDown;

              if (matchValue != null) {
                output = new _List2.default(input.head, output);
                input = new _List2.default(matchValue, input.tail.tail);
                continue loop;
              } else {
                output = new _List2.default(input.head, output);
                input = input.tail.tail;
                continue loop;
              }
            } else if (input.tail.head.isEmpty) {
              const matchValue_1 = input.head.shiftEndUp;

              if (matchValue_1 != null) {
                output = new _List2.default(matchValue_1, output);
                input = new _List2.default(input.tail.head, input.tail.tail);
                continue loop;
              } else {
                output = output;
                input = new _List2.default(input.tail.head, input.tail.tail);
                continue loop;
              }
            } else {
              output = output;
              input = new _List2.default((arg00 => arg10 => LineRange.fromStartEnd(arg00, arg10))(input.head.startLine)(input.tail.head.endLine), input.tail.tail);
              continue loop;
            }
          } else {
            output = new _List2.default(input.head, output);
            input = new _List2.default(input.tail.head, input.tail.tail);
            continue loop;
          }
        } else {
          return new _List2.default(input.head, output);
        }
      } else {
        return output;
      }
    }
  };

  return $var40 => (list => (0, _List.reverse)(list))(loop(new _List2.default())($var40));
})();

function splitWrappable(length, w) {
  const maybeTopLines = (0, _Nonempty.fromList)(_Extensions.List.truncate()(length)((0, _Nonempty.toList)(w.lines)));
  const maybeBottomLines = (0, _Nonempty.fromList)((list => _Extensions.List.safeSkip(length, list))((0, _Nonempty.toList)(w.lines)));
  const bottomPrefixes = (0, _Block.prefixes)(w.prefixes.tail, w.prefixes.tail);

  if (maybeTopLines == null) {
    throw new Error("Length < 1");
  } else {
    return [(0, _Block.wrappable)(w.prefixes, maybeTopLines), (0, _Util.defaultArg)(maybeBottomLines, null, lines => (0, _Block.wrappable)(bottomPrefixes, lines))];
  }
}

function ignoreBlock(block) {
  return new _Block.Block("Ignore", [(0, _Block.length)(block)]);
}

function isPrimary(block) {
  const $var41 = block.Case === "Wrap" ? block.Fields[0].Case === "Comment" ? [0] : block.Fields[0].Case === "Text" ? [1] : [2] : [2];

  switch ($var41[0]) {
    case 0:
      return true;

    case 1:
      return true;

    case 2:
      return false;
  }
}

function withRange(offset, block) {
  return [block, (arg00 => arg10 => LineRange.fromStartLength(arg00, arg10))(offset)((0, _Block.length)(block))];
}

function addRanges(baseOffset, blocks) {
  return (0, _Nonempty.unfold)(tupledArg => [withRange(tupledArg[0], tupledArg[1].Fields[0]), (0, _Util.defaultArg)((0, _Nonempty.fromList)(tupledArg[1].Fields[1]), null, list => [tupledArg[0] + (0, _Block.length)(tupledArg[1].Fields[0]), list])])([baseOffset, blocks]);
}

function applySelectionsToBlock(selections, wholeComment, _arg1_0, _arg1_1) {
  const _arg1 = [_arg1_0, _arg1_1];
  const selectionsTouching = (0, _List.filter)(r2 => intersects(_arg1[1], r2), selections);
  const hasEmptySelection = (0, _Seq.exists)(s => s.isEmpty, selectionsTouching);
  const matchValue = (0, _Seq.tryHead)(selectionsTouching);

  if (matchValue != null) {
    if (_arg1[0].Case === "Wrap") {
      if (_arg1[0].Fields[0].Case === "Comment") {
        if (wholeComment ? hasEmptySelection : false) {
          return (0, _Nonempty.singleton)(_arg1[0]);
        } else {
          return (0, _Nonempty.collect)(tupledArg => applySelectionsToBlock(selections, wholeComment, tupledArg[0], tupledArg[1]), addRanges(_arg1[1].startLine, (0, _Block.splitUp)(_arg1[0].Fields[0].Fields[0], _arg1[0].Fields[1])));
        }
      } else if (hasEmptySelection) {
        return (0, _Nonempty.singleton)(_arg1[0]);
      } else {
        const selectionStartOffset = matchValue.startLine - _arg1[1].startLine;
        const selectionEndOffset = matchValue.endLine - _arg1[1].startLine + 1;
        const patternInput = selectionStartOffset > 0 ? [selectionStartOffset, w => (0, _Block.ignore)(w.lines)] : [selectionEndOffset, w_1 => new _Block.Block("Wrap", [_arg1[0].Fields[0], w_1])];

        const patternInput_1 = (tupledArg_1 => _Extensions.Tuple.mapFirst(patternInput[1], tupledArg_1[0], tupledArg_1[1]))(splitWrappable(patternInput[0], _arg1[0].Fields[1]));

        if (patternInput_1[1] == null) {
          return (0, _Nonempty.singleton)(patternInput_1[0]);
        } else {
          return (0, _Nonempty.cons)(patternInput_1[0], (() => {
            const tupledArg_2 = withRange(_arg1[1].startLine + patternInput[0], new _Block.Block("Wrap", [_arg1[0].Fields[0], patternInput_1[1]]));
            return applySelectionsToBlock(selectionsTouching, wholeComment, tupledArg_2[0], tupledArg_2[1]);
          })());
        }
      }
    } else {
      return (0, _Nonempty.singleton)(_arg1[0]);
    }
  } else {
    return (0, _Nonempty.singleton)(ignoreBlock(_arg1[0]));
  }
}

function applyToBlocks(selections, settings, blocks) {
  const selectionRanges = normalizeRanges((0, _List.map)(arg00 => LineRange.fromSelection(arg00), (0, _Seq.toList)(selections)));
  const blocksWithRanges = addRanges(0, blocks);
  let selectionsWithNoComments;

  const hasComments = selection => {
    return (list => (0, _Seq.exists)(block => isPrimary(block), list))((0, _List.map)(tuple => tuple[0], (0, _List.filter)($var42 => (r2 => intersects(selection, r2))((tuple_1 => tuple_1[1])($var42)), (0, _Nonempty.toList)(blocksWithRanges))));
  };

  selectionsWithNoComments = (0, _List.filter)($var43 => (value => !value)(hasComments($var43)), selectionRanges);

  const selectionsForBlock = block_1 => {
    if (isPrimary(block_1)) {
      return selectionRanges;
    } else {
      return selectionsWithNoComments;
    }
  };

  const unselectedBlocksExcluded = (0, _Nonempty.map)(tupledArg => ($var44 => !($var44.tail == null))((0, _List.filter)(r2_1 => intersects(tupledArg[1], r2_1), selectionsForBlock(tupledArg[0]))) ? [tupledArg[0], tupledArg[1]] : [ignoreBlock(tupledArg[0]), tupledArg[1]], blocksWithRanges);
  return (0, _Nonempty.collect)(tupledArg_1 => applySelectionsToBlock(selectionsForBlock(tupledArg_1[0]), settings.wholeComment, tupledArg_1[0], tupledArg_1[1]), unselectedBlocksExcluded);
}