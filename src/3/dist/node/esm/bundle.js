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
export {
  tis,
  tow
};
