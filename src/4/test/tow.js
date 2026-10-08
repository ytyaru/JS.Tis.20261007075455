// math.test.js
import { expect, test, describe } from "bun:test";
import { assertThrow } from "./assert-throw.js";

import { tis } from "../src/tis.js";
import { tow } from "../src/tow.js";

class C {static sm() {} static *sgm() {yield 0}}
describe("tow", () => {
    test("nun", () => {
        expect(tow.nun(undefined)).toBe(true);
        expect(tow.nun(null)).toBe(true);
        expect(tow.nun(NaN)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nun(0));
    });

    test("und", () => {
        expect(tow.und(undefined)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.und(null));
    });
    test("nul", () => {
        expect(tow.nul(null)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(undefined));
    });
    test("nan", () => {
        expect(tow.nul(null)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(undefined));
    });
    test("bln", () => {
        expect(tow.bln(true)).toBe(true);
        expect(tow.bln(false)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.bln(0));

        expect(tow.bln(Boolean())).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.bln(new Boolean()));
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
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.num('0'));

        expect(tow.num(Number())).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.num(new Number()));
    });
    test("fin", () => {
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(NaN));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(Infinity));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(-Infinity));

        expect(tow.fin(Number.EPSILON)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(Number.MAX_VALUE));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(-Number.MAX_VALUE));
        expect(tow.fin(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tow.fin(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tow.fin(0)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin('0'));

        expect(tow.fin(Number())).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(new Number()));
    });
    test("int", () => {
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(NaN));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(Infinity));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(-Infinity));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(Number.EPSILON));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(Number.MAX_VALUE));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(-Number.MAX_VALUE));

        expect(tow.int(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tow.int(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tow.int(0)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int('0'));

        expect(tow.int(Number())).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(new Number()));
    });
    test("big", () => {
        expect(tow.big(0n)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.big(0));
    });
    test("str", () => {
        expect(tow.str('0')).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(0));

        expect(tow.str(String('a'))).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(new String('a')));
    });
    test("sym", () => {
        expect(tow.sym(Symbol())).toBe(true);
        expect(tow.sym(Symbol.for('symbol'))).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.sym('symbol'));
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

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ref(0));
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

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(Map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(C));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(function(){}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(C.sgm));
    });
    test("ary", () => {
        expect(tow.ary([])).toBe(true);

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(Object.create(null)));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(new String()));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(new C()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary((new (function(){})())));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(Map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(C));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(function(){}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(C.sgm));
    });
    test("ary(v,tis.int)", () => {
        expect(tow.ary([],tis.int)).toBe(true);
        expect(tow.ary([0],tis.int)).toBe(true);
        expect(tow.ary([0,1],tis.int)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary([0],tis.str));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary([0,'0'],tis.int));
    });

    test("pob", () => {
        expect(tow.pob({})).toBe(true);

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(Object.create(null)));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(new String()));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(new C()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob((new (function(){})())));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(Map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(C));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(function(){}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(C.sgm));
    });
    test("nob", () => {
        expect(tow.nob(Object.create(null))).toBe(true);

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(new String()));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(new C()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob((new (function(){})())));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(Map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(C));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(function(){}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.nob(C.sgm));
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
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ins(Object.create(null), Object));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ins(Map, Map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.ins(C, C));
    });
    test("run", () => {
        expect(tow.run([].map)).toBe(true);
        expect(tow.run(()=>{})).toBe(true);
        expect(tow.run(function(){})).toBe(true);
        expect(tow.run(C.sm)).toBe(true);
        expect(tow.run(C.sgm)).toBe(true);

        expect(tow.run(Map)).toBe(true);
        expect(tow.run(C)).toBe(true);

        const MyEs5Cls = function(){};

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new String()));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new C()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(new MyEs5Cls()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.run(Object.create(null)));
    });
    test("cls", () => {
        expect(tow.cls(Map)).toBe(true);
        expect(tow.cls(C)).toBe(true);
        // 曖昧。非直感的。ES5クラスもどきで使うとはいえ以下がtrueになってしまう。
        expect(tow.cls(function(){})).toBe(true);

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(C.sgm));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new String()));

        const MyEs5Cls = function(){};
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new C()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(new MyEs5Cls()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls(Object.create(null)));
    });
    test("cls.es6", () => {
        expect(tow.cls.es6(C)).toBe(true);

        // ES5クラスもどきになりうるfunctionは明確に対象外
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(function(){}));
        // Native Class は明確に対象外
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Map));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6([].map));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(()=>{}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(C.sm));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(C.sgm));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6({}));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6([]));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Boolean()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Number()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new String()));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new Map()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new C()));
        const MyEs5Cls = function(){};
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(new MyEs5Cls()));
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Object.create(null)));

        assertThrow(TypeError, /^Type mismatch /, ()=>tow.cls.es6(Object.create(null)));
    });
});

