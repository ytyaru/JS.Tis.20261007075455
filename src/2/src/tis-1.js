const isObj = v=>null!==v && 'object'===typeof v;
const isFn = v=>'function'===typeof v;
const isNum = v=>'number'===typeof v;
//const isSafeNum = v=> isNum(v) && (v<=Number.MAX_SAFE_INTEGER && Number.MIN_SAFE_INTEGER<=v);
//const isSafeNum = v=> (v<=Number.MAX_SAFE_INTEGER && Number.MIN_SAFE_INTEGER<=v);
/*
const isConstructor = v=> {
    if (typeof v !== 'function') return false;
    // prototype プロパティがあり、かつその constructor が自身を指しているか
    // (ただし、ジェネレーター関数などもprototypeを持つため、これだけでは完全ではありません)
    return v.prototype !== undefined;
}
*/
const isConstructor = v => {
    if (typeof v !== 'function') return false;
    try {
        // 中身を実行させないために、ダミーのProxyを挟んでnewを試みる
        const TargetProxy = new Proxy(v, {
            construct() { return {}; }
        });
        new TargetProxy();
        return true;
    } catch (err) {
        // Arrow functionやメソッド、ビルトインの一部(parseIntなど)はここでエラーになる
        return false;
    }
}

export const tis = {
    nun: v=>'und nul nan'.split(' ').some(n=>tis[n](v)),
    und: v=>undefined===v,
    nul: v=>null===v,
    nan: v=>Number.isNaN(v),
    bln: v=>'boolean'===typeof v,
    num: isNum,
//    dum: v=>isNum(v) && !Number.isSafeInteger(v), // Danger Number (NaN, Infinity, 浮動小数点数, SAFE超過)
    fin: v=>Number.isFinite(v) && (v<=Number.MAX_SAFE_INTEGER && Number.MIN_SAFE_INTEGER<=v),
    int: v=>Number.isSafeInteger(v),
    big: v=>'bigint'===typeof v,
    str: v=>'string'===typeof v,
    sym: v=>'symbol'===typeof v,

    ref: v=>isObj(v) || isFn(v),
    obj: isObj,
    ary: Array.isArray.bind(Array),
    pob: v=>isObj(v) && Object.prototype===Object.getPrototypeOf(v), // Plain Object
    nob: v=>isObj(v) && null===Object.getPrototypeOf(v),             // None Prototype Object
    ins: (v,C)=>v instanceof C,
    run: isFn,
    cls: isConstructor,
};
export const tof = v => Object.prototype.toString.call(v).slice(8, -1);

