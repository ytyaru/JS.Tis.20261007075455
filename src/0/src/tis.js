const isObj = v=>null!==v && 'object'===typeof v;
const isFn = v=>'function'===typeof v;
const isNum = v=>'number'===typeof v;
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
const getCode = v => isFn(v) ? Function.prototype.toString.call(v)
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '').trim() // コメント削除
    .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '""') // 文字列リテラル（'' , "" , ``）を空文字に置換
    .replace(/\/([^\/\n\\]|\\.)+\/[gimsuy]*/g, '//') : ''; // 正規表現リテラルを除外
isConstructor.es6 = v => /^\s*class\b/.test(getCode(v)); 
export const tis = {
    nun: v=>'und nul nan'.split(' ').some(n=>tis[n](v)),
    und: v=>undefined===v,
    nul: v=>null===v,
    nan: v=>Number.isNaN(v),

    bln: v=>'boolean'===typeof v,
    num: isNum,
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
// export const tow = v => 
//const getNumName = v => isNum(v) ? Number.isNaN(v) ? 'NaN' : Infinity===v ? 'Infinity' : -Infinity===v ? '-Infinity' : Number.isSafeInteger(v) ? 'Integer' : Number.isFinite(v) ? 'Finite' : '' ;
export const tof = v => Object.prototype.toString.call(v).slice(8, -1);
/*
// プロキシのハンドラを定義する共通関数
const createTowHandler = (targetObj) => {
    return {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);

            // 関数（判定関数）の場合：実行結果を検証してエラーを投げるラッパーを返す
            if (typeof value === 'function') {
                return (...args) => {
                    const result = value(...args);
                    if (!result) {
                        throw new TypeError(`Type mismatch for method '${String(prop)}'.`);
                    }
                    return true;
                };
            }

            // オブジェクト（ネストされたプロパティ：例: cls.es6 など）の場合：さらにProxyでラップする
            if (value !== null && typeof value === 'object') {
                return new Proxy(value, createTowHandler(value));
            }

            return value;
        }
    };
};
export const tow = new Proxy(tis, createTowHandler(tis));
*/
