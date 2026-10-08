export tis = {
    und: v=>undefined===v,
    nul: v=>null===v,
    nan: v=>Number.isNaN(v),
    bln: v=>'boolean'===typeof v,
    num: v=>'number'===typeof v,
    int: v=>Number.isSafeInteger(v),
    big: v=>'bigint'===typeof v,
    str: v=>'string'===typeof v,
    sym: v=>'symbol'===typeof v,
    obj: v=>null!==v && 'object'===typeof v,
    pob: v=>Object.prototype===Object.getPrototype(v),
    cal: v=>'function'===typeof v,
};


