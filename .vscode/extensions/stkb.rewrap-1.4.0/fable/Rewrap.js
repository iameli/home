"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = exports.Position = exports.Edit = exports.Settings = undefined;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = require("fable-core/umd/Util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Settings {
  constructor(column, tabWidth, doubleSentenceSpacing, reformat, wholeComment) {
    this.column = column;
    this.tabWidth = tabWidth;
    this.doubleSentenceSpacing = doubleSentenceSpacing;
    this.reformat = reformat;
    this.wholeComment = wholeComment;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Rewrap.Settings",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        column: "number",
        tabWidth: "number",
        doubleSentenceSpacing: "boolean",
        reformat: "boolean",
        wholeComment: "boolean"
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

exports.Settings = Settings;
(0, _Symbol2.setType)("Rewrap.Settings", Settings);

class Edit {
  constructor(startLine, endLine, lines) {
    this.startLine = startLine;
    this.endLine = endLine;
    this.lines = lines;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Rewrap.Edit",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        startLine: "number",
        endLine: "number",
        lines: (0, _Util.Array)("string")
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

exports.Edit = Edit;
(0, _Symbol2.setType)("Rewrap.Edit", Edit);

class Position {
  constructor(line, character) {
    this.line = line;
    this.character = character;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Rewrap.Position",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        line: "number",
        character: "number"
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

exports.Position = Position;
(0, _Symbol2.setType)("Rewrap.Position", Position);

class Selection {
  constructor(active, anchor) {
    this.active = active;
    this.anchor = anchor;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Rewrap.Selection",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        active: Position,
        anchor: Position
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

exports.Selection = Selection;
(0, _Symbol2.setType)("Rewrap.Selection", Selection);