"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.String = exports.List = exports.Option = exports.Tuple = undefined;

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _Util = require("fable-core/umd/Util");

var _String2 = require("fable-core/umd/String");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Tuple = exports.Tuple = function (__exports) {
  const mapFirst = __exports.mapFirst = function (f, a, b) {
    return [f(a), b];
  };

  const mapSecond = __exports.mapSecond = function (f, a, b) {
    return [a, f(b)];
  };

  return __exports;
}({});

const Option = exports.Option = function (__exports) {
  const defaultValue = __exports.defaultValue = function (def, opt) {
    if (opt == null) {
      return def;
    } else {
      return opt;
    }
  };

  const defaultWith = __exports.defaultWith = function (thunk, opt) {
    if (opt == null) {
      return thunk(null);
    } else {
      return opt;
    }
  };

  const orElse = __exports.orElse = function (ifNone, option) {
    if (option == null) {
      return ifNone;
    } else {
      return option;
    }
  };

  const orElseWith = __exports.orElseWith = function (thunk, opt) {
    if (opt == null) {
      return thunk(null);
    } else {
      return opt;
    }
  };

  return __exports;
}({});

const List = exports.List = function (__exports) {
  const safeSkip = __exports.safeSkip = function (n, list) {
    safeSkip: while (true) {
      if (n > 0) {
        if (list.tail != null) {
          n = n - 1;
          list = list.tail;
          continue safeSkip;
        } else {
          return new _List2.default();
        }
      } else {
        return list;
      }
    }
  };

  const span = __exports.span = function (predicate) {
    const loop = output => remaining => {
      loop: while (true) {
        if (remaining.tail != null) {
          if (predicate(remaining.head)) {
            output = new _List2.default(remaining.head, output);
            remaining = remaining.tail;
            continue loop;
          } else {
            return [(0, _List.reverse)(output), remaining];
          }
        } else {
          return [(0, _List.reverse)(output), new _List2.default()];
        }
      }
    };

    return loop(new _List2.default());
  };

  const truncate = __exports.truncate = function () {
    const loop = output => n => input => {
      loop: while (true) {
        if (input.tail != null) {
          if (n > 0) {
            output = new _List2.default(input.head, output);
            n = n - 1;
            input = input.tail;
            continue loop;
          } else {
            return output;
          }
        } else {
          return output;
        }
      }
    };

    return n_1 => $var1 => (list => (0, _List.reverse)(list))(loop(new _List2.default())(n_1)($var1));
  };

  const splitAt = __exports.splitAt = function (n, list) {
    return [truncate()(n)(list), safeSkip(n, list)];
  };

  const tryTail = __exports.tryTail = function (list) {
    if (list.tail == null) {
      return null;
    } else {
      return list.tail;
    }
  };

  const tryInit = __exports.tryInit = function (list) {
    return (0, _Util.defaultArg)(tryTail((0, _List.reverse)(list)), null, list_1 => (0, _List.reverse)(list_1));
  };

  return __exports;
}({});

const _String = function (__exports) {
  const dropStart = __exports.dropStart = function (n, str) {
    if (n > str.length) {
      return "";
    } else {
      return str.substr(n);
    }
  };

  const takeStart = __exports.takeStart = function (n, str) {
    if (n > str.length) {
      return str;
    } else {
      return str.substr(0, n);
    }
  };

  const takeEnd = __exports.takeEnd = function (n, str) {
    if (n > str.length) {
      return str;
    } else {
      return str.substr(str.length - n);
    }
  };

  const trim = __exports.trim = function (str) {
    return (0, _String2.trim)(str, "both");
  };

  const trimStart = __exports.trimStart = function (str) {
    return (0, _String2.trim)(str, "start");
  };

  return __exports;
}({});

exports.String = _String;