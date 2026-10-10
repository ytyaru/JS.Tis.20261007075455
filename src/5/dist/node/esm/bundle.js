// src/tis.js
var isObj = (v) => v !== null && typeof v === "object";
var isFn = (v) => typeof v === "function";
var isNum = (v) => typeof v === "number";
var isConstructor = (v) => {
  if (typeof v !== "function")
    return false;
  try {
    const TargetProxy = new Proxy(v, {
      construct() {
        return {};
      }
    });
    new TargetProxy;
    return true;
  } catch (err) {
    return false;
  }
};
var getCode = (v) => isFn(v) ? Function.prototype.toString.call(v).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").trim().replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '""').replace(/\/([^\/\n\\]|\\.)+\/[gimsuy]*/g, "//") : "";
isConstructor.es6 = (v) => /^\s*class\b/.test(getCode(v));
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
  ref: (v) => isObj(v) || isFn(v),
  obj: isObj,
  ary: (v, fn) => Array.isArray(v) && (fn ? v.every((x) => fn(x)) : true),
  pob: (v) => isObj(v) && Object.prototype === Object.getPrototypeOf(v),
  nob: (v) => isObj(v) && Object.getPrototypeOf(v) === null,
  ins: (v, C) => v instanceof C,
  run: isFn,
  cls: isConstructor
};

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
