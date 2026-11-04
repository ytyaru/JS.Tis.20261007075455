import {tlt} from './tlt.js';
// tnm = Type Name 型ごとの名前
export const getTag = v => Object.prototype.toString.call(v).slice(8,-1);
const N = {}
for (let [k,v] of Object.entries(tlt)) {
    if ('function'===typeof v) continue;
    N[k] = getTag(v);
}
N.ref = 'Reference';
N.int = 'Integer';
N.fin = 'Finite';
N.nob = 'NonePrototypeObject';
N.pob = 'PlainObject';
N.ins = 'Instance';
N.ins = 'Instance';
N.cls = 'Class';
N.run = 'Run';
N.fn = 'Function';
N.nan = 'NaN';
export const tnm = N;
/*
export const tnm = Object.freeze({
    bln: 'Boolean',
    str: 'String',
    big: 'BigInt',
    sym: 'Symbol',
    num: 'Number',
    int: 'Integer',
    flt: 'Finite',
    ref: 'Reference',
    obj: 'Object',
    nob: 'NonePrototypeObject',
    pob: 'PlainObject',
    ary: 'Array',
    ins: 'Instance',
    cls: 'Class',
    run: 'Run',
    fn: 'Function',
    // 以下はLazyValue/LazyNewValueの代わり
//    new: (C, ...A)=>new C(...A),
    und: 'Undefined',
    nul: 'Null',
    nan: 'NaN',
});
*/
