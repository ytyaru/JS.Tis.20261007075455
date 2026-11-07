/*
const D = [
    {s:'nun', l:'NullUndefinedNaN', v:null},
    {s:'und', l:'Undefined', v:undefined},
    {s:'nul', l:'Null', v:null},
    {s:'nan', l:'NaN', v:NaN},
    {s:'bln', l:'Boolean', v:false},
    {s:'str', l:'String', v:''},
    {s:'big', l:'BigInt', v:0n},
    {s:'sym', l:'Symbol', v:Symbol()},
    {s:'num', l:'Number', v:0},
    {s:'int', l:'Integer', v:0},
    {s:'fin', l:'Finite', v:0},
    {s:'ref', l:'Reference', v:null},
    {s:'obj', l:'Object', v:{}},
    {s:'nob', l:'NonePrototypeObject', v:Object.create(null)},
    {s:'pob', l:'PlainObject', v:{}},
    {s:'ary', l:'Array', v:[]},
    {s:'ins', l:'Instance', v:null},
    {s:'cls', l:'Class', v:null},
    {s:'run', l:'Run', v:null},
    {s:'fn',  l:'Function', v:null},
];
*/
const D = [
    {s:'nun', l:'NullUndefinedNaN', v:null},
    {s:'und', l:'Undefined', v:undefined},
    {s:'nul', l:'Null', v:null},
    {s:'nan', l:'NaN', v:NaN},
    {s:'bln', l:'Boolean', v:false, f:Boolean},
    {s:'str', l:'String', v:'', f:String},
    {s:'big', l:'BigInt', v:0n, f:BigInt},
    {s:'sym', l:'Symbol', v:Symbol(), f:Symbol},
    {s:'num', l:'Number', v:0, f:Number},
    {s:'int', l:'Integer', v:0, f:Number.isInteger},
    {s:'fin', l:'Finite', v:0, f:Number.isFinite},
    {s:'ref', l:'Reference', v:null},
    {s:'obj', l:'Object', v:{}, f:Object},
    {s:'nob', l:'NonePrototypeObject', v:Object.create(null)},
    {s:'pob', l:'PlainObject', v:{}},
    {s:'ary', l:'Array', v:[], f:Array},
    {s:'ins', l:'Instance', v:null},
    {s:'cls', l:'Class', v:null},
    {s:'run', l:'Run', v:null},
    {s:'fn',  l:'Function', v:null, f:Function},
];
const tis = {};
const tow = {};
const tnm = {};
const tlt = {};
const tid = {};
// tis,tow
// tnm,tlt
for (let o of D) {
    const {s,l,v} = o;
    tis[s] = ;
    tow[s] = ;
    tnm[s] = l;
    tlt[s] = v;
    if ('f' in o) {tid[s] = o.f}
}

