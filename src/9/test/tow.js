// math.test.js
import { expect, test, describe } from "bun:test";
import { assertThrow } from "./assert-throw.js";

import { tis } from "../src/tis.js";
import { tow } from "../src/tow.js";

//class C {static sm() {} static *sgm() {yield 0}}
class C {
    static sm() {}
    static *sgm(){yield 0}
    static async sam() {}
    static async *sagm() {yield 0}
    m() {}
    *gm(){yield 0}
    async am() {}
    async *agm() {yield 0}
}
describe("tow", () => {
    describe('nun', () => {
        describe('true', () => {
            test.each([undefined,null,NaN].map(x=>[x]))('%p',v=>expect(tow.nun(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([false,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,Number(),false,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nun(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nun(v)));
        });
    });

    test("und", () => {
        expect(tow.und(undefined)).toBe(true);
        assertThrow(TypeError, /^Type mismatch /, ()=>tow.und(null));
    });
    describe('und', () => {
        describe('true', () => {
            test.each([undefined].map(x=>[x]))('%p',v=>expect(tow.und(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([null,NaN,false,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,Number(),false,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.und(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.und(v)));
        });
    });
    describe('nul', () => {
        describe('true', () => {
            test.each([null].map(x=>[x]))('%p',v=>expect(tow.nul(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([undefined,NaN,false,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,Number(),false,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nul(v)));
        });
    });
    describe('nan', () => {
        describe('true', () => {
            test.each([NaN].map(x=>[x]))('%p',v=>expect(tow.nan(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([undefined,null,false,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,Number(),false,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nan(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.nan(v)));
        });
    });
    describe('bln', () => {
        describe('true', () => {
            test.each([false,true,Boolean()].map(x=>[x]))('%p',v=>expect(tow.bln(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([undefined,null,NaN,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.bln(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.bln(v)));
        });
    });
    describe('num', () => {
        describe('true', () => {
            test.each([NaN,0,-1,0.1,Infinity,-Infinity,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MAX_VALUE,-Number.MAX_VALUE,Number()].map(x=>[x]))('%p',v=>expect(tow.num(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([false,true,Boolean(),undefined,null,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.num(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.num(v)));
        });
    });
    describe('fin', () => {
        describe('true', () => {
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number()].map(x=>[x]))('%p',v=>expect(tow.fin(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(v)));
            test.each([false,true,Boolean(),undefined,null,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.fin(v)));
        });
    });
    describe('int', () => {
        describe('true', () => {
            test.each([0,-1,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number()].map(x=>[x]))('%p',v=>expect(tow.int(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([0.1,Number.EPSILON,NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(v)));
            test.each([false,true,Boolean(),undefined,null,0n,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.int(v)));
        });
    });
    describe('big', () => {
        describe('true', () => {
            test.each([0n].map(x=>[x]))('%p',v=>expect(tow.big(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.big(v)));
            test.each([false,true,Boolean(),undefined,null,'',Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.big(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.big(v)));
        });
    });
    describe('str', () => {
        describe('true', () => {
            test.each(['','a','0','あ',String()].map(x=>[x]))('%p',v=>expect(tow.str(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([/^/,new RegExp('^')].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(v)));
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(v)));
            test.each([false,true,Boolean(),undefined,null,0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.str(v)));
        });
    });
    describe('sym', () => {
        describe('true', () => {
            test.each([Symbol(),Symbol.for('x')].map(x=>[x]))('%p',v=>expect(tow.sym(v)).toBe(true))
        });
        describe('throw', () => {
            test.each([/^/,new RegExp('^')].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.sym(v)));
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.sym(v)));
            test.each([false,true,Boolean(),undefined,null,'',0n].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.sym(v)));
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.sym(v)));
        });
    });
    describe('ref', () => {
        describe('true', () => {
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map,/^/,new RegExp('^')].map(x=>[x]))('%p',v=>expect(tow.ref(v)).toBe(true));
        });
        describe('throw', () => {
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ref(v)));
            test.each([false,true,Boolean(),undefined,null,'',0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ref(v)));
        });
    });
    describe('obj', () => {
        describe('true', () => {
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),/^/,new RegExp('^')].map(x=>[x]))('%p',v=>expect(tow.obj(v)).toBe(true));
        });
        describe('throw', () => {
            test.each([Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(v)));
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(v)));
            test.each([false,true,Boolean(),undefined,null,'',0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.obj(v)));
        });
    });
    describe('ary', () => {
        class A extends Array{}
        describe('(v)', () => {
            describe('true', () => {
                test.each([[],new A(),[0,'']].map(x=>[x]))('%p',v=>expect(tow.ary(v)).toBe(true));
            });
            describe('throw', () => {
                test.each([{},Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),/^/,new RegExp('^')].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([false,true,Boolean(),undefined,null,'',0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
            });
        });
        describe('(v,fn)', () => {
            describe('true', () => {
                test.each([[],[0],[0,-1]].map(x=>[x]))('%p',v=>expect(tow.ary(v,tis.int)).toBe(true));
                test.each([[],[''],['0','-1']].map(x=>[x]))('%p',v=>expect(tow.ary(v,tis.str)).toBe(true));
            });
            describe('throw', () => {
                test.each([[0],[0,-1],[0,'']].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v, tis.str)));
                test.each([{},Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),/^/,new RegExp('^')].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
                test.each([false,true,Boolean(),undefined,null,'',0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.ary(v)));
            });
        });
    });
    describe('pob', () => {
        describe('true', () => {
            test.each([{},[],Object.create(null),Object.create({}),new Boolean(),new Number(),new String(),new Map(),new C(),(new (function(){})()),/^/,new RegExp('^')].map(x=>[x]))('%p',v=>expect(tow.pob(v)).toBe(true));
        });
        describe('throw', () => {
            test.each([Map,C,function Fn(){},function FN(){},function(){},C.sm,function(){},function fN(){},function fn(){},C.sam,C.sgm,C.sagm,(function(){}).bind(null),[].map].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(v)));
            test.each([0,-1,0.1,Number.EPSILON,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number(),NaN,Infinity,-Infinity,Number.MAX_VALUE,-Number.MAX_VALUE,Number.MAX_SAFE_INTEGER+1,Number.MIN_SAFE_INTEGER-1].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(v)));
            test.each([false,true,Boolean(),undefined,null,'',0n,Symbol()].map(x=>[x]))('%p',v=>assertThrow(TypeError, /^Type mismatch /, ()=>tow.pob(v)));
        });
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

