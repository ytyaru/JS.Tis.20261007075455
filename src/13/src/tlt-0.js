export const tlt = {
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
    // 以下はLazyValue/LazyNewValueのいずれかであるべき。またはNullableにするならValueでもOK。
    ins: null,
    new: (C, ...A)=>new C(...A),
    cls: null,
    run: null,
    fn: null,
};

