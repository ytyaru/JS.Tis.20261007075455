// @bun
// src/tis.js
var isObj = (v) => v !== null && typeof v === "object";
var isRun = (v) => typeof v === "function";
var fnNms = Object.freeze({
  s: "",
  a: "Async",
  g: "Generator",
  ag: "AsyncGenerator"
});
var getFnNm = (f) => fnNms[f] ?? (() => {
  throw new TypeError(`Invalid f. Valid keys: ${Object.keys(fnNms)}`);
})();
var isFnType = (v, f) => isRun(v) && (f ? v.constructor.name === `${getFnNm(f)}Function` : true);
var isNum = (v) => typeof v === "number";
var isCls = (v) => {
  if (!isRun(v))
    return false;
  if (isFnType(v, "s"))
    return /^[A-Z]/.test(v.name);
  try {
    const TargetProxy = new Proxy(v, { construct() {
      return {};
    } });
    new TargetProxy;
    return true;
  } catch (err) {
    return false;
  }
};
var isFn = (v) => isRun(v) && !isCls(v);
Object.keys(fnNms).map((n) => isFn[n] = (v) => isFnType(v, n) && !isCls(v));
var isNatCode = (s) => /\[native code\]/.test(s);
isFn.nat = (v) => isFn(v) && isNatCode(getCode(v));
var isBnd = (v) => v.name.startsWith("bound ") && !v.hasOwnProperty("prototype");
isFn.nat.b = (v) => isFn.nat(v) && isBnd(v);
isFn.nat.nb = (v) => isFn.nat(v) && !isBnd(v);
var getCode = (v) => isRun(v) ? Function.prototype.toString.call(v).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").trim().replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '""').replace(/\/([^\/\n\\]|\\.)+\/[gimsuy]*/g, "//") : "";
var isEs6ClsCode = (s) => /^\s*class\b/.test(s);
isCls.es6 = (v) => isEs6ClsCode(getCode(v));
isCls.nat = (v) => isCls(v) && /\[native code\]/.test(getCode(v));
var isEs5ClsCode = (s) => !(isEs6ClsCode(s) || isNatCode(s));
isCls.es5 = (v) => isCls(v) && isEs5ClsCode(getCode(v));
var tis = {
  nun: (v) => "und nul nan".split(" ").some((n) => tis[n](v)),
  und: (v) => v === undefined,
  nul: (v) => v === null,
  nan: (v) => Number.isNaN(v),
  bln: (v) => typeof v === "boolean",
  num: isNum,
  fin: (v) => Number.isFinite(v) && (v <= Number.MAX_SAFE_INTEGER && Number.MIN_SAFE_INTEGER <= v),
  int: (v) => Number.isSafeInteger(v),
  big: (v) => typeof v === "bigint",
  str: (v) => typeof v === "string",
  sym: (v) => typeof v === "symbol",
  ref: (v) => isObj(v) || isRun(v),
  obj: isObj,
  ary: (v, fn) => Array.isArray(v) && (fn ? v.every((x) => fn(x)) : true),
  pob: (v) => isObj(v) && Object.prototype === Object.getPrototypeOf(v),
  nob: (v) => isObj(v) && Object.getPrototypeOf(v) === null,
  ins: (v, C) => {
    if (!isObj(v) || Array.isArray(v))
      return false;
    const proto = Object.getPrototypeOf(v);
    if (proto === null || proto === Object.prototype)
      return false;
    const ctor = proto.constructor;
    return isRun(ctor) && ctor.prototype === proto && (C ? v instanceof C : true);
  },
  run: isRun,
  cls: isCls,
  fn: isFn
};
"es6 es5 nat".split(" ").map((n) => tis.ins[n] = (v, C) => tis.ins(v, C) && tis.cls[n](v?.constructor));

// src/tow.js
function createTowFunction(validator, currentPath) {
  return function(...args) {
    if (!validator(...args)) {
      throw new TypeError(`Type mismatch for method '${currentPath}'.`);
    }
    return true;
  };
}
function mkTow(obj, currentPath = "") {
  if (typeof obj === "function") {
    const towFn = createTowFunction(obj, currentPath);
    for (const key of Object.getOwnPropertyNames(obj)) {
      if (["length", "name", "prototype", "caller", "arguments"].includes(key)) {
        continue;
      }
      const sub = obj[key];
      const subPath = currentPath ? `${currentPath}.${key}` : key;
      if (typeof sub === "function" || sub !== null && typeof sub === "object") {
        towFn[key] = mkTow(sub, subPath);
      } else {
        towFn[key] = sub;
      }
    }
    return towFn;
  } else if (obj !== null && typeof obj === "object") {
    const result = {};
    for (const key of Object.keys(obj)) {
      const sub = obj[key];
      const subPath = currentPath ? `${currentPath}.${key}` : key;
      result[key] = mkTow(sub, subPath);
    }
    return result;
  } else {
    return obj;
  }
}
var tow = mkTow(tis);
export {
  tis,
  tow
};
