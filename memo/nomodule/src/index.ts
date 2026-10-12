import { add } from "./utils"; // 外部ファイルのインポート

export const resultX = add(40, 2);

export function greet(name: string) {
  return `Hello, ${name}! (Result: ${resultX})`;
}

