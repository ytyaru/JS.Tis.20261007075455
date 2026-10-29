const D = {
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
};
export const tlt = new Proxy(D, {
    get(o, k, r) {
        if (!(k in o)) {throw new ReferenceError(`Undefined key: ${k}`)}
        const value = Reflect.get(o, k, r);
        return typeof value === 'function' 
            ? (...args) => Reflect.apply(value, o, args) 
            : value;
    },
    set(o, k, v, r) {throw new ReferenceError(`No assignment.`);},
});
/*
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
*/
