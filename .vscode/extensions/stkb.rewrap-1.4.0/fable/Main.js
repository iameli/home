"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languageFromFileName = languageFromFileName;
exports.rewrap = rewrap;

var _Extensions = require("./Extensions");

var _Parsing = require("./Parsing.Documents");

var _Nonempty = require("./Nonempty");

var _Seq = require("fable-core/umd/Seq");

var _Wrapping = require("./Wrapping");

var _Selections = require("./Selections");

function languageFromFileName(fileName) {
  return _Extensions.Option.defaultValue(null, (0, _Parsing.languageFromFileName)(fileName));
}

function rewrap(language, filePath, selections, settings, lines) {
  const parser = (0, _Parsing.select)(language, filePath);
  const originalLines = (0, _Nonempty.fromListUnsafe)((0, _Seq.toList)(lines));
  return (blocks => (0, _Wrapping.wrapBlocks)(settings, originalLines, blocks))((blocks_1 => (0, _Selections.applyToBlocks)(selections, settings, blocks_1))(parser(settings)(originalLines)));
}