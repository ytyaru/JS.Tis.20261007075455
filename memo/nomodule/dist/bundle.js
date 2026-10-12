(function() {
function add(a, b) {
    return a + b;
}
import { add } from './utils';
const resultX = add(40, 2);
function greet(name) {
    return `Hello, ${ name }! (Result: ${ resultX })`;
}

// --- エクスポート対象を globalThis に自動展開 ---
const __exports = { resultX, greet };
Object.entries(__exports).forEach(([key, value]) => {
  globalThis[key] = value;
});
})();
