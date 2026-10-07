// math.test.js
import { expect, test, describe } from "bun:test";
import { tis, tof } from "../src/tis.js";

class C {}
describe("tis", () => {
    test("nun", () => {
        expect(tis.nun(undefined)).toBe(true);
        expect(tis.nun(null)).toBe(true);
        expect(tis.nun(NaN)).toBe(true);
        expect(tis.nun(0)).toBe(false);
    });

    test("und", () => {
        expect(tis.und(undefined)).toBe(true);
        expect(tis.und(null)).toBe(false);
    });
    test("nul", () => {
        expect(tis.nul(null)).toBe(true);
        expect(tis.nul(undefined)).toBe(false);
    });
    test("nan", () => {
        expect(tis.nul(null)).toBe(true);
        expect(tis.nul(undefined)).toBe(false);
    });
    test("bln", () => {
        expect(tis.bln(true)).toBe(true);
        expect(tis.bln(false)).toBe(true);
        expect(tis.bln(0)).toBe(false);

        expect(tis.bln(Boolean())).toBe(true);
        expect(tis.bln(new Boolean())).toBe(false);
    });
    test("num", () => {
        expect(tis.num(NaN)).toBe(true);
        expect(tis.num(Infinity)).toBe(true);
        expect(tis.num(-Infinity)).toBe(true);
        expect(tis.num(Number.EPSILON)).toBe(true);
        expect(tis.num(Number.MAX_VALUE)).toBe(true);
        expect(tis.num(-Number.MAX_VALUE)).toBe(true);
        expect(tis.num(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tis.num(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tis.num(0)).toBe(true);
        expect(tis.num('0')).toBe(false);

        expect(tis.num(Number())).toBe(true);
        expect(tis.num(new Number())).toBe(false);
    });
    test("fin", () => {
        expect(tis.fin(NaN)).toBe(false);
        expect(tis.fin(Infinity)).toBe(false);
        expect(tis.fin(-Infinity)).toBe(false);
        expect(tis.fin(Number.EPSILON)).toBe(true);
        expect(tis.fin(Number.MAX_VALUE)).toBe(false);
        expect(tis.fin(-Number.MAX_VALUE)).toBe(false);
        expect(tis.fin(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tis.fin(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tis.fin(0)).toBe(true);
        expect(tis.fin('0')).toBe(false);

        expect(tis.fin(Number())).toBe(true);
        expect(tis.fin(new Number())).toBe(false);
    });
    test("int", () => {
        expect(tis.int(NaN)).toBe(false);
        expect(tis.int(Infinity)).toBe(false);
        expect(tis.int(-Infinity)).toBe(false);
        expect(tis.int(Number.EPSILON)).toBe(false);
        expect(tis.int(Number.MAX_VALUE)).toBe(false);
        expect(tis.int(-Number.MAX_VALUE)).toBe(false);
        expect(tis.int(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(tis.int(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(tis.int(0)).toBe(true);
        expect(tis.int('0')).toBe(false);

        expect(tis.int(Number())).toBe(true);
        expect(tis.int(new Number())).toBe(false);
    });
    test("big", () => {
        expect(tis.big(0n)).toBe(true);
        expect(tis.big(0)).toBe(false);
    });
    test("str", () => {
        expect(tis.str('0')).toBe(true);
        expect(tis.str(0)).toBe(false);

        expect(tis.str(String('a'))).toBe(true);
        expect(tis.str(new String('a'))).toBe(false);
    });
    test("sym", () => {
        expect(tis.sym(Symbol())).toBe(true);
        expect(tis.sym(Symbol.for('symbol'))).toBe(true);
        expect(tis.sym('symbol')).toBe(false);
    });

    test("ref", () => {
        expect(tis.ref({})).toBe(true);
        expect(tis.ref([])).toBe(true);
        expect(tis.ref(Object.create(null))).toBe(true);
        expect(tis.ref(new Boolean())).toBe(true);
        expect(tis.ref(new Number())).toBe(true);
        expect(tis.ref(new String())).toBe(true);

        expect(tis.ref(Map)).toBe(true);
        expect(tis.ref(new Map())).toBe(true);
        expect(tis.ref(C)).toBe(true);
        expect(tis.ref(new C())).toBe(true);

        expect(tis.ref([].map)).toBe(true);
        expect(tis.ref(()=>{})).toBe(true);
        expect(tis.ref(function(){})).toBe(true);
        expect(tis.ref((new (function(){})()))).toBe(true);
    });
    test("obj", () => {
        expect(tis.obj({})).toBe(true);
        expect(tis.obj([])).toBe(true);
        expect(tis.obj(Object.create(null))).toBe(true);
        expect(tis.obj(new Boolean())).toBe(true);
        expect(tis.obj(new Number())).toBe(true);
        expect(tis.obj(new String())).toBe(true);

        expect(tis.obj(new Map())).toBe(true);
        expect(tis.obj(new C())).toBe(true);
        expect(tis.obj((new (function(){})()))).toBe(true);

        expect(tis.obj(Map)).toBe(false);
        expect(tis.obj(C)).toBe(false);
        expect(tis.obj([].map)).toBe(false);
        expect(tis.obj(()=>{})).toBe(false);
        expect(tis.obj(function(){})).toBe(false);
    });
    test("ary", () => {
        expect(tis.ary([])).toBe(true);

        expect(tis.ary({})).toBe(false);
        expect(tis.ary(Object.create(null))).toBe(false);
        expect(tis.ary(new Boolean())).toBe(false);
        expect(tis.ary(new Number())).toBe(false);
        expect(tis.ary(new String())).toBe(false);

        expect(tis.ary(new Map())).toBe(false);
        expect(tis.ary(new C())).toBe(false);
        expect(tis.ary((new (function(){})()))).toBe(false);

        expect(tis.ary(Map)).toBe(false);
        expect(tis.ary(C)).toBe(false);
        expect(tis.ary([].map)).toBe(false);
        expect(tis.ary(()=>{})).toBe(false);
        expect(tis.ary(function(){})).toBe(false);
    });
    test("pob", () => {
        expect(tis.pob({})).toBe(true);

        expect(tis.pob([])).toBe(false);
        expect(tis.pob(Object.create(null))).toBe(false);
        expect(tis.pob(new Boolean())).toBe(false);
        expect(tis.pob(new Number())).toBe(false);
        expect(tis.pob(new String())).toBe(false);

        expect(tis.pob(new Map())).toBe(false);
        expect(tis.pob(new C())).toBe(false);
        expect(tis.pob((new (function(){})()))).toBe(false);

        expect(tis.pob(Map)).toBe(false);
        expect(tis.pob(C)).toBe(false);
        expect(tis.pob([].map)).toBe(false);
        expect(tis.pob(()=>{})).toBe(false);
        expect(tis.pob(function(){})).toBe(false);
    });
    test("nob", () => {
        expect(tis.nob(Object.create(null))).toBe(true);

        expect(tis.nob({})).toBe(false);
        expect(tis.nob([])).toBe(false);
        expect(tis.nob(new Boolean())).toBe(false);
        expect(tis.nob(new Number())).toBe(false);
        expect(tis.nob(new String())).toBe(false);

        expect(tis.nob(new Map())).toBe(false);
        expect(tis.nob(new C())).toBe(false);
        expect(tis.nob((new (function(){})()))).toBe(false);

        expect(tis.nob(Map)).toBe(false);
        expect(tis.nob(C)).toBe(false);
        expect(tis.nob([].map)).toBe(false);
        expect(tis.nob(()=>{})).toBe(false);
        expect(tis.nob(function(){})).toBe(false);
    });
    test("ins", () => {
        expect(tis.ins(Object.create(null), Object)).toBe(true); // 

        expect(tis.ins({}, Object)).toBe(true);
        expect(tis.ins([], Array)).toBe(true);
        expect(tis.ins(new Boolean(), Boolean)).toBe(true);
        expect(tis.ins(new Number(), Number)).toBe(true);
        expect(tis.ins(new String(), String)).toBe(true);

        expect(tis.ins(new Map(), Map)).toBe(true);
        expect(tis.ins(new C(), C)).toBe(true);
        const MyEs5Cls = function(){};
        expect(tis.ins(new MyEs5Cls(), MyEs5Cls)).toBe(true);

        expect(tis.ins([].map, Function)).toBe(true);
        expect(tis.ins(()=>{}, Function)).toBe(true);
        expect(tis.ins(function(){}, Function)).toBe(true);

        expect(tis.ins(Map, Map)).toBe(false);
        expect(tis.ins(C, C)).toBe(false);

    });
    /*
    test("obj", () => {
        expect(tis.obj({})).toBe(true);
        expect(tis.obj([])).toBe(true);
        expect(tis.obj(Object.create(null))).toBe(true);
        expect(tis.obj(new Boolean())).toBe(true);
        expect(tis.obj(new Number())).toBe(true);
        expect(tis.obj(new String())).toBe(true);

        expect(tis.obj(C)).toBe(true);
//        expect(tis.obj(class{})).toBe(true);
//        expect(tis.obj(new (class{})())).toBe(true);
//        expect(tis.obj(new (function fn{})())).toBe(true);
//        Object.defineProperty({},'d',{value:0})
    });


    test("obj", () => {
        expect(tis.obj({})).toBe(true);
        expect(tis.obj([])).toBe(true);
        expect(tis.obj(Object.create(null))).toBe(true);
        expect(tis.obj(new Boolean())).toBe(true);
        expect(tis.obj(new Number())).toBe(true);
        expect(tis.obj(new String())).toBe(true);

        expect(tis.obj(C)).toBe(true);
//        expect(tis.obj(class{})).toBe(true);
//        expect(tis.obj(new (class{})())).toBe(true);
//        expect(tis.obj(new (function fn{})())).toBe(true);
//        Object.defineProperty({},'d',{value:0})
    });
    */
});

