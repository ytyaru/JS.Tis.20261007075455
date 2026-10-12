import fs from "fs";
import path from "path";
import * as acorn from "acorn";
import * as escodegen from "escodegen";
import Bun from "bun";

const entryPath = "./src/index.ts";

const buildResult = await Bun.build({
  entrypoints: [entryPath],
  target: "browser",
  format: "esm", 
});

if (!buildResult.success) {
  console.error("Bunのビルド自体が失敗しました:", buildResult.logs);
  process.exit(1);
}

// 【正しい取得方法】BuildOutputオブジェクトを直接 Response で受けて text() を抽出する
const firstOutput = buildResult.outputs[0];
const bundledJsCode = await new Response(firstOutput).text();

const ast = acorn.parse(bundledJsCode, { ecmaVersion: "latest", sourceType: "module" });

const exportNames = [];
const finalBody = [];

for (const node of ast.body) {
  if (node.type === "ExportDefaultDeclaration") {
    throw new SyntaxError(
      "【ビルドエラー】Classic Script形式への出力では `export default` はサポートしていません。\n" +
      "名前付きエクスポート（例: `export const fn = ...`）に書き換えてください。"
    );
  }

  if (node.type === "ExportNamedDeclaration") {
    if (node.declaration) {
      finalBody.push(node.declaration); 
      
      if (node.declaration.type === "VariableDeclaration") {
        for (const decl of node.declaration.declarations) {
          exportNames.push(decl.id.name);
        }
      } else if (
        node.declaration.type === "FunctionDeclaration" || 
        node.declaration.type === "ClassDeclaration"
      ) {
        exportNames.push(node.declaration.id.name);
      }
    } 
    else if (node.specifiers) {
      for (const spec of node.specifiers) {
        exportNames.push(spec.exported.name);
      }
    }
  } else {
    finalBody.push(node);
  }
}

const bundledAST = { type: "Program", body: finalBody };
const cleanedCode = escodegen.generate(bundledAST);

const finalClassicScript = `
(function() {
${cleanedCode}

// --- エクスポート対象を globalThis に自動展開 ---
const __exports = { ${exportNames.join(", ")} };
Object.entries(__exports).forEach(([key, value]) => {
  globalThis[key] = value;
});
})();
`.trim();

fs.mkdirSync("./dist", { recursive: true });
fs.writeFileSync("./dist/bundle.js", finalClassicScript);
console.log("Classic Scriptが ./dist/bundle.js に出力されました。");
