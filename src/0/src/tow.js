/*
import {tis} from './tis.js';
// プロキシのハンドラを定義する共通関数
const createTowHandler = (targetObj) => {
    return {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);

            // 関数（判定関数）の場合：実行結果を検証してエラーを投げるラッパーを返す
            if (typeof value === 'function') {
                return (...args) => {
                    const result = value(...args);
                    if (!result) {
                        throw new TypeError(`Type mismatch for method '${String(prop)}'.`);
                    }
                    return true;
                };
            }

            // オブジェクト（ネストされたプロパティ：例: cls.es6 など）の場合：さらにProxyでラップする
            if (value !== null && typeof value === 'object') {
                return new Proxy(value, createTowHandler(value));
            }

            return value;
        }
    };
};
export const tow = new Proxy(tis, createTowHandler(tis));
*/
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

/*
*/
/*
import {tis} from './tis.js';

// プロキシのハンドラを定義する共通関数
const createTowHandler = (targetObj) => {
    return {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);

            // 関数（判定関数）の場合：実行結果を検証してエラーを投げるラッパーを返す
            if (typeof value === 'function') {
                return (...args) => {
                    // this（receiver）をバインドして関数を実行する
                    const result = Reflect.apply(value, receiver, args);
                    
                    if (!result) {
                        // ご指定のエラーメッセージ形式に合わせる場合、プレフィックスに注意
                        throw new TypeError(`Type mismatch for method '${String(prop)}'.`);
                    }
                    return true;
                };
            }

            // オブジェクト（ネストされたプロパティ：例: cls.es6 など）の場合：さらにProxyでラップする
            if (value !== null && typeof value === 'object') {
                return new Proxy(value, createTowHandler(value));
            }

            return value;
        }
    };
};

export const tow = new Proxy(tis, createTowHandler(tis));
*/
/*
import { tis } from './tis.js';

const createTowHandler = () => {
    return {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);

            // オブジェクトまたは関数の場合、さらにProxyでラップする
            // （関数を即座に置き換えず、Proxyで包むことで .es6 などのプロパティアクセスを可能にする）
            if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
                return new Proxy(value, createTowHandler());
            }

            return value;
        },
        
        apply(target, thisArg, argArray) {
            // 関数が実行されたときの検証処理
            const result = Reflect.apply(target, thisArg, argArray);
            
            if (!result) {
                // 正規表現 /^Type mismatch / に一致するメッセージにする
                //throw new TypeError("Type mismatch: method returned false.");
                throw new TypeError(`Type mismatch for method '${String(prop)}'.`);
            }
            return true;
        }
    };
};

export const tow = new Proxy(tis, createTowHandler());
*/
