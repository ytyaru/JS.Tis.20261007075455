import fs from "fs";
import path from "path";
import * as acorn from "acorn";
import * as escodegen from "escodegen";
import Bun from "bun";

const entryPath = "./src/index.ts";

const visitedFiles = new Set();
const finalBody = [];
const exportNames = []; // エントリーポイントのエクスポートのみを格納する配列

const transpiler = new Bun.Transpiler({ loader: "ts" });

function bundleFile(filePath, isEntry = false) {
  const absolutePath = path.resolve(filePath);
  if (visitedFiles.has(absolutePath)) return;
  visitedFiles.add(absolutePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: ファイルが見つかりません: ${filePath}`);
    process.exit(1);
  }

  const tsCode = fs.readFileSync(absolutePath, "utf8");
  const jsCode = transpiler.transformSync(tsCode);
  const ast = acorn.parse(jsCode, { ecmaVersion: "latest", sourceType: "module" });

  for (const node of ast.body) {
    if (node.type === "ImportDeclaration") {
      const importSource = node.source.value;
      let importedFilePath = path.resolve(path.dirname(filePath), importSource);
      if (!importedFilePath.endsWith(".ts") && !importedFilePath.endsWith(".js")) {
        importedFilePath += fs.existsSync(importedFilePath + ".ts") ? ".ts" : ".js";
      }
      // 依存ファイルはエントリーポイントではないので isEntry = false
      bundleFile(importedFilePath, false);
    }
    // export default が使われていたら即座に例外を発生させて終了する
    if (node.type === "ExportDefaultDeclaration") {
      throw new SyntaxError(
        "【エラー】Classic Script形式への出力では `export default` はサポートしていません。" +
        "名前衝突や名前不明になるのを防ぐため、すべて名前付きエクスポート（例: `export const fn = ...`）に書き換えてください。"
      );
    }
    else if (node.type === "ExportNamedDeclaration") {
      if (node.declaration) {
        finalBody.push(node.declaration);
        
        // 【修正箇所】エントリーポイント（isEntry === true）の時のみ、globalThisへの公開リストに登録する
        if (isEntry) {
          if (node.declaration.type === "VariableDeclaration") {
            for (const decl of node.declaration.declarations) {
              exportNames.push(decl.id.name);
            }
          } else if (node.declaration.type === "FunctionDeclaration" || node.declaration.type === "ClassDeclaration") {
            exportNames.push(node.declaration.id.name);
          }
        }
      }
    }
    else {
      finalBody.push(node);
    }
  }
}

// 1. エントリーポイントの解析を開始（isEntry = true として呼び出す）
bundleFile(entryPath, true);

// 2. 結合されたクリーンなASTからコードを生成
const bundledAST = { type: "Program", body: finalBody };
const cleanedCode = escodegen.generate(bundledAST);

// 3. 1つのIIFE（Classic Script）に仕立て上げる
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
console.log("Success: Pure Classic Script generated correctly.");
