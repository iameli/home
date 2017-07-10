"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nonempty = undefined;
exports.fromList = fromList;
exports.fromListUnsafe = fromListUnsafe;
exports.singleton = singleton;
exports.cons = cons;
exports.snoc = snoc;
exports.append = append;
exports.head = head;
exports.tail = tail;
exports.length = length;
exports.tryFind = tryFind;
exports.toList = toList;
exports.rev = rev;
exports.map = map;
exports.mapHead = mapHead;
exports.mapTail = mapTail;
exports.mapInit = mapInit;
exports.replaceHead = replaceHead;
exports.collect = collect;
exports.span = span;
exports.splitAfter = splitAfter;
exports.unfold = unfold;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = require("fable-core/umd/Util");

var _List = require("fable-core/umd/List");

var _List2 = _interopRequireDefault(_List);

var _Seq = require("fable-core/umd/Seq");

var _Extensions = require("./Extensions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Nonempty {
  constructor(caseName, fields) {
    this.Case = caseName;
    this.Fields = fields;
  }

  [_Symbol3.default.reflection]() {
    return {
      type: "Nonempty.Nonempty",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: {
        Nonempty: [(0, _Util.GenericParam)("T"), (0, _Util.makeGeneric)(_List2.default, {
          T: (0, _Util.GenericParam)("T")
        })]
      }
    };
  }

  Equals(other) {
    return (0, _Util.equalsUnions)(this, other);
  }

  CompareTo(other) {
    return (0, _Util.compareUnions)(this, other);
  }

  static op_Addition(a, b) {
    return append(a, b);
  }

}

exports.Nonempty = Nonempty;
(0, _Symbol2.setType)("Nonempty.Nonempty", Nonempty);

function fromList(list) {
  if (list.tail != null) {
    return new Nonempty("Nonempty", [list.head, list.tail]);
  } else {
    return null;
  }
}

function fromListUnsafe(list) {
  return new Nonempty("Nonempty", [list.head, list.tail]);
}

function singleton(head) {
  return new Nonempty("Nonempty", [head, new _List2.default()]);
}

function cons(head, neList) {
  return new Nonempty("Nonempty", [head, toList(neList)]);
}

function snoc(last, _arg1) {
  return new Nonempty("Nonempty", [_arg1.Fields[0], (0, _List.append)(_arg1.Fields[1], (0, _List.ofArray)([last]))]);
}

function append(_arg2, b) {
  return new Nonempty("Nonempty", [_arg2.Fields[0], (0, _List.append)(_arg2.Fields[1], toList(b))]);
}

function head(_arg3) {
  return _arg3.Fields[0];
}

function tail(_arg4) {
  return _arg4.Fields[1];
}

function length() {
  return $var14 => (() => {
    const x = 1;
    return y => x + y;
  })()(($var13 => tail($var13).length)($var14));
}

function tryFind(predicate) {
  return $var15 => (list => (0, _Seq.tryFind)(predicate, list))((arg00_ => toList(arg00_))($var15));
}

function toList(_arg5) {
  return new _List2.default(_arg5.Fields[0], _arg5.Fields[1]);
}

function rev() {
  return $var17 => (list => fromListUnsafe(list))(($var16 => (0, _List.reverse)(toList($var16)))($var17));
}

function map(fn, _arg6) {
  return new Nonempty("Nonempty", [fn(_arg6.Fields[0]), (0, _List.map)(fn, _arg6.Fields[1])]);
}

function mapHead(fn, _arg7) {
  return new Nonempty("Nonempty", [fn(_arg7.Fields[0]), _arg7.Fields[1]]);
}

function mapTail(fn, _arg8) {
  return new Nonempty("Nonempty", [_arg8.Fields[0], (0, _List.map)(fn, _arg8.Fields[1])]);
}

function mapInit(fn) {
  return $var19 => rev()(($var18 => (arg10_ => mapTail(fn, arg10_))(rev()($var18)))($var19));
}

function replaceHead(newHead) {
  const fn = _arg1 => {
    return newHead;
  };

  return arg10_ => mapHead(fn, arg10_);
}

function collect(fn, neList) {
  const loop = output => input => {
    loop: while (true) {
      if (input.tail == null) {
        return output;
      } else {
        output = Nonempty.op_Addition(fn(input.head), output);
        input = input.tail;
        continue loop;
      }
    }
  };

  return (_arg1 => loop(fn(_arg1.Fields[0]))(_arg1.Fields[1]))(rev()(neList));
}

function span(predicate) {
  const loop = output => maybeRemaining => {
    loop: while (true) {
      if (maybeRemaining != null) {
        const tail_1 = maybeRemaining.Fields[1];
        const head_1 = maybeRemaining.Fields[0];

        if (predicate(head_1)) {
          output = new _List2.default(head_1, output);
          maybeRemaining = fromList(tail_1);
          continue loop;
        } else {
          return (0, _Util.defaultArg)(fromList((0, _List.reverse)(output)), null, o => [o, maybeRemaining]);
        }
      } else {
        return (0, _Util.defaultArg)(fromList((0, _List.reverse)(output)), null, o_1 => [o_1, maybeRemaining]);
      }
    }
  };

  return $var20 => loop(new _List2.default())((arg0 => arg0)($var20));
}

function splitAfter(predicate) {
  const loop = output => _arg9 => {
    loop: while (true) {
      const maybeNextList = fromList(_arg9.Fields[1]);

      if (predicate(_arg9.Fields[0])) {
        return [new Nonempty("Nonempty", [_arg9.Fields[0], output]), maybeNextList];
      } else if (maybeNextList == null) {
        return [new Nonempty("Nonempty", [_arg9.Fields[0], output]), null];
      } else {
        output = new _List2.default(_arg9.Fields[0], output);
        _arg9 = maybeNextList;
        continue loop;
      }
    }
  };

  return $var21 => (() => {
    const f = rev();
    return tupledArg => _Extensions.Tuple.mapFirst(f, tupledArg[0], tupledArg[1]);
  })()(loop(new _List2.default())($var21));
}

function unfold(fn) {
  const loop = output => input => {
    loop: while (true) {
      const matchValue = fn(input);

      if (matchValue[1] == null) {
        return new Nonempty("Nonempty", [matchValue[0], output]);
      } else {
        const nextInput = matchValue[1];
        output = new _List2.default(matchValue[0], output);
        input = nextInput;
        continue loop;
      }
    }
  };

  return $var22 => rev()(loop(new _List2.default())($var22));
}