#!/usr/bin/env bash
# ==============================================================================
# Cloudflare Pages 專門入口網站建置腳本
# ==============================================================================
# 本腳本旨在實現「雙平台入口完美分流」：
# 1. 保持根目錄的 index.html 完全不變（繼續指向原本正常的 Netlify 節點，供 GitHub Pages 使用）。
# 2. 在編譯時，自動建立獨立的 cloudflare-dist 資料夾，並複製所有靜態資源與 index.html。
# 3. 動態將複製後的網頁內容中的連結修改為 Cloudflare 版的電子書連結。
# 4. 指引 Cloudflare Pages 發布此資料夾。

set -euo pipefail

# 1. 清理並建立獨立的部署資料夾
rm -rf cloudflare-dist
mkdir -p cloudflare-dist

# 2. 複製所有靜態網頁資源至部署資料夾下
cp style.css script.js hoian_cover.png bali_waterfront.png columns.html stock-learning.html sanctuary.html stock-books.html sanctuary.json sanctuary-teaching.json stock-books.json stock_learning.png cloudflare-dist/
cp index.html cloudflare-dist/index.html
cp -f *.md cloudflare-dist/ 2>/dev/null || true

# 3. 在複製出來的檔案中，動態替換連結（使用 Linux 標準的 sed 工具）
# 這不會影響您在本機或 GitHub 上的原始 index.html 檔案
sed -i 's/https:\/\/stock-onepiece.netlify.app/https:\/\/stock-sea-cloud2.pages.dev/g' cloudflare-dist/index.html
sed -i 's/React \/ Netlify/Quarto \/ Cloudflare Pages/g' cloudflare-dist/index.html
sed -i 's/https:\/\/old-hiddentreasure-poem.netlify.app/https:\/\/poem-e8i.pages.dev/g' cloudflare-dist/columns.html

echo "========== [Cloudflare Portal Build] 建置完成！輸出目錄：cloudflare-dist/ =========="
