// math.test.js
import { expect, test, describe } from "bun:test";
import { assertThrow } from "./assert-throw.js";

import { tow } from "../src/tow.js";

class C {static sm() {} static *sgm() {yield 0}}
describe("tow", () => {
    /*
    test("nun", () => {
        expect(tow.nun(undefined)).toBe(true);
        expect(tow.nun(null)).toBe(true);
        expect(tow.nun(NaN)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nun(0));
//        expect(tow.nun(0)).toBe(false);
    });

    test("und", () => {
        expect(tow.und(undefined)).toBe(true);
        //expect(tow.und(null)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.und(null));
    });
    test("nul", () => {
        expect(tow.nul(null)).toBe(true);
        //expect(tow.nul(undefined)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(undefined));
    });
    test("nan", () => {
        expect(tow.nul(null)).toBe(true);
        //expect(tow.nul(undefined)).toBe(false);
        expect().toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(undefined));
    });
    test("bln", () => {
        expect(tow.bln(true)).toBe(true);
        expect(tow.bln(false)).toBe(true);
        //expect(tow.bln(0)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.bln(0));

        expect(tow.bln(Boolean())).toBe(true);
        expect(tow.bln(new Boolean())).toBe(false);
    });
    test("num", () => {
        expect(tow.num(NaN)).toBe(true);
        expect(tow.num(Infinity)).toBe(true);
        expect(tow.num(-Infinity)).toBe(true);
        expect(tow.num(Number.EPSILON)).toBe(true);
        expect(tow.num(Number.MAX_VALUE)).toBe(true);
        expect(tow.num(-Number.MAX_VALUE)).toBe(true);
        expect(tow.num(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tow.num(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tow.num(0)).toBe(true);
        //expect(tow.num('0')).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.num('0'));

        expect(tow.num(Number())).toBe(true);
        //expect(tow.num(new Number())).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.num(new Number()));
    });
    test("fin", () => {
//        expect(tow.fin(NaN)).toBe(false);
//        expect(tow.fin(Infinity)).toBe(false);
//        expect(tow.fin(-Infinity)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(NaN));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(Infinity));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(-Infinity));

        expect(tow.fin(Number.EPSILON)).toBe(true);
//        expect(tow.fin(Number.MAX_VALUE)).toBe(false);
//        expect(tow.fin(-Number.MAX_VALUE)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(Number.MAX_VALUE));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(-Number.MAX_VALUE));
        expect(tow.fin(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tow.fin(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tow.fin(0)).toBe(true);
        //expect(tow.fin('0')).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin('0'));

        expect(tow.fin(Number())).toBe(true);
        //expect(tow.fin(new Number())).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(new Number()));
    });
    test("int", () => {
        expect(tow.int(NaN)).toBe(false);
        expect(tow.int(Infinity)).toBe(false);
        expect(tow.int(-Infinity)).toBe(false);
        expect(tow.int(Number.EPSILON)).toBe(false);
        expect(tow.int(Number.MAX_VALUE)).toBe(false);
        expect(tow.int(-Number.MAX_VALUE)).toBe(false);
        expect(tow.int(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tow.int(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tow.int(0)).toBe(true);
        expect(tow.int('0')).toBe(false);

        expect(tow.int(Number())).toBe(true);
        expect(tow.int(new Number())).toBe(false);
    });
    test("big", () => {
        expect(tow.big(0n)).toBe(true);
        expect(tow.big(0)).toBe(false);
    });
    test("str", () => {
        expect(tow.str('0')).toBe(true);
        expect(tow.str(0)).toBe(false);

        expect(tow.str(String('a'))).toBe(true);
        expect(tow.str(new String('a'))).toBe(false);
    });
    test("sym", () => {
        expect(tow.sym(Symbol())).toBe(true);
        expect(tow.sym(Symbol.for('symbol'))).toBe(true);
        expect(tow.sym('symbol')).toBe(false);
    });

    test("ref", () => {
        expect(tow.ref({})).toBe(true);
        expect(tow.ref([])).toBe(true);
        expect(tow.ref(Object.create(null))).toBe(true);
        expect(tow.ref(new Boolean())).toBe(true);
        expect(tow.ref(new Number())).toBe(true);
        expect(tow.ref(new String())).toBe(true);

        expect(tow.ref(Map)).toBe(true);
        expect(tow.ref(new Map())).toBe(true);
        expect(tow.ref(C)).toBe(true);
        expect(tow.ref(new C())).toBe(true);

        expect(tow.ref([].map)).toBe(true);
        expect(tow.ref(()=>{})).toBe(true);
        expect(tow.ref(function(){})).toBe(true);
        expect(tow.ref(C.sm)).toBe(true);
        expect(tow.ref(C.sgm)).toBe(true);
        expect(tow.ref((new (function(){})()))).toBe(true);
    });
    test("obj", () => {
        expect(tow.obj({})).toBe(true);
        expect(tow.obj([])).toBe(true);
        expect(tow.obj(Object.create(null))).toBe(true);
        expect(tow.obj(new Boolean())).toBe(true);
        expect(tow.obj(new Number())).toBe(true);
        expect(tow.obj(new String())).toBe(true);

        expect(tow.obj(new Map())).toBe(true);
        expect(tow.obj(new C())).toBe(true);
        expect(tow.obj((new (function(){})()))).toBe(true);

        expect(tow.obj(Map)).toBe(false);
        expect(tow.obj(C)).toBe(false);
        expect(tow.obj([].map)).toBe(false);
        expect(tow.obj(()=>{})).toBe(false);
        expect(tow.obj(function(){})).toBe(false);
        expect(tow.obj(C.sm)).toBe(false);
        expect(tow.obj(C.sgm)).toBe(false);
    });
    test("ary", () => {
        expect(tow.ary([])).toBe(true);

        expect(tow.ary({})).toBe(false);
        expect(tow.ary(Object.create(null))).toBe(false);
        expect(tow.ary(new Boolean())).toBe(false);
        expect(tow.ary(new Number())).toBe(false);
        expect(tow.ary(new String())).toBe(false);

        expect(tow.ary(new Map())).toBe(false);
        expect(tow.ary(new C())).toBe(false);
        expect(tow.ary((new (function(){})()))).toBe(false);

        expect(tow.ary(Map)).toBe(false);
        expect(tow.ary(C)).toBe(false);
        expect(tow.ary([].map)).toBe(false);
        expect(tow.ary(()=>{})).toBe(false);
        expect(tow.ary(function(){})).toBe(false);
        expect(tow.ary(C.sm)).toBe(false);
        expect(tow.ary(C.sgm)).toBe(false);
    });
    test("pob", () => {
        expect(tow.pob({})).toBe(true);

        expect(tow.pob([])).toBe(false);
        expect(tow.pob(Object.create(null))).toBe(false);
        expect(tow.pob(new Boolean())).toBe(false);
        expect(tow.pob(new Number())).toBe(false);
        expect(tow.pob(new String())).toBe(false);

        expect(tow.pob(new Map())).toBe(false);
        expect(tow.pob(new C())).toBe(false);
        expect(tow.pob((new (function(){})()))).toBe(false);

        expect(tow.pob(Map)).toBe(false);
        expect(tow.pob(C)).toBe(false);
        expect(tow.pob([].map)).toBe(false);
        expect(tow.pob(()=>{})).toBe(false);
        expect(tow.pob(function(){})).toBe(false);
        expect(tow.pob(C.sm)).toBe(false);
        expect(tow.pob(C.sgm)).toBe(false);
    });
    test("nob", () => {
        expect(tow.nob(Object.create(null))).toBe(true);

        expect(tow.nob({})).toBe(false);
        expect(tow.nob([])).toBe(false);
        expect(tow.nob(new Boolean())).toBe(false);
        expect(tow.nob(new Number())).toBe(false);
        expect(tow.nob(new String())).toBe(false);

        expect(tow.nob(new Map())).toBe(false);
        expect(tow.nob(new C())).toBe(false);
        expect(tow.nob((new (function(){})()))).toBe(false);

        expect(tow.nob(Map)).toBe(false);
        expect(tow.nob(C)).toBe(false);
        expect(tow.nob([].map)).toBe(false);
        expect(tow.nob(()=>{})).toBe(false);
        expect(tow.nob(function(){})).toBe(false);
        expect(tow.nob(C.sm)).toBe(false);
        expect(tow.nob(C.sgm)).toBe(false);
    });
    test("ins", () => {
        expect(tow.ins({}, Object)).toBe(true);
        expect(tow.ins([], Array)).toBe(true);
        expect(tow.ins(new Boolean(), Boolean)).toBe(true);
        expect(tow.ins(new Number(), Number)).toBe(true);
        expect(tow.ins(new String(), String)).toBe(true);

        expect(tow.ins(new Map(), Map)).toBe(true);
        expect(tow.ins(new C(), C)).toBe(true);
        const MyEs5Cls = function(){};
        expect(tow.ins(new MyEs5Cls(), MyEs5Cls)).toBe(true);

        expect(tow.ins([].map, Function)).toBe(true);
        expect(tow.ins(()=>{}, Function)).toBe(true);
        expect(tow.ins(function(){}, Function)).toBe(true);
        expect(tow.ins(C.sm, Function)).toBe(true);
        expect(tow.ins(C.sgm, Function)).toBe(true);

        // 非直感的。ObjectなのにPrototypeがないだけでObjectのインスタンスでないことになってしまう！
        //expect(tow.ins(Object.create(null), Object)).toBe(true); // 
        expect(tow.ins(Object.create(null), Object)).toBe(false); // 

        expect(tow.ins(Map, Map)).toBe(false);
        expect(tow.ins(C, C)).toBe(false);
    });
    test("run", () => {
        expect(tow.run([].map)).toBe(true);
        expect(tow.run(()=>{})).toBe(true);
        expect(tow.run(function(){})).toBe(true);
        expect(tow.run(C.sm)).toBe(true);
        expect(tow.run(C.sgm)).toBe(true);

        expect(tow.run(Map)).toBe(true);
        expect(tow.run(C)).toBe(true);

        expect(tow.run({})).toBe(false);
        expect(tow.run([])).toBe(false);
        expect(tow.run(new Boolean())).toBe(false);
        expect(tow.run(new Number())).toBe(false);
        expect(tow.run(new String())).toBe(false);

        expect(tow.run(new Map())).toBe(false);
        expect(tow.run(new C())).toBe(false);
        const MyEs5Cls = function(){};
        expect(tow.run(new MyEs5Cls())).toBe(false);
        expect(tow.run(Object.create(null))).toBe(false); // 
    });
    test("cls", () => {
        expect(tow.cls(Map)).toBe(true);
        expect(tow.cls(C)).toBe(true);
        // 曖昧。非直感的。ES5クラスもどきで使うとはいえ以下がtrueになってしまう。
        expect(tow.cls(function(){})).toBe(true);

        expect(tow.cls([].map)).toBe(false);
        expect(tow.cls(()=>{})).toBe(false);
        expect(tow.cls(C.sm)).toBe(false);
        expect(tow.cls(C.sgm)).toBe(false);

        expect(tow.cls({})).toBe(false);
        expect(tow.cls([])).toBe(false);
        expect(tow.cls(new Boolean())).toBe(false);
        expect(tow.cls(new Number())).toBe(false);
        expect(tow.cls(new String())).toBe(false);

        expect(tow.cls(new Map())).toBe(false);
        expect(tow.cls(new C())).toBe(false);
        const MyEs5Cls = function(){};
        expect(tow.cls(new MyEs5Cls())).toBe(false);
        expect(tow.cls(Object.create(null))).toBe(false); // 
    });
    */
    test("cls.es6", () => {
        expect(tow.cls.es6(C)).toBe(true);

        // ES5クラスもどきになりうるfunctionは明確に対象外
        //expect(tow.cls.es6(function(){})).toBe(false);
        // Native Class は明確に対象外
        //expect(tow.cls.es6(Map)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(function(){}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Map));

//        expect(tow.cls.es6([].map)).toBe(false);
//        expect(tow.cls.es6(()=>{})).toBe(false);
//        expect(tow.cls.es6(C.sm)).toBe(false);
//        expect(tow.cls.es6(C.sgm)).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(C.sgm));

//        expect(tow.cls.es6({})).toBe(false);
//        expect(tow.cls.es6([])).toBe(false);
//        expect(tow.cls.es6(new Boolean())).toBe(false);
//        expect(tow.cls.es6(new Number())).toBe(false);
//        expect(tow.cls.es6(new String())).toBe(false);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new String()));

//        expect(tow.cls.es6(new Map())).toBe(false);
//        expect(tow.cls.es6(new C())).toBe(false);
//        const MyEs5Cls = function(){};
//        expect(tow.cls.es6(new MyEs5Cls())).toBe(false);
//        expect(tow.cls.es6(Object.create(null))).toBe(false); // 
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new C()));
        const MyEs5Cls = function(){};
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new MyEs5Cls()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Object.create(null)));

        //expect(tow.cls.es6(Object.create(null))).toBe(false); // 
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Object.create(null)));
    });
});

