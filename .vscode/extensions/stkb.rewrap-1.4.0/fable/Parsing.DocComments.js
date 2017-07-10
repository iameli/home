"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagRegex = undefined;
exports.javadoc = javadoc;
exports.dartdoc = dartdoc;

var _RegExp = require("fable-core/umd/RegExp");

var _String = require("fable-core/umd/String");

var _Nonempty = require("./Nonempty");

var _Block = require("./Block");

var _Parsing = require("./Parsing.Markdown");

var _Parsing2 = require("./Parsing.Core");

var _Line = require("./Line");

var _Extensions = require("./Extensions");

const tagRegex = exports.tagRegex = (0, _RegExp.create)("^\\s*@(\\w+)(.*)$");

function javadoc(settings) {
  const isStandaloneTag = m => {
    if (m != null) {
      return (0, _String.isNullOrEmpty)(m[2]);
    } else {
      return false;
    }
  };

  const splitTaggedSection = _arg1 => {
    const m_1 = (0, _RegExp.match)(tagRegex, _arg1.Fields[0]);

    if (isStandaloneTag(m_1)) {
      if (m_1[1].toLocaleLowerCase() === "example") {
        return (0, _Nonempty.singleton)((0, _Block.ignore)(_arg1));
      } else {
        const tagBlock = new _Block.Block("Ignore", [1]);
        const matchValue = (0, _Nonempty.fromList)(_arg1.Fields[1]);

        if (matchValue == null) {
          return (0, _Nonempty.singleton)(tagBlock);
        } else {
          return (0, _Nonempty.cons)(tagBlock, (0, _Parsing.markdown)(settings)(matchValue));
        }
      }
    } else {
      return (0, _Parsing.markdown)(settings)(_arg1);
    }
  };

  return $var93 => (neList => (0, _Nonempty.collect)(splitTaggedSection, neList))((0, _Parsing2.splitIntoChunks)(arg10_ => (0, _Parsing2.beforeRegex)(tagRegex, arg10_))($var93));
}

function dartdoc(settings) {
  let isTag;
  const regex = (0, _RegExp.create)("^\\s*(@nodoc|{@template|{@endtemplate|{@macro)");

  isTag = line => (0, _Line.contains)(regex, line);

  const splitOnTags = _arg1 => {
    if (isTag(_arg1.Fields[0])) {
      return [(0, _Nonempty.singleton)(_arg1.Fields[0]), (0, _Nonempty.fromList)(_arg1.Fields[1])];
    } else {
      return (() => {
        const f = list => {
          return (0, _Nonempty.fromList)(list);
        };

        return tupledArg => _Extensions.Tuple.mapSecond(f, tupledArg[0], tupledArg[1]);
      })()((() => {
        const f_1 = before => {
          return new _Nonempty.Nonempty("Nonempty", [_arg1.Fields[0], before]);
        };

        return tupledArg_1 => _Extensions.Tuple.mapFirst(f_1, tupledArg_1[0], tupledArg_1[1]);
      })()(_Extensions.List.span(l => !isTag(l))(_arg1.Fields[1])));
    }
  };

  return $var94 => (() => {
    const fn = (0, _Parsing.markdown)(settings);
    return neList => (0, _Nonempty.collect)(fn, neList);
  })()((0, _Parsing2.splitIntoChunks)(splitOnTags)($var94));
}