import { tis } from './tis.js';
const createTowHandler = (propName = '') => {
    return {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);

            if (typeof value === 'function') {
                return new Proxy(value, {
                    apply(targetFn, thisArg, args) {
                        // 実行された関数の真偽値結果を検証する
                        const result = Reflect.apply(targetFn, thisArg, args);
                        if (!result) {
                            throw new TypeError(`Type mismatch for method '${String(prop)}'.`);
                        }
                        return true;
                    },
                    // 関数自身がさらにプロパティ（.es6など）を持っている場合に対応
                    get(targetFn, subProp, subReceiver) {
                        const subValue = Reflect.get(targetFn, subProp, subReceiver);
                        if (typeof subValue === 'function') {
                            return new Proxy(subValue, {
                                apply(subTargetFn, subThisArg, subArgs) {
                                    const subResult = Reflect.apply(subTargetFn, subThisArg, subArgs);
                                    if (!subResult) {
                                        throw new TypeError(`Type mismatch for method '${String(subProp)}'.`);
                                    }
                                    return true;
                                }
                            });
                        }
                        return subValue;
                    }
                });
            }

            if (value !== null && typeof value === 'object') {
                return new Proxy(value, createTowHandler(prop));
            }

            return value;
        }
    };
};

export const tow = new Proxy(tis, createTowHandler());

