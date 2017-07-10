"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineStartsWith = exports.blockQuoteRegex = exports.listItemRegex = undefined;
exports.markdown = markdown;
exports.mdMarker = mdMarker;
exports.findListItemEnd = findListItemEnd;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = require("fable-core/umd/Util");

var _Extensions = require("./Extensions");

var _Line = require("./Line");

var _Nonempty = require("./Nonempty");

var _Block = require("./Block");

var _Parsing = require("./Parsing.Core");

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _RegExp = require("fable-core/umd/RegExp");

var _Seq = require("fable-core/umd/Seq");

var _String2 = require("fable-core/umd/String");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MarkdownState {
  constructor(caseName, fields) {
    this.Case = caseName;
    this.Fields = fields;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Parsing.Markdown.MarkdownState",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: {
        FencedCodeBlock: [],
        NonParagraph: [],
        Paragraph: []
      }
    };
  }

  Equals(other) {
    return (0, _Util.equalsUnions)(this, other);
  }

  CompareTo(other) {
    return (0, _Util.compareUnions)(this, other);
  }

}

(0, _Symbol2.setType)("Parsing.Markdown.MarkdownState", MarkdownState);

function markdown(settings) {
  const fencedCodeBlock = _arg1 => {
    return (0, _Util.defaultArg)((option => (0, _Util.defaultArg)(option, null, str => _Extensions.String.trimStart(str)))((0, _Line.tryMatch)(mdMarker("(`{3,}|~{3,})"), _arg1.Fields[0])), null, marker => _Extensions.Option.defaultValue([(0, _Nonempty.singleton)((0, _Block.ignore)(_arg1)), null], (0, _Util.defaultArg)((0, _Nonempty.fromList)(_arg1.Fields[1]), null, $var68 => (() => {
      const f = $var67 => {
        return ($var66 => (0, _Nonempty.singleton)((0, _Block.ignore)($var66)))((neList => (0, _Nonempty.cons)(_arg1.Fields[0], neList))($var67));
      };

      return tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);
    })()((0, _Nonempty.splitAfter)(lineStartsWith(marker))($var68)))));
  };

  const htmlType1to6 = (parsers => lines => (0, _Parsing.tryMany)(parsers, lines))((list => (0, _List.map)(splitter => (0, _Parsing.ignoreParser)(splitter), list))((0, _List.ofArray)([(() => {
    const tupledArg_1 = [mdMarker("<(script|pre|style)( |>|$)"), (0, _RegExp.create)("</(script|pre|style)>", 1)];
    return arg10_ => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_1[0], tupledArg_1[1], arg10_);
  })(), (() => {
    const tupledArg_2 = [mdMarker("<!--"), (0, _RegExp.create)("-->")];
    return arg10__1 => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_2[0], tupledArg_2[1], arg10__1);
  })(), (() => {
    const tupledArg_3 = [mdMarker("<?"), (0, _RegExp.create)("\\?>")];
    return arg10__2 => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_3[0], tupledArg_3[1], arg10__2);
  })(), (() => {
    const tupledArg_4 = [mdMarker("<![A-Z]"), (0, _RegExp.create)(">")];
    return arg10__3 => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_4[0], tupledArg_4[1], arg10__3);
  })(), (() => {
    const tupledArg_5 = [mdMarker("<!\\[CDATA\\["), (0, _RegExp.create)("]]>")];
    return arg10__4 => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_5[0], tupledArg_5[1], arg10__4);
  })(), (() => {
    const tupledArg_6 = [mdMarker("</?(address|article|aside|base|basefont|blockquote" + "|body|caption|center|col|colgroup|dd|details" + "|dialog|dir|div|dl|dt|fieldset|figcaption|figure" + "|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6" + "|head|header|hr|html|iframe|legend|li|link|main" + "|menu|menuitem|meta|nav|noframes|ol|optgroup" + "|option|p|param|section|source|summary|table" + "|tbody|td|tfoot|th|thead|title|tr|track|ul)" + "(\\s|/?>|$)"), (0, _RegExp.create)("^\\s*$")];
    return arg10__5 => (0, _Parsing.takeLinesBetweenMarkers)(tupledArg_6[0], tupledArg_6[1], arg10__5);
  })()])));

  let table;
  const cellsRowRegex = (0, _RegExp.create)("\\S\\s*\\|\\s*\\S");
  const dividerRowRegex = (0, _RegExp.create)(":?-+:?\\s*\\|\\s*:?-+:?");

  const splitter_1 = lines_1 => {
    const matchValue = (0, _Nonempty.toList)(lines_1);
    const $var69 = matchValue.tail != null ? matchValue.tail.tail != null ? [0, matchValue.head, matchValue.tail.tail, matchValue.tail.head] : [1] : [1];

    switch ($var69[0]) {
      case 0:
        if ((0, _Line.contains)(cellsRowRegex, $var69[1]) ? (0, _Line.contains)(dividerRowRegex, $var69[3]) : false) {
          return (() => {
            const f_1 = list_1 => {
              return (0, _Nonempty.fromList)(list_1);
            };

            return tupledArg_7 => _Extensions.Tuple.mapSecond(f_1, tupledArg_7[0], tupledArg_7[1]);
          })()((() => {
            const f_2 = rows => {
              return new _Nonempty.Nonempty("Nonempty", [$var69[1], new _List2.default($var69[3], rows)]);
            };

            return tupledArg_8 => _Extensions.Tuple.mapFirst(f_2, tupledArg_8[0], tupledArg_8[1]);
          })()(_Extensions.List.span(line => (0, _Line.contains)(cellsRowRegex, line))($var69[2])));
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  table = (0, _Parsing.ignoreParser)(splitter_1);
  const nonText = (0, _Parsing.ignoreParser)((0, _Nonempty.span)(s => !((0, _Line.containsText)(s) ? true : (0, _Line.isBlank)(s))));
  const atxHeading = (0, _Parsing.ignoreParser)((0, _Nonempty.span)(lineStartsWith("#{1,6} ")));
  let blockQuote;

  const splitter_2 = lines_2 => {
    return (0, _Util.defaultArg)((0, _Util.defaultArg)(lines_2, null, x => ($var70 => lineStartsWith(">")((arg00_ => (0, _Nonempty.head)(arg00_))($var70)))(x) ? x : null), null, (0, _Nonempty.span)(s_1 => !(0, _Line.isBlank)(s_1)));
  };

  const mapper = lines_3 => {
    const tuples = (0, _Nonempty.map)((() => {
      const regex = (0, _RegExp.create)(" {0,3}>? ?");
      return line_1 => (0, _Line.split)(regex, line_1);
    })(), lines_3);
    const prefixes = settings.reformat ? (0, _Block.prefixes)("> ", "> ") : (0, _Block.prefixes)(tuples.Fields[0][0], (opt => _Extensions.Option.defaultValue(tuples.Fields[0], opt))((0, _Seq.tryHead)(tuples.Fields[1]))[1]);
    return (0, _Block.splitUp)(markdown(settings), (0, _Block.wrappable)(prefixes, (0, _Nonempty.map)(tuple => tuple[1], tuples)));
  };

  blockQuote = (0, _Parsing.optionParser)(splitter_2, mapper);
  const indentedCodeBlock = (0, _Parsing.ignoreParser)((0, _Nonempty.span)((() => {
    const regex_1 = (0, _RegExp.create)("^(\\s{4}|\\t)");
    return line_2 => (0, _Line.contains)(regex_1, line_2);
  })()));

  const listItem = _arg2 => {
    const doStuff = listItemPrefix => {
      const strippedFirstLine = _Extensions.String.dropStart(listItemPrefix.length, _arg2.Fields[0]);

      const prefixWithSpace = _Extensions.String.takeEnd(1, listItemPrefix) === " " ? listItemPrefix : listItemPrefix + " ";
      const indent = prefixWithSpace.length;
      const patternInput = strippedFirstLine === "" ? findListItemEnd(indent)(new MarkdownState("NonParagraph", []))(_arg2.Fields[1]) : findListItemEnd(indent)(new MarkdownState("Paragraph", []))(_arg2.Fields[1]);
      const tailRegex = (0, _RegExp.create)("^ {0," + String(indent) + "}");
      const headPrefix = settings.reformat ? _Extensions.String.trim(prefixWithSpace) + " " : prefixWithSpace;
      return [(0, _Block.splitUp)(markdown(settings), (0, _Block.wrappable)((0, _Block.prefixes)(headPrefix, (0, _String2.replicate)(headPrefix.length, " ")), new _Nonempty.Nonempty("Nonempty", [strippedFirstLine, (0, _List.map)($var71 => (tuple_1 => tuple_1[1])((line_3 => (0, _Line.split)(tailRegex, line_3))($var71)), patternInput[0])]))), patternInput[1]];
    };

    return (option_1 => (0, _Util.defaultArg)(option_1, null, doStuff))((0, _Line.tryMatch)(listItemRegex, _arg2.Fields[0]));
  };

  const paragraphBlocks = $var72 => {
    return (() => {
      const fn = arg10__6 => {
        return (0, _Parsing.firstLineIndentParagraphBlock)(settings.reformat, arg10__6);
      };

      return arg10__7 => (0, _Nonempty.map)(fn, arg10__7);
    })()((0, _Parsing.splitIntoChunks)((0, _Parsing.afterRegex)((0, _RegExp.create)("(\\\\|\\s{2})$")))($var72));
  };

  let paragraphTerminatingParsers;
  const parsers_1 = (0, _List.ofArray)([_Parsing.blankLines, fencedCodeBlock, nonText, listItem, blockQuote]);

  paragraphTerminatingParsers = lines_4 => (0, _Parsing.tryMany)(parsers_1, lines_4);

  const paragraphs = arg20_ => {
    return (0, _Parsing.takeLinesUntil)(paragraphTerminatingParsers, paragraphBlocks, arg20_);
  };

  let allParsers;
  const parsers_2 = (0, _List.ofArray)([_Parsing.blankLines, fencedCodeBlock, table, nonText, atxHeading, indentedCodeBlock, listItem, blockQuote]);

  allParsers = lines_5 => (0, _Parsing.tryMany)(parsers_2, lines_5);

  return $var73 => (lines_6 => (0, _Parsing.repeatUntilEnd)(allParsers, paragraphs, lines_6))((() => {
    const fn_1 = str_1 => {
      return (0, _Line.tabsToSpaces)(settings.tabWidth, str_1);
    };

    return arg10__8 => (0, _Nonempty.map)(fn_1, arg10__8);
  })()($var73));
}

function mdMarker(marker) {
  return (0, _RegExp.create)("^ {0,3}" + marker, 1);
}

const listItemRegex = exports.listItemRegex = mdMarker("([-+*]|[0-9]+[.)])(\\s+|$)");
const blockQuoteRegex = exports.blockQuoteRegex = mdMarker(">");

const lineStartsWith = exports.lineStartsWith = $var74 => (regex => line => (0, _Line.contains)(regex, line))((marker => mdMarker(marker))($var74));

function findListItemEnd(indent) {
  const combine = output => remaining => {
    return [(0, _List.reverse)(output), (0, _Nonempty.fromList)(remaining)];
  };

  const modifyState = state => line => {
    if (state.Case === "Paragraph") {
      if (lineStartsWith("(```|~~~)")(line)) {
        return new MarkdownState("FencedCodeBlock", []);
      } else if (!(0, _Line.containsText)(line) ? true : lineStartsWith("#{1,6} ")(line)) {
        return new MarkdownState("NonParagraph", []);
      } else {
        return new MarkdownState("Paragraph", []);
      }
    } else if (state.Case === "NonParagraph") {
      if (lineStartsWith("(```|~~~)")(line)) {
        return new MarkdownState("FencedCodeBlock", []);
      } else if (!(0, _Line.containsText)(line) ? true : lineStartsWith("#{1,6} ")(line)) {
        return new MarkdownState("NonParagraph", []);
      } else if ((0, _Line.contains)((0, _RegExp.create)("^ {4,}"), line)) {
        return new MarkdownState("NonParagraph", []);
      } else {
        return new MarkdownState("Paragraph", []);
      }
    } else if (lineStartsWith("(```|~~~)")(line)) {
      return new MarkdownState("NonParagraph", []);
    } else {
      return new MarkdownState("FencedCodeBlock", []);
    }
  };

  const loop = output_1 => state_1 => lines => {
    loop: while (true) {
      if (lines.tail == null) {
        return combine(output_1)(lines);
      } else if ((0, _Line.leadingWhitespace)(lines.head).length < indent) {
        if ((0, _Line.contains)(blockQuoteRegex, lines.head) ? true : (0, _Line.contains)(listItemRegex, lines.head)) {
          return combine(output_1)(lines);
        } else if (state_1.Case === "Paragraph") {
          output_1 = new _List2.default(lines.head, output_1);
          state_1 = modifyState(state_1)(lines.head);
          lines = lines.tail;
          continue loop;
        } else {
          return combine(output_1)(lines);
        }
      } else {
        output_1 = new _List2.default(lines.head, output_1);
        state_1 = modifyState(state_1)(lines.head);
        lines = lines.tail;
        continue loop;
      }
    }
  };

  return loop(new _List2.default());
}