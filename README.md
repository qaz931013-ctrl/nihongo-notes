# ことば日和｜日文學習筆記

以繁體中文為主的日文初學者學習網站，包含五十音、單字、文法與會話筆記。每篇筆記都有概念說明、互動單字卡和三選一測驗。

## 特色
- 日系簡約、響應式版型
- 筆記分類與即時搜尋
- 可翻面的單字卡、即時批改的小測驗
- 內容統一存放在 `data/lessons.json`，新增課程不必修改 HTML
- `AGENTS.md` 定義完整的 AI 協作規則，`docs/NEW_LESSON.md` 提供新增範本

## 本機預覽
需要 Python 3，進入專案根目錄後執行：

```bash
python3 -m http.server 8000
```

瀏覽器開啟 http://localhost:8000/ 。請勿直接雙擊 `index.html`，因為 `file://` 可能阻擋 JSON 讀取。

## GitHub Pages 部署
1. 在 GitHub 建立 **Public** repository，建議名稱 `nihongo-notes`。
2. 上傳**專案資料夾內**的所有檔案與資料夾，確保 `index.html` 與 `AGENTS.md` 位於 repository 根目錄。
3. 開啟 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 中選 **Deploy from a branch**，Branch 選 **main**，資料夾選 **/(root)**，按 **Save**。
5. 等待 GitHub Pages 部署完成後，開啟 `https://你的帳號.github.io/nihongo-notes/`。
6. 以手機及電腦檢查筆記、搜尋、單字卡、測驗是否正常。

> 網站中導覽列的 GitHub 連結目前指向 GitHub 首頁。取得 repository 網址後，可將 `index.html` 裡的 `https://github.com` 換成你的實際 repository 連結。

## 如何持續擴充
請先閱讀 [AGENTS.md](AGENTS.md) 與 [新增筆記指南](docs/NEW_LESSON.md)。新增一篇課程時，依規格在 `data/lessons.json` 新增一筆物件，首頁會自動呈現，不需另寫頁面。

## 技術
HTML、CSS、JavaScript、JSON；無後端、無資料庫、無建置流程。可直接使用 GitHub Pages。

## 聲明
本站是個人整理的入門學習筆記，並非 JLPT 官方教材。
