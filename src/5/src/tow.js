import { tis } from './tis.js';

/**
 * 外部に定義した共通のバリデーション・ラッパー生成関数
 * （ロード時に一度だけ各ノードごとに生成されます）
 */
function createTowFunction(validator, currentPath) {
    return function(...args) {
        if (!validator(...args)) {
            throw new TypeError(`Type mismatch for method '${currentPath}'.`);
        }
        return true; // 成功時は true を返却
    };
}

function mkTow(obj, currentPath = '') {
    if (typeof obj === 'function') {
        const towFn = createTowFunction(obj, currentPath);

        // 関数オブジェクトに紐づくプロパティ（cls.es6 など）を再帰的に処理
        for (const key of Object.getOwnPropertyNames(obj)) {
            if (['length', 'name', 'prototype', 'caller', 'arguments'].includes(key)) {
                continue;
            }
            const sub = obj[key];
            const subPath = currentPath ? `${currentPath}.${key}` : key;
            if (typeof sub === 'function' || (sub !== null && typeof sub === 'object')) {
                towFn[key] = mkTow(sub, subPath);
            } else {
                towFn[key] = sub;
            }
        }

        return towFn;
    } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key of Object.keys(obj)) {
            const sub = obj[key];
            const subPath = currentPath ? `${currentPath}.${key}` : key;
            result[key] = mkTow(sub, subPath);
        }
        return result;
    } else {
        return obj;
    }
}

export const tow = mkTow(tis);
