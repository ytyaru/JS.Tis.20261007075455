var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= new WeakMap).get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  __moduleCache.set(from, entry);
  return entry;
};
var __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// src/main.js
var exports_main = {};
__export(exports_main, {
  tis: () => tis,
  tow: () => tow
});
module.exports = __toCommonJS(exports_main);

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
  ary: Array.isArray.bind(Array),
  pob: (v) => isObj(v) && Object.prototype === Object.getPrototypeOf(v),
  nob: (v) => isObj(v) && Object.getPrototypeOf(v) === null,
  ins: (v, C) => v instanceof C,
  run: isFn,
  cls: isConstructor
};

// src/tow.js
var wrapFunction = (fn, propName) => {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      if (!result) {
        throw new TypeError(`Type mismatch for method '${String(propName)}'.`);
      }
      return true;
    },
    get(target, prop, receiver) {
      const subValue = Reflect.get(target, prop, receiver);
      if (tis.run(subValue)) {
        return wrapFunction(subValue, prop);
      }
      return subValue;
    }
  });
};
var towHandler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    if (tis.run(value)) {
      return wrapFunction(value, prop);
    }
    if (tis.obj(value)) {
      return new Proxy(value, towHandler);
    }
    return value;
  }
};
var tow = new Proxy(tis, towHandler);
