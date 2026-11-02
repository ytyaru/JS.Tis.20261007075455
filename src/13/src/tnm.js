// tnm = Type Name 型ごとの名前
export const getTag = v => Object.prototype.toString.call(v).slice(8,-1);
export const tlt = Object.freeze({
    bln: false,
    str: '',
    big: 0n,
    sym: Symbol(),
    num: 0,
    int: 0,
    flt: 0,
    ref: {},
    obj: {},
    nob: Object.create(null),
    pob: {},
    ary: [],
    ins: null,
    cls: null,
    run: null,
    fn: null,
    // 以下はLazyValue/LazyNewValueの代わり
    new: (C, ...A)=>new C(...A),
});
