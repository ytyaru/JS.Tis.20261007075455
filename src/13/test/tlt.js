import { expect, test, describe } from "bun:test";
import { tlt } from "../src/tlt.js";

class C {static sm() {} static *sgm() {yield 0}}
describe("tlt", () => {
    test("und", () => expect(tlt.und).toBe(undefined));
    test("nul", () => expect(tlt.nul).toBe(null));
    test("nan", () => expect(tlt.nan).toBe(NaN));
    test("bln", () => expect(tlt.bln).toBe(false));
    test("str", () => expect(tlt.str).toBe(''));
    test("big", () => expect(tlt.big).toBe(0n));
    test("sym", () => expect(tlt.sym).toBeSymbol());
    test("num", () => expect(tlt.num).toBe(0));
    test("int", () => expect(tlt.int).toBe(0));
    test("fin", () => expect(tlt.fin).toBe(0));
    test("ref", () => expect(tlt.ref).toBeObject());
    test("obj", () => expect(tlt.obj).toBeObject());
    test("nob", () => expect(tlt.nob).toBeObject());
    test("pob", () => expect(tlt.pob).toBeObject());
    test("ary", () => expect(tlt.ary).toBeArray());
    test("ins", () => expect(tlt.ins).toBeNull());
    test("cls", () => expect(tlt.cls).toBeNull());
    test("run", () => expect(tlt.run).toBeNull());
    test("fn", () => expect(tlt.fn).toBeNull());
});
