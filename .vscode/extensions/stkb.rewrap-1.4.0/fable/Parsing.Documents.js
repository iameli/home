"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languageFromFileName = languageFromFileName;
exports.select = select;

var _List = require("fable-core/umd/List");

var _Parsing = require("./Parsing.SourceCode");

var _Parsing2 = require("./Parsing.Comments");

var _Parsing3 = require("./Parsing.DocComments");

var _Parsing4 = require("./Parsing.Latex");

var _Parsing5 = require("./Parsing.Markdown");

var _Util = require("fable-core/umd/Util");

var _Seq = require("fable-core/umd/Seq");

var _String = require("fable-core/umd/String");

var _Extensions = require("./Extensions");

const parsersTable = (0, _List.ofArray)([[(0, _List.ofArray)(["ahk"]), (0, _Parsing.sourceCode)(";", ["\\/\\*", "\\*\\/"])], [(0, _List.ofArray)(["basic", "vb"]), (() => {
  const commentParsers = (0, _List.ofArray)([(() => {
    const marker = "'''";
    return settings => (0, _Parsing2.lineComment)(_Parsing.html, marker, settings);
  })(), (0, _Parsing.stdLineComment)("'")]);
  return settings_1 => (0, _Parsing.customSourceCode)(commentParsers, settings_1);
})()], [(0, _List.ofArray)(["bat"]), (0, _Parsing.sourceCode)("(?:rem|::)", null)], [(0, _List.ofArray)(["c", "cpp", "go", "groovy", "objective-c", "shaderlab", "swift"]), (0, _Parsing.sourceCode)("//", ["/\\*", "\\*/"])], [(0, _List.ofArray)(["csharp"]), (() => {
  const commentParsers_1 = (0, _List.ofArray)([(() => {
    const marker_1 = "///";
    return settings_2 => (0, _Parsing2.lineComment)(_Parsing.html, marker_1, settings_2);
  })(), (0, _Parsing.stdLineComment)("//"), (0, _Parsing.stdBlockComment)(_Parsing.cBlockMarkers)]);
  return settings_3 => (0, _Parsing.customSourceCode)(commentParsers_1, settings_3);
})()], [(0, _List.ofArray)(["coffeescript"]), (() => {
  const commentParsers_2 = (0, _List.ofArray)([(() => {
    const tupledArg = ["[*#]", " * "];
    const tupledArg_1 = ["###\\*", "###"];
    return settings_4 => (0, _Parsing2.blockComment)(settings_5 => (0, _Parsing3.javadoc)(settings_5), tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1], settings_4);
  })(), (0, _Parsing.stdBlockComment)(["###", "###"]), (0, _Parsing.stdLineComment)("#")]);
  return settings_6 => (0, _Parsing.customSourceCode)(commentParsers_2, settings_6);
})()], [(0, _List.ofArray)(["css", "less", "scss"]), _Parsing.css], [(0, _List.ofArray)(["dart"]), (() => {
  const commentParsers_3 = (0, _List.ofArray)([(() => {
    const marker_2 = "///";
    return settings_7 => (0, _Parsing2.lineComment)(settings_8 => (0, _Parsing3.dartdoc)(settings_8), marker_2, settings_7);
  })(), (0, _Parsing.stdLineComment)("//"), (() => {
    const tupledArg_2 = ["\\*", " * "];
    const startMarker = _Parsing.javadocMarkers[0];
    const endMarker = _Parsing.javadocMarkers[1];
    return settings_9 => (0, _Parsing2.blockComment)(settings_10 => (0, _Parsing3.dartdoc)(settings_10), tupledArg_2[0], tupledArg_2[1], startMarker, endMarker, settings_9);
  })(), (0, _Parsing.stdBlockComment)(_Parsing.cBlockMarkers)]);
  return settings_11 => (0, _Parsing.customSourceCode)(commentParsers_3, settings_11);
})()], [(0, _List.ofArray)(["dockerfile", "elixir", "makefile", "perl", "r", "shellscript", "toml", "yaml"]), (0, _Parsing.sourceCode)("#", null)], [(0, _List.ofArray)(["elm"]), (0, _Parsing.sourceCode)("--", ["{-\\|?", "-}"])], [(0, _List.ofArray)(["f#", "fsharp"]), (() => {
  const commentParsers_4 = (0, _List.ofArray)([(() => {
    const marker_3 = "///";
    return settings_12 => (0, _Parsing2.lineComment)(_Parsing.html, marker_3, settings_12);
  })(), (0, _Parsing.stdLineComment)("//"), (0, _Parsing.stdBlockComment)(["\\(\\*", "\\*\\)"])]);
  return settings_13 => (0, _Parsing.customSourceCode)(commentParsers_4, settings_13);
})()], [(0, _List.ofArray)(["handlebars", "html", "xml", "xsl"]), _Parsing.html], [(0, _List.ofArray)(["haskell", "purescript"]), (0, _Parsing.sourceCode)("--", ["{-", "-}"])], [(0, _List.ofArray)(["ini"]), (0, _Parsing.sourceCode)("[#;]", null)], [(0, _List.ofArray)(["jade"]), (0, _Parsing.sourceCode)("\\/\\/", null)], [(0, _List.ofArray)(["java", "javascript", "javascriptreact", "json", "typescript", "typescriptreact"]), _Parsing.java], [(0, _List.ofArray)(["latex", "tex"]), settings_14 => (0, _Parsing4.latex)(settings_14)], [(0, _List.ofArray)(["lua"]), (0, _Parsing.sourceCode)("--", ["--\\[\\[", "\\]\\]"])], [(0, _List.ofArray)(["markdown"]), settings_15 => (0, _Parsing5.markdown)(settings_15)], [(0, _List.ofArray)(["perl", "perl6", "ruby"]), (0, _Parsing.sourceCode)("#", ["=begin", "=end"])], [(0, _List.ofArray)(["php"]), (() => {
  const commentParsers_5 = (0, _List.ofArray)([(() => {
    const tupledArg_3 = ["\\*", " * "];
    const startMarker_1 = _Parsing.javadocMarkers[0];
    const endMarker_1 = _Parsing.javadocMarkers[1];
    return settings_16 => (0, _Parsing2.blockComment)(settings_17 => (0, _Parsing3.javadoc)(settings_17), tupledArg_3[0], tupledArg_3[1], startMarker_1, endMarker_1, settings_16);
  })(), (0, _Parsing.stdBlockComment)(_Parsing.cBlockMarkers), (0, _Parsing.stdLineComment)("(?://|#)")]);
  return settings_18 => (0, _Parsing.customSourceCode)(commentParsers_5, settings_18);
})()], [(0, _List.ofArray)(["powershell"]), (0, _Parsing.sourceCode)("#", ["<#", "#>"])], [(0, _List.ofArray)(["python"]), (0, _Parsing.sourceCode)("#", ["('''|\"\"\")", "('''|\"\"\")"])], [(0, _List.ofArray)(["rust"]), (0, _Parsing.sourceCode)("\\/{2}(?:\\/|\\!)?", null)], [(0, _List.ofArray)(["sql"]), (0, _Parsing.sourceCode)("--", ["\\/\\*", "\\*\\/"])]]);
const languagesTable = (0, _List.ofArray)([[(0, _List.ofArray)([".ahk"]), "ahk"], [(0, _List.ofArray)([".bat"]), "bat"], [(0, _List.ofArray)([".bbx", ".cbx", ".cls", ".sty"]), "tex"], [(0, _List.ofArray)([".c", ".cpp", ".h", ".m", ".mm"]), "c"], [(0, _List.ofArray)([".coffee"]), "coffeescript"], [(0, _List.ofArray)([".cs"]), "csharp"], [(0, _List.ofArray)([".css", ".less", ".sass", ".scss"]), "scss"], [(0, _List.ofArray)([".dart"]), "dart"], [(0, _List.ofArray)(["dockerfile"]), "dockerfile"], [(0, _List.ofArray)([".elm"]), "elm"], [(0, _List.ofArray)([".ex", ".exs"]), "elixir"], [(0, _List.ofArray)([".fs", ".fsx"]), "fsharp"], [(0, _List.ofArray)([".go"]), "go"], [(0, _List.ofArray)([".groovy"]), "groovy"], [(0, _List.ofArray)([".hs"]), "haskell"], [(0, _List.ofArray)([".ini"]), "ini"], [(0, _List.ofArray)([".java"]), "java"], [(0, _List.ofArray)([".js", ".jsx", ".ts", ".tsx"]), "javascript"], [(0, _List.ofArray)([".lua"]), "lua"], [(0, _List.ofArray)(["makefile"]), "makefile"], [(0, _List.ofArray)([".md"]), "markdown"], [(0, _List.ofArray)([".php"]), "php"], [(0, _List.ofArray)([".pl", ".pm"]), "perl"], [(0, _List.ofArray)([".ps1", ".psm1"]), "powershell"], [(0, _List.ofArray)([".purs"]), "purescript"], [(0, _List.ofArray)([".py"]), "python"], [(0, _List.ofArray)([".r"]), "r"], [(0, _List.ofArray)([".rs"]), "rust"], [(0, _List.ofArray)([".sh"]), "shellscript"], [(0, _List.ofArray)([".sql"]), "sql"], [(0, _List.ofArray)([".swift"]), "swift"], [(0, _List.ofArray)([".tex"]), "latex"], [(0, _List.ofArray)([".toml"]), "toml"], [(0, _List.ofArray)([".vb"]), "vb"], [(0, _List.ofArray)([".xml", ".xsl"]), "xml"], [(0, _List.ofArray)([".yaml"]), "yaml"]]);

function findIn(table, id) {
  return (0, _Util.defaultArg)((0, _Seq.tryFind)($var106 => (source => (0, _Seq.exists)(x => (0, _Util.equals)(id, x), source))((tuple_1 => tuple_1[0])($var106)), table), null, tuple => tuple[1]);
}

function languageFromFileName(filePath) {
  const fileName = (0, _Seq.last)((0, _String.split)(filePath, "\\", "/"));
  let extensionOrName;
  const matchValue = (0, _String.split)(fileName.toLocaleLowerCase(), ".");

  if (matchValue.length === 1) {
    const name = matchValue[0];
    extensionOrName = name;
  } else {
    extensionOrName = "." + (0, _Seq.last)(matchValue);
  }

  return findIn(languagesTable, extensionOrName);
}

function select(language, filePath) {
  const plainText = (0, _Parsing.sourceCode)(null, null);
  return (opt => _Extensions.Option.defaultValue(plainText, opt))(_Extensions.Option.orElseWith(() => (0, _Util.defaultArg)(languageFromFileName(filePath), null, id => findIn(parsersTable, id)), findIn(parsersTable, language.toLocaleLowerCase())));
}