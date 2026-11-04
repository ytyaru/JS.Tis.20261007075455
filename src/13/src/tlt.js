// tlt = Type Default Value 型ごとの初期値
export const tlt = Object.freeze({
    bln: false,
    str: '',
    big: 0n,
    sym: Symbol(),
    num: 0,
    int: 0,
    fin: 0,
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
    // 以下は型と定数が合致した特殊形
    und: undefined,
    nul: null,
    nan: NaN,
});
