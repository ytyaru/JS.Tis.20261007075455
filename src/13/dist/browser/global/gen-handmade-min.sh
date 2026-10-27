# スクリプト自身のディレクトリに移動する
cd "$(dirname "$0")"
bun build --minify handmade.js > handmade.min.js
bun build --minify tis-handmade.js > tis-handmade.min.js
bun build --minify tis-tow-handmade.js > tis-tow-handmade.min.js
