# スクリプト自身のディレクトリに移動する
cd "$(dirname "$0")"
bun build --minify handmade.js > handmade.min.js
