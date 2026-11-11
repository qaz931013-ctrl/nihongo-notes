# ことば日和｜日文學習筆記

以繁體中文整理日文講義重點，分成日文01～04四個單元，提供搜尋、單字卡、測驗與每天10～20分鐘的複習安排。

## 網站
部署後：https://qaz931013-ctrl.github.io/nihongo-notes/

## 內容來源
- 《井上老師 日文01》：五十音、清濁音、拗音、片假名、促音、長音與單字。
- 《問候語02》：24項基本問候與生活用語。
- 《井上老師 日文03基礎文法》：基本句型、指示詞、疑問詞、形容詞、基本動詞、授受等。
- 《日文04》：動詞分類及12種ます形延伸用法。

**著作權提醒：** 網站為學習摘要及自製練習，不附原講義全文。公開分享前請確認原講義的來源、授權及必要的出處資訊。

## 使用與部署
1. 將本專案**整個資料夾內的內容**上傳到 GitHub 儲存庫 `nihongo-notes` 根目錄（包含 `assets/`、`data/`、`docs/` 與 `index.html`）。
2. GitHub → Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save。
3. 等候部署後重新整理網站（必要時 Ctrl+F5）。
4. 日後新增內容，先讀 `AGENTS.md` 與 `docs/NEW_LESSON.md`，比對重複後再修改 `data/lessons.json`。

## 技術
純 HTML/CSS/JavaScript + JSON，不需安裝套件；為避免 `file://` 限制，請用本機 HTTP 伺服器預覽：`python -m http.server 8000`。

## 設計規則
參見 [AGENTS.md](AGENTS.md)。
