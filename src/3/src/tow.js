import { tis } from './tis.js';

// 関数をラップして結果を検証する共通ヘルパー
const wrapFunction = (fn, propName) => {
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const result = Reflect.apply(target, thisArg, args);
            if (!result) {
                throw new TypeError(`Type mismatch for method '${String(propName)}'.`);
            }
            return true;
        },
        get(target, prop, receiver) {
            const subValue = Reflect.get(target, prop, receiver);
            // 関数がさらにプロパティ（.es6など）を持っている場合も、同じラッパーで再帰的に処理
            //if (typeof subValue === 'function') {
            if (tis.run(subValue)) {
                return wrapFunction(subValue, prop);
            }
            return subValue;
        }
    });
};

// オブジェクトのプロパティを監視するハンドラ
const towHandler = {
    get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);

        //if (typeof value === 'function') {
        if (tis.run(value)) {
            return wrapFunction(value, prop);
        }

        //if (value !== null && typeof value === 'object') {
        if (tis.obj(value)) {
            return new Proxy(value, towHandler);
        }

        return value;
    }
};

export const tow = new Proxy(tis, towHandler);
