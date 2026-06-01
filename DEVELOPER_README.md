# Technical Architecture: MiniGame Studio v3.0

**開發部門：** AI Native 醫療系統架構開發專家 (Gemini CLI Persona)
**技術棧：** Next.js / React + Tailwind CSS + Firebase (Hosting & Firestore)
**分支：** `week12-v3.0`

---

## 1. 目錄結構與模組說明 (File Structure)

- **/commission**：客戶填寫 Brief 的互動表單頁面。
    - 實作「deliverable-spec.md Section 2」定義的 5 個核心欄位。
    - 串接 Firebase Firestore，將 Brief 轉化為 `commission-id`。
- **/game/[commission-id]**：根據委託動態生成的遊戲頁面。
    - 利用 `getStaticPaths` 或 `getServerSideProps` 讀取資料。
    - 根據 Brief 中的「遊戲類型」自動掛載對應的框架。
- **/games/**：三種核心遊戲框架。
    - **`boss-fight.js`**：實作「打怪」邏輯（如：對抗博論魔王）。
    - **`puzzle.js`**：實作「解謎」邏輯（如：釐清遺留系統矛盾）。
    - **`collector.js`**：實作「收集」邏輯（如：社團傳承球鞋牆）。

---

## 2. AXL Streaming & Hydration 實作細節

- **AXL 語義層對齊**：
    - 前端透過 `useCommission(id)` Hook 訂閱 Firestore。
    - 遊戲中的「怪物屬性」與「訊息」會根據 AXL 語義層進行動態充水 (Hydration)。
- **Lazy Loading (禪風優化)**：
    - 非核心遊戲資產採用 `next/dynamic` 進行懶加載，確保初始渲染在 3 秒內完成決策區域的顯示。

---

## 3. 部署與交付 (Deployment)

- **環境：** Firebase Hosting
- **預定 Channel：** `week12-v3.0`
- **預期網址：** `https://[project]--week12-v3-0-[hash].web.app`

---

**開發者備註：**
「代碼必須具備防禦性」。我們不只是在寫遊戲，我們是在實作一個「人機協作的緩衝層」。所有的狀態傳遞 (State Management) 都將圍繞著「Trinity」境界進行封裝。
