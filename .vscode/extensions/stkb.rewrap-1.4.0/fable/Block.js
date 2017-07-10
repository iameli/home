"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prefixes = exports.Wrappable = exports.TextType = exports.Block = undefined;
exports.prefixes = prefixes;
exports.wrappable = wrappable;
exports.comment = comment;
exports.text = text;
exports.code = code;
exports.ignore = ignore;
exports.length = length;
exports.isIgnore = isIgnore;
exports.splitUp = splitUp;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Nonempty = require("./Nonempty");

var _Util = require("fable-core/umd/Util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Block {
  constructor(caseName, fields) {
    this.Case = caseName;
    this.Fields = fields;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Block.Block",
      interfaces: ["FSharpUnion"],
      cases: {
        Ignore: ["number"],
        Wrap: [TextType, Wrappable]
      }
    };
  }

}

exports.Block = Block;
(0, _Symbol2.setType)("Block.Block", Block);

class TextType {
  constructor(caseName, fields) {
    this.Case = caseName;
    this.Fields = fields;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Block.TextType",
      interfaces: ["FSharpUnion"],
      cases: {
        Code: [],
        Comment: ["function"],
        Text: []
      }
    };
  }

}

exports.TextType = TextType;
(0, _Symbol2.setType)("Block.TextType", TextType);

class Wrappable {
  constructor(prefixes, lines) {
    this.prefixes = prefixes;
    this.lines = lines;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Block.Wrappable",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        prefixes: Prefixes,
        lines: (0, _Util.makeGeneric)(_Nonempty.Nonempty, {
          T: "string"
        })
      }
    };
  }

  Equals(other) {
    return (0, _Util.equalsRecords)(this, other);
  }

  CompareTo(other) {
    return (0, _Util.compareRecords)(this, other);
  }

}

exports.Wrappable = Wrappable;
(0, _Symbol2.setType)("Block.Wrappable", Wrappable);

class Prefixes {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Block.Prefixes",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        head: "string",
        tail: "string"
      }
    };
  }

  Equals(other) {
    return (0, _Util.equalsRecords)(this, other);
  }

  CompareTo(other) {
    return (0, _Util.compareRecords)(this, other);
  }

}

exports.Prefixes = Prefixes;
(0, _Symbol2.setType)("Block.Prefixes", Prefixes);

function prefixes(head, tail) {
  return new Prefixes(head, tail);
}

function wrappable(prefixes_1, lines) {
  return new Wrappable(prefixes_1, lines);
}

function comment(parser, wrappable_1) {
  return new Block("Wrap", [new TextType("Comment", [parser]), wrappable_1]);
}

function text(wrappable_1) {
  return new Block("Wrap", [new TextType("Text", []), wrappable_1]);
}

function code(wrappable_1) {
  return new Block("Wrap", [new TextType("Code", []), wrappable_1]);
}

function ignore(lines) {
  return new Block("Ignore", [(0, _Nonempty.length)()(lines)]);
}

function length(block) {
  if (block.Case === "Ignore") {
    return block.Fields[0];
  } else {
    return (0, _Nonempty.length)()(block.Fields[1].lines);
  }
}

function isIgnore(block) {
  if (block.Case === "Ignore") {
    return true;
  } else {
    return false;
  }
}

function splitUp(mapper, wrappable_1) {
  const concatPrefixes = first => second => {
    return new Prefixes(first.head + second.head, first.tail + second.tail);
  };

  const middlePrefixes = new Prefixes(wrappable_1.prefixes.tail, wrappable_1.prefixes.tail);

  const prependPrefixes = p => block => {
    if (block.Case === "Ignore") {
      return block;
    } else {
      return new Block("Wrap", [block.Fields[0], new Wrappable(concatPrefixes(p)(block.Fields[1].prefixes), block.Fields[1].lines)]);
    }
  };

  return (0, _Nonempty.mapTail)(prependPrefixes(middlePrefixes), (0, _Nonempty.mapHead)(prependPrefixes(wrappable_1.prefixes), mapper(wrappable_1.lines)));
}