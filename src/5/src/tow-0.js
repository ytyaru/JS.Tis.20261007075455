import { tis } from './tis.js';

function mkTow(obj, currentPath = '') {
    if (typeof obj === 'function') {
        // 検証用ラッパー関数
        const towFn = function(...args) {
            if (!obj(...args)) {
                throw new TypeError(`Type mismatch for method '${currentPath}'.`);
            }
            //return args[0]; // 成功時は検証した値をそのまま返却（チェーニング等に便利）
            return true; // 成功時は検証した値をそのまま返却（チェーニング等に便利）
        };

        // 関数オブジェクト自身に紐づくプロパティ（cls.es6 など）を再帰的に処理
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
        // オブジェクトの各プロパティを再帰的に変換
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

