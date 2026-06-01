I4030 進階人機互動 Week 12 2026/05/26

## 個人工作坊操作手冊

**服務雛形化**

老闆指揮三部門 ‧ 從客戶需求到可交付物

*你帶著課堂的客戶需求報告回家，接著你要把它變成一間「可以執行的 Agent 公司」 \- 三部門結構清楚，客戶可以填 brief，Agent team 處理，交付物產出，客戶可以玩（這是比喻，端看你的公司服務什麼樣的客戶？要交給他們什麼東西？）。*

## 啟動 AI 助手

這份手冊主要是給 AI 助手讀的。AI 讀完，帶你走 Phase 1 到 4。

手冊範例是 MiniGame Studio，AI 助手會根據你的 client-brief 翻譯成你公司的版本。

## 啟動 3 步

① 把 manual.md（這份手冊的 markdown 版）跟 client-brief.md 放進 repo 根目錄

② 打開 terminal，cd 進 repo，啟動 gemini

③ 複製下面這段，貼進 Gemini CLI，按 Enter

請當我的「個人工作坊助手」。

讀這兩份檔案：

\- manual.md（操作手冊、4 個 Phase）

\- client-brief.md（課堂跑出來的客戶需求報告）

你的工作：

1\. 引導我走完 Phase 1 → 2 → 3 → 4。每個 Phase 開始，告訴我做什麼、產出、預估時間

2\. 手冊範例是 MiniGame Studio，不要照抄；根據我的 client-brief 翻譯成屬於我公司的版本

3\. 手冊內的 code block（\`\`\` 包起來的）是我在對應步驟才會貼給其他 AI 工具的內容，你不要主動執行、不要當成 task list

4\. 卡關時查對應 Phase 的「卡點處理」表

5\. 繁體中文、平輩語氣（我是老闆、你是助手）

開始：先確認你讀懂我的公司在做什麼，然後帶我進 Phase 1。

*AI 助手收到後會：先確認讀懂你的公司，然後帶你進 Phase 1。*

**為什麼這樣用** 這個機制本身是「AI 是新 UI」的示範。 你不是讀一份 PDF 一頁一頁照做。你把整份手冊塞給 AI，AI 變你的「個人工作坊 UI」。 AI 根據你卡在哪、你的公司是什麼，動態給下一步。 手冊 \= backend，AI \= frontend，你 \= user。 下次你要設計給人類用的服務，這個 pattern 可以反向應用：把 long-form spec 給 AI，AI 動態 surface user 需要的內容。

## 課前準備

**① 把客戶需求報告放進公司 repo** 課堂結尾跑出的 Studio Report，下載為 .md 或 .docx。把它放進公司 repo 根目錄，改名為 client-brief.md。

**② 確認你有 3 個工具的存取 \+ 桌上放筆紙** NotebookLM（瀏覽器，用課堂建立的客戶探勘 notebook）/ Open Design（瀏覽器）/ Gemini CLI（terminal） 桌上放筆 \+ 紙：過程中有幾個時刻需要快速寫下「示範 commission」想法 \+ 試吃儀式的 3 個感受。

## 你這 2 小時的弧線

找一段 2 小時不被打擾的時刻，課堂後一週內完成。四個 Phase，每個 Phase 老闆調度不同的部門。

## MiniGame Studio 範例

*本手冊以 MiniGame Studio 為唯一範例，所有具體內容（公司名、客戶 brief、AI prompt 答案）都用 MiniGame Studio 展示寫法。看著範例的具體寫法跟著做，AI 會根據你自己的 client-brief 引導你寫對應的版本。*

| Phase | 時間 | 你做什麼 | 調度部門 / 工具 |
| :---- | :---- | :---- | :---- |
| 1 建立指揮 spec | 25 min | 寫 deliverable-spec.md：客戶 brief 欄位 \+ 三部門 persona prompt \+ 遊戲框架 spec | Gemini CLI 對話模式 |
| 2 部門產出 sample | 50 min | 跑研究部門 sample \+ 設計部門產視覺資產 \+ Handoff Bundle | NotebookLM \+ Open Design |
| 3 系統整合部署 | 35 min | 開發部門寫 code \+ Firebase 部署 \+ 拿到 share-able URL | Gemini CLI 程式模式 |
| 4 試吃儀式 | 10 min | 扮演客戶玩一遍 \+ 寫 3 個感受 \+ FB 貼文 | 瀏覽器 \+ 手機 |

## 公司簡介

**MiniGame Studio** 服務：給朋友訂製 3-5 分鐘可玩的個人化小遊戲。 客戶：想送朋友禮物的人（生日、告白、安慰、慶祝、紀念）。 客戶心中的成功：朋友玩到結尾收到驚喜訊息，想分享給更多人。 收費：NT$500-1500，學生互助價。

客戶下一筆訂單，本手冊稱為一個 **commission**（客戶填一份 brief 委託公司做一個小遊戲）。Phase 2 你會「自己扮演客戶」想一筆示範 commission，跑研究跟設計部門用。整本手冊出現的 /commission（URL）、commissions（Firestore collection 名）、commission-id（訂單 ID）都從這個概念衍生。

## 三大部門結構

| 部門 | 工具 | Persona |
| :---- | :---- | :---- |
| 🔬 研究部門 | NotebookLM | 主題研究員：把客戶 brief 變成「梗 \+ 玩法 \+ 情感弧線」 |
| 🎨 設計部門 | Open Design | 遊戲視覺設計師：把研究 brief 變成視覺資產（main scene \+ 角色 \+ 怪 \+ UI \+ 結尾） |
| ⚙️ 開發部門 | Gemini CLI | 全端遊戲工程師：把研究 \+ 設計整合進事先寫好的遊戲框架，部署 Firebase |

**老闆（你）= Orchestrator**。你的角色是：接客戶 brief，決定 brief 拆解後給哪個部門，收每個部門的產出，轉交下一個部門，最終 QA 試吃，交付給客戶。

## 完整工作流（從客戶 brief 到交付）

【客戶端】

👤 客戶到 MiniGame Studio 網站

↓ 點 /commission 填 brief

朋友的興趣 / 要對抗的怪 / 想傳達的訊息 / 遊戲類型 / 風格偏好

↓ 送出

📁 brief 寫進 Firestore commissions

【Agent Team 處理】

🎯 老闆收到 brief 通知

│

├─ ① brief 轉給研究部門

│ 🔬 NotebookLM 主題研究員

│ 輸入：brief \+ notebook 內 sources

│ 工作：抓梗 / 找 mechanic / 設計情感弧線

│ 輸出：研究 brief.md（3 個梗 / 核心 mechanic / 情感弧線 / tagline）

│

├─ ② 研究 brief 轉給設計部門

│ 🎨 Open Design 遊戲視覺設計師

│ 輸入：研究 brief \+ 客戶風格偏好

│ 工作：產出視覺資產

│ 輸出：main scene / 玩家角色 / 怪 / UI 元素 / 結尾畫面

│ 品質檢查

│ 打包：Handoff Bundle.zip

│

├─ ③ Bundle \+ 原始 brief 轉給開發部門

│ ⚙️ Gemini CLI 全端遊戲工程師

│ 輸入：客戶 brief \+ 研究 brief \+ Handoff Bundle \+ 3 種遊戲框架

│ 工作：判斷遊戲類型 → 套對應框架 → 整合資產 \+ 客戶 input

│ 輸出：/game/\[commission-id\] 頁面 \+ 部署 Firebase

│ 交付物：Share-able URL

│

└─ 🧪 QA 試吃儀式

老闆扮演客戶玩 3-5 min，寫 3 個感受

【交付】

🎁 FB 課程社團貼文 \+ URL

↓

👤 客戶玩到結尾收到驚喜訊息，複製 URL 傳給朋友

## 客戶體驗（5 步）

| 步 | 客戶端動作 |
| :---- | :---- |
| 1 | 到 MiniGame Studio 網站，看到主視覺 \+ 範例作品 |
| 2 | 點 /commission，填 brief 表單（5 個欄位） |
| 3 | 送出，收到 commission-id 確認 |
| 4 | 收到 /game/\[commission-id\] URL（示範場景：當下立即拿到） |
| 5 | 玩 3-5 分鐘 \+ 結尾驚喜訊息 \+ 複製 URL 傳給朋友 |

**Phase 1 | 建立公司指揮 spec** *25 min* 調度部門：Gemini CLI 對話模式

## 目標

寫好 deliverable-spec.md：把客戶 brief 表單欄位，三大部門 persona prompt，遊戲框架 spec 全部寫好。後續的設計部門 / 開發部門看了能直接執行。

## 產出文件

deliverable-spec.md（在 repo 根目錄）

├── Section 1: 公司簡介

├── Section 2: 客戶 brief 表單欄位

├── Section 3: 給研究部門的 persona prompt

├── Section 4: 給設計部門的 persona prompt

└── Section 5: 給開發部門的 persona prompt

## 步驟 1.1 | 啟動 Gemini CLI（2 min）

打開 terminal，cd 進公司 repo，啟動 gemini。

$ cd \~/Documents/我的公司(這裡對應你自己實際的路徑)

$ gemini

## 步驟 1.2 | 對 Gemini CLI 下第一個指令（1 min）

複製下面整段，貼進 Gemini CLI，按 Enter。

請扮演我的「公司結構顧問」。

先讀 client-brief.md。

然後引導我寫 deliverable-spec.md。

deliverable-spec.md 要包含 5 個 section：

1\. 公司簡介（一段話：公司名、服務、客戶、客戶心中的成功）

2\. 客戶 brief 表單欄位（5 個、含選項）

3\. 給研究部門的 persona prompt（直接給 NotebookLM 用，prompt-ready）

4\. 給設計部門的 persona prompt（直接給 Open Design 用，prompt-ready）

5\. 給開發部門的 persona prompt（直接給 Gemini CLI 用，prompt-ready）

請逐 section 問我問題，我回答後你整理寫進 deliverable-spec.md。

從 section 1 開始。

**什麼是 prompt-ready** prompt-ready \= 「你複製這段，貼進對應的 AI 工具對話框，AI 就能立刻執行，不用再對話翻譯」。 反例：「給設計部門：做出有設計感的視覺」 \- 這不是 prompt-ready，Open Design 看了還要追問。 正例：「給設計部門：做 main scene，畫面垂直分兩塊，上半 60% 遊戲區（玩家角色 vs 怪），下半 40% UI（HP 條 \+ 攻擊按鈕），卡通風，配色橘黃色系」 \- 這是 prompt-ready。

## 步驟 1.3 \- 1.7 | AI 引導你寫 5 個 section（19 min）

AI 會逐 section 問你問題。每個 section 你回答 \+ AI 整理寫進檔案 \+ 你看 AI 寫得對不對。

## Section 1：公司簡介（3 min）

| AI 會問 | 你會回答（以下是範例，你要改成自己的） |
| :---- | :---- |
| 公司叫什麼名字？ | MiniGame Studio |
| 提供什麼服務？ | 給朋友訂製 3-5 分鐘可玩的個人化小遊戲 |
| 服務對象？ | 想送朋友禮物的人 |
| 客戶心中的成功？ | 朋友玩到結尾收到驚喜訊息，想分享給更多人 |

## Section 2：客戶 brief 表單欄位（3 min）

AI 問：「要讓客戶填什麼，研究部門才有東西可以分析？」

你回答後，AI 整理出 5 個欄位：

\- 朋友的興趣（自由文字）

\- 要對抗的「怪」（自由文字）

\- 想傳達的訊息（自由文字）

\- 遊戲類型（打怪 / 解謎 / 收集 3 選 1）

\- 風格偏好（卡通 / 像素 / 手繪 3 選 1）

## Section 3：給研究部門的 persona prompt（5 min）

AI 會問：

- 研究部門收到客戶 brief 後，要產出什麼給設計部門？  
    
- 研究部門靠什麼判斷（哪些 sources）？  
    
- 輸出格式怎麼長？

你回答後，AI 寫出 prompt-ready 版本（會像下面這樣）：

你是 MiniGame Studio 的「主題研究員」。

工作：把客戶想傳達的訊息變成遊戲可以呈現的「梗 \+ 玩法 \+ 情感弧線」。

規則：

1\. 客戶 brief 有 5 個欄位...

2\. 從 notebook sources 抓設計通則 \+ 主題 trivia

3\. 每個梗要說「為什麼朋友會懂」

輸出格式（markdown）：

\# 研究 brief \- \[客戶名稱\]

\#\# 朋友的興趣分析 ...

\#\# 3 個可以放進遊戲的梗 ...

\#\# 對應遊戲類型的核心 mechanic ...

\#\# 情感弧線 ...

\#\# Tagline ...

*AI 寫完，你複製，暫存到 scratch.md。*

*（待會 Phase 2A 開頭，你要把這段貼給 NotebookLM customize chat）*

## Section 4：給設計部門的 persona prompt（4 min）

AI 同樣 pattern 問：

- 設計部門接到研究 brief，要產出什麼給開發部門？  
    
- 5 個視覺資產的規格？  
    
- 自我品質檢查的問題？

你回答後，AI 寫出 prompt-ready 版本（會像下面這樣）：

你是 MiniGame Studio 的「遊戲視覺設計師」。

工作：把研究 brief 轉成可以實作的視覺資產。

規則：

1\. 接 research-brief.md 的 3 個梗、核心 mechanic、情感弧線、tagline

2\. 配色、風格參考客戶 brief 的「風格偏好」欄位

3\. 每個資產要附說明：用在哪，為什麼這樣設計

輸出 5 個遊戲視覺資產：

\- main-scene.png：遊戲主畫面（畫面垂直分兩塊，上半 60% 遊戲區，下半 40% UI）

\- player-character.png：玩家角色（呼應客戶 brief 的朋友形象）

\- monster.png：「怪」（具體化客戶要對抗的東西，不嚇人、要有 character）

\- ui-elements.png：4 個 UI（開始、計分、暫停、結束）

\- ending-screen.png：結尾畫面（中間 text box 放客戶訊息）

加 2 個店面視覺：

\- landing-page-mockup.png：公司主頁

\- commission-form-mockup.png：/commission 表單頁

自我品質檢查：

\- 視覺有 cover 研究 brief 內 3 個梗嗎？

\- tagline 的調性、視覺風格對齊嗎？

\- 客戶到 landing 5 秒內，會懂這個服務嗎？

*（待會 Phase 2B 開頭，貼給 Open Design）*

## Section 5：給開發部門的 persona prompt（4 min）

AI 問：

- 兩條 URL 路徑（/commission、/game/\[id\]）的功能？  
    
- 三種遊戲框架的 spec？  
    
- Firebase 部署細節？

你回答後，AI 寫出 prompt-ready 版本（會像下面這樣）：

你是 MiniGame Studio 的「全端遊戲工程師」。

工作：把研究 \+ 設計部門的產出整合成可玩的小遊戲，部署 Firebase。

規則：

1\. 接收：客戶 brief（從 Firestore commissions 拿）+ research-brief.md \+ handoff/ 視覺資產

2\. 根據客戶 brief 的「遊戲類型」（打怪、解謎、收集）套對應框架

3\. 把研究 brief 的梗、訊息、情感弧線套進框架內容

兩條 URL 路徑：

\- /commission：客戶填 brief 表單頁，寫進 Firestore

\- /game/\[commission-id\]：從 Firestore 拿對應 brief，跑遊戲

三種遊戲框架 spec：

\- boss-fight.js：打怪框架（玩家 vs 怪、點擊或按鍵攻擊、HP 100 扣完算輸，約 3 分鐘玩完）

\- puzzle.js：解謎框架（答題或點擊組合，答對推進、答錯重試）

\- collector.js：收集框架（畫面內放道具，玩家點擊收集，湊齊解鎖結尾）

Firebase 部署：

\- Hosting：static files

\- Firestore：commissions collection（客戶 brief 寫入）

\- Spark 免費 plan，不用 Cloud Functions

自我品質檢查：

\- 打怪框架跑得起來嗎？/commission 表單能寫進 Firestore 嗎？

\- /game/\[commission-id\] 從 Firestore 拿資料的邏輯對嗎？

\- share-able URL 能複製、傳給朋友打開能玩嗎？

*（待會 Phase 3 開頭，貼給 Gemini CLI 程式模式）*

## 步驟 1.8 | 對 Gemini CLI 下定稿指令（2 min）

把上面 5 個 section 整合成完整的 deliverable-spec.md，

寫進 repo 根目錄。

給我看完整內容。

AI 顯示完整 deliverable-spec.md，你快速 scan 看有沒有漏。

## 步驟 1.9 | 品質檢查（1 min）

| 角度 | 你問自己 |
| :---- | :---- |
| 對下個部門 | 三個部門的 prompt 都複製能直接用嗎？三部門的 input / output 銜接得起來嗎？（前一部門輸出 \= 下一部門輸入） |
| 對未來的你 | 幾天後忘記這個 Phase 做了什麼，看 deliverable-spec.md 能知道怎麼操作公司嗎？ |

不過關，跟 Gemini CLI 說「給設計部門的 prompt 不夠具體，加上 XXX」，修一輪。

## Phase 1 卡點處理

| 卡點 | 怎麼辦 |
| :---- | :---- |
| AI 問的問題你答不出來 | 對 AI 說「我不知道，你給我 3 個選項我選」，AI 會給範例 |
| AI 寫的 persona prompt 太抽象 | 對 AI 說「再具體，加上 input / output 格式範例 \+ 工作規則 3 條」 |
| 課堂帶回的客戶需求報告跟 MiniGame Studio 範例不同 | 範例只展示寫法。AI 會根據你的 client-brief.md 內容問問題，你答自己的版本即可 |
| 25 min 寫不完 | 優先保證 Section 3 \- 5（三個部門 prompt）寫好，Section 1 \- 2 可以等 Phase 2 補 |

## Phase 1 結束，deliverable-spec.md 在 repo 根目錄。進 Phase 2。

**Phase 2 | 部門產出 sample** *50 min* 調度部門：NotebookLM \+ Open Design

## 目標

跑研究部門 sample（用一個示範 commission 當輸入）+ 設計部門產出視覺資產 \+ landing page 視覺。

## 產出文件 / 資產

research-brief-sample.md ← 研究部門針對示範 commission 的產出

handoff/ ← 設計部門產出的視覺資產資料夾

├── main-scene.png

├── player-character.png

├── monster.png

├── ui-elements.png

├── ending-screen.png

├── landing-page-mockup.png

├── commission-form-mockup.png

└── README.md（風格指引 \+ 每個檔案說明）

**為什麼需要「示範 commission」** Phase 2 不是處理真正客戶的 brief，是你扮演客戶想一個示範 brief。 原因 1：產出的視覺要當系統的 sample（真實客戶來看到 sample 才會懂這個服務） 原因 2：Phase 3 開發部門寫框架時，需要一份真實 brief 作為測試資料 原因 3：Phase 4 試吃儀式時，你填新 brief 跑流程，會跟示範 sample 對照看

## Phase 2A | 研究部門跑示範 commission（10 min）

**步驟 2A.1 | 想一個示範 commission（3 min）**

用紙筆，想一個示範 commission 來走流程。從下面 4 個情境選一個跟著走：

**範例 ① 給室友 / 同學** 對象：博論寫不完的室友 朋友的興趣：超喜歡咖啡，養了一隻橘貓，玩 Stardew Valley 要對抗的「怪」：博論寫不完、deadline 在月底 想傳達的訊息：「你一定可以的，咖啡再續一杯就好」 遊戲類型：打怪 | 風格：卡通

**範例 ② 給自己** 對象：我自己（明天要上台簡報的我） 我的興趣：愛聽 Lo-fi，囤積很多文具，有壓力就買書 要對抗的「怪」：上台前 1 小時的緊張焦慮 想傳達的訊息：「你已經練習很多次了，做你自己就好」 遊戲類型：打怪 | 風格：手繪

**範例 ③ 給家人** 對象：考完學測的高三表妹 朋友的興趣：追歐美劇、彈鋼琴、暗戀某個 YouTuber 要對抗的「怪」：學測完不知道選什麼系的迷茫 想傳達的訊息：「選錯也沒關係，你還可以轉，加油」 遊戲類型：解謎 | 風格：像素

**範例 ④ 給社團朋友 / Discord 群友** 對象：社團要交接的學弟 朋友的興趣：玩 VALORANT，收集球鞋，在追 Vtuber 要對抗的「怪」：接幹部後的徬徨與壓力 想傳達的訊息：「我們都這樣過來的，社團是你的，放手做」 遊戲類型：收集 | 風格：卡通

寫進 sample-commission.md 留底（可以對 Gemini CLI 說「幫我建一個 sample-commission.md，內容是 \[貼你選的範例\]」）。

## 步驟 2A.2 | 開 NotebookLM，進客戶探勘 notebook（1 min）

打開 notebooklm.google.com，進今天課堂建立的「客戶探勘」notebook。

**找不到 notebook 怎麼辦** NotebookLM dashboard 上方搜尋框，打「客戶探勘」就能找到。 如果課堂時忘記命名 / 不確定名字，看 modified date 最新的那個就是。 極端狀況：notebook 真的沒了 / 沒建到，新建一個，把 Week 12 三個新 sources（Sequoia / YC / All-In）重新加進去 \+ Fast Research 結果（如果課堂跑過）。

## 步驟 2A.3 | 設定研究部門 persona（2 min）

右上 Settings → Customize chat，把 Phase 1 寫好的「研究部門 persona prompt」貼進去，儲存。

**Pro 用戶路徑** Pro 用戶可以用 Gemini chat，直接貼 persona prompt \+ reference notebook。 兩種方法都行，效果一樣。

## 步驟 2A.4 | 餵示範 commission 給研究部門（3 min）

在 chat 內，貼下面這段（替換成你選的範例 commission 內容）：

收到一個新的 commission，請處理：

客戶 brief：

\- 朋友的興趣：\[填你選的\]

\- 要對抗的「怪」：\[填你選的\]

\- 想傳達的訊息：\[填你選的\]

\- 遊戲類型：\[填你選的\]

\- 風格偏好：\[填你選的\]

請按照你的 persona 規則，產出研究 brief.md。

研究部門產出研究 brief（3 個梗 \+ 核心 mechanic \+ 情感弧線 \+ tagline）。

## 步驟 2A.5 | 收研究 brief，存檔（1 min）

複製研究 brief 內容，存成 research-brief-sample.md，放進 repo 內。

**Phase 2A 品質檢查（30 秒）** 對下個部門（設計部門）：3 個梗都跟 client-brief 的朋友興趣有連結嗎？情感弧線 3 段都明確嗎？ 對客戶（朋友）：朋友看到這個遊戲，會在 1 分鐘內懂「啊這是 \[那個梗\] 對應到 \[我的痛點\]」嗎？

不過關，跟研究部門說「梗 2 跟我朋友的興趣連結不夠，改成 XXX」，重跑。

## Phase 2B | 設計部門產視覺資產（40 min）

**步驟 2B.1 | 開 Open Design，貼設計部門 persona（2 min）**

開 Open Design 對話介面，把 Phase 1 寫好的「設計部門 persona prompt」貼進去。加一句：

我給你一個示範 commission，請開始產出視覺資產：

\[貼研究部門產出的研究 brief\]

\[貼示範 commission 的風格偏好：卡通\]

請先給我 main scene 的設計。

## 步驟 2B.2 | 迭代 main scene（8 min）

Open Design 跑出第一版。你看，判斷，對話精修。

| 你可能會說 | 為什麼 |
| :---- | :---- |
| 再卡通一點，線條粗一點 | 配合風格偏好「卡通」，避免太精緻不像 jam game |
| 配色用溫暖橘黃色 | 對應 tagline「咖啡再續一杯就好」的溫度 |
| main scene 太擠，留白多一點 | 客戶看到要能秒懂，不要訊息過載 |
| 遊戲區跟 UI 區的比例改成 60:40 | 我希望玩家視線聚焦在遊戲區 |

*迭代 3-5 輪，覺得可以了就 export PNG。*

## 步驟 2B.3 | 跑玩家角色 \+ 怪（10 min）

繼續對話：

接下來請設計：

1\. 玩家角色（像 \[示範 commission 的客戶想要的人物\]、卡通風）

2\. 怪（\[客戶要對抗的東西具體化\]、不要嚇人，要有 character）

請先給我玩家角色。

迭代到滿意，export。然後同樣 pattern 跑「怪」。

## 步驟 2B.4 | UI 元素 \+ 結尾畫面（8 min）

接下來請設計：

1\. 4 個 UI 元素：開始按鈕 / 計分顯示 / 暫停按鈕 / 結束畫面

2\. 結尾畫面（顯示客戶訊息「\[訊息內容\]」的視覺）

結尾畫面要有「分享給朋友」按鈕的位置。

## 步驟 2B.5 | landing page \+ /commission 表單視覺（8 min）

Open Design 還要產出公司「店面」的視覺：

接下來請設計公司的「店面」視覺：

1\. Landing page（公司主頁）

\- Hero: 公司名 \+ 一句介紹 \+ 範例作品 thumbnail

\- 服務說明: 3 個 step（填 brief / 我們處理 / 拿到你的遊戲）

\- CTA: 開始 commission

2\. /commission 表單頁

\- 5 個欄位的視覺呈現

\- 提交按鈕

視覺調性沿用前面的卡通風 \+ 溫暖橘黃色。

## 步驟 2B.6 | 品質檢查（2 min）

| 角度 | 你問自己 |
| :---- | :---- |
| 對下個部門（開發部門） | 研究 brief 內的 3 個梗，視覺有 cover 嗎？tagline 的調性，視覺風格對齊嗎？ |
| 對客戶 | 朋友打開遊戲，會有「啊我懂這是給我的」感嗎？客戶到 landing 5 秒內，會懂這個服務嗎？ |

不過關，回 Open Design 對話，指定修哪個資產，跑修正版。

## 步驟 2B.7 | 整理 Handoff Bundle（2 min）

把所有 PNG 下載，放進 repo handoff/ 資料夾。寫一份 README.md：

\# Handoff Bundle \- MiniGame Studio v3.0

\#\# 視覺資產清單

\- main-scene.png：遊戲主畫面（卡通風、橘黃色系、遊戲區 60% UI 40%）

\- player-character.png：玩家角色（卡通風、戴眼鏡的學生）

\- monster.png：「怪」(博論魔王、書本身，不嚇人)

\- ui-elements.png：4 個 UI（開始 / 計分 / 暫停 / 結束）

\- ending-screen.png：結尾畫面（中間留 box 給訊息）

\- landing-page-mockup.png：公司主頁

\- commission-form-mockup.png：表單頁

\#\# 風格指引

\- 配色：橘黃 \#F4A742 \+ 米白 \#F5F0E8 \+ 深棕 \#6B4423

\- 字體：圓潤 sans-serif（Nunito 或類似）

\- 整體調性：友善、有趣，不過度精緻

## Phase 2 結束，所有視覺資產 \+ research-brief-sample.md 在 repo 內。進 Phase 3。

**Phase 2 卡點處理**

| 卡點 | 怎麼辦 |
| :---- | :---- |
| 研究部門產出 generic，不引用 source | 在 chat 內回「請按 persona 規則，每個梗要引用具體 source 並說明為什麼朋友會懂，重做」 |
| Open Design 跑出來的視覺風格太 corporate | 對話：「再 hand-drawn 一點，像 jam game，不要 corporate SaaS 感」 |
| Open Design 卡住，生不出你要的 | 降低期待：先 export 現在 80% OK 的版本，Phase 3 開發部門整合時看實際效果再決定要不要回來修 |
| 4 個範例都不對應你的真實情境 | 選範例 ②「給自己」，客戶就是你自己。所有 commission 老闆都是自己的第一個客戶 |
| 50 min 跑不完 | 優先順序：main scene \+ 結尾畫面 \+ landing 必須做完，UI 元素跟 commission 表單可以 Phase 3 用 generic |

**Phase 3 | 開發部門整合 \+ 部署** *35 min* 調度部門：Gemini CLI 程式模式

## 目標

開發部門把研究 \+ 設計部門的產出整合進公司網站，寫好三種遊戲框架，客戶填 brief 能跑出小遊戲，部署 Firebase，拿到 share-able URL。

## 產出

week12-v3.0 branch (在 git repo)

├── /commission ← 客戶填 brief 表單頁

├── /game/\[commission-id\] ← 產出的小遊戲頁

└── /games/ ← 三種遊戲框架

├── boss-fight.js (打怪框架)

├── puzzle.js (解謎框架)

└── collector.js (收集框架)

部署到 Firebase week12-v3.0 channel

Share-able URL: https://\[project\]--week12-v3-0-\[hash\].web.app

## 步驟 3.1 | 在 repo 啟動 Gemini CLI（1 min）

$ cd \~/Documents/我的公司

$ gemini

## 步驟 3.2 | 切換到 week12-v3.0 branch（2 min）

對 Gemini CLI 下指令：

|  |
| :---- |
| 從 week11-v2.0 開 week12-v3.0 branch，切過去。 |

**沿用 W11 branch 策略** main 保留 Week 10 試營運狀態 week11-v2.0 保留 Week 11 v2.0 工具 week12-v3.0 是這一週的新版本（從 v2.0 開） A/B 對照：v2.0 跟 v3.0 同時都可以打開，不會互相覆蓋

## 步驟 3.3 | 貼開發部門 persona prompt \+ 啟動實作（2 min）

複製 deliverable-spec.md Section 5（給開發部門的 persona prompt），貼進 Gemini CLI。再加一句：

請參考 handoff/ 資料夾內的視覺資產 \+ research-brief-sample.md。

開始實作。

請按以下順序進行，每個 step 結束告訴我，我會確認再繼續：

【必做】

Step 1: 寫 /commission 表單頁

Step 2: 寫打怪框架 (boss-fight.js)

Step 3: 寫 /game/\[commission-id\] 頁面邏輯

Step 4: 部署 Firebase

【如果完成還有時間 \- Stretch Goal】

Step 5: 寫解謎框架 (puzzle.js)

Step 6: 寫收集框架 (collector.js)

## 步驟 3.4 | Gemini CLI 跑 Step 1：/commission 表單（4 min）

CLI 開始寫 HTML \+ CSS \+ JS。寫完讓你看。

你可能會說：

| 你可能會說 | 為什麼 |
| :---- | :---- |
| 表單欄位順序：朋友興趣放最前面，容易填的先 | 降低客戶填表單的心理門檻 |
| 用 handoff/commission-form-mockup.png 的視覺 | Phase 2 設計部門已經設計過，不要 default 樣式 |
| 提交按鈕用橘黃色，字寫「開始打造」 | 對應公司調性，CTA 更有 character |
| 表單下方加範例 brief 讓客戶有參考 | 降低「我不知道要填什麼」的卡關 |

*CLI 改完讓你看，滿意就「進 Step 2」。*

## 步驟 3.5 | Gemini CLI 跑 Step 2：打怪框架（必做，12 min）

**為什麼只有打怪框架必做** 35 min 內寫 3 個遊戲框架 \+ 部署，實際上跑不完。 打怪框架是最直觀，最常被選的，也最容易實作。 解謎跟收集框架是 stretch goal：如果有時間再寫，沒寫完不影響交付。 客戶 brief 表單裡的「遊戲類型 3 選 1」，Phase 3 完成時只有「打怪」這個選項可選，其他兩個下週 W13 公司開幕展前再補。

寫 /public/games/boss-fight.js

需求：

\- 玩家角色（從 handoff/player-character.png）在左，怪（handoff/monster.png）在右

\- 點擊或按空白鍵攻擊怪，怪 HP 100，每次扣 10

\- 怪會回擊（隨機間隔 2-4 秒），玩家 HP 100，扣完算輸

\- 約 3 分鐘玩完

\- 贏：顯示結尾畫面 \+ 客戶訊息

\- 場景背景用 handoff/main-scene.png

\- 純前端 JS，不接 LLM

寫完後 cd 進 public 跑 localhost，給我測。

## Stretch Goal（35 min 內有餘力再做）

*打怪框架完成 \+ 部署成功之後，如果還有時間，可以寫解謎或收集框架的其中一個。spec 在 deliverable-spec.md section 5 內，複製貼給 CLI 就好。*

## 步驟 3.6 | Gemini CLI 跑 Step 3：/game/\[commission-id\] 邏輯（6 min）

寫 /game/\[commission-id\] 頁面邏輯：

1\. 從 URL 拿 commission-id

2\. 從 Firestore commissions/\[commission-id\] 拿 brief

3\. 判斷 brief.gameType，載入對應框架（目前只有打怪框架已寫好）

4\. 把 brief 的內容（朋友興趣、怪、訊息、風格）套進框架

5\. 結尾畫面顯示 brief.message

6\. 加「分享給朋友」按鈕，點擊複製 window.location.href

CLI 寫完，跑 localhost 測一遍：填一個示範 brief，看遊戲跑得對不對。

## 步驟 3.7 | Gemini CLI 跑 Step 4：部署 Firebase（4 min）

commit 所有變更，push 到 week12-v3.0 branch，部署 Firebase。

部署完給我 share-able URL。

**部署失敗怎麼辦** 對 CLI 說「deploy 失敗，error 是 \[貼整段 error\]，幫我解」。 CLI 會自己 debug，可能要安裝 missing package，改 firebase.json，或重新 login firebase。 你只負責看 CLI 在做什麼，必要時 confirm。

## 步驟 3.8 | 品質檢查（1 min）

| 角度 | 你問自己 |
| :---- | :---- |
| 技術檢查 | 打怪框架跑得起來嗎？/commission 表單能寫進 Firestore 嗎？/game/\[commission-id\] 從 Firestore 拿資料的邏輯對嗎？ |
| 對客戶 | 你打開 share-able URL，能秒懂這個服務是什麼嗎？填表單卡住的話，有 hint 幫我嗎？ |

## Phase 3 結束，你手上有 share-able URL。進 Phase 4 試吃儀式。

**Phase 3 卡點處理**

| 卡點 | 怎麼辦 |
| :---- | :---- |
| Gemini CLI 寫的 code 跑不起來 | 對 CLI 說「跑不起來，error 是 \[貼 error\]，修」。不要自己改 code，讓 CLI 處理 |
| CLI 寫的程式效果跟 handoff/ 視覺差很多 | 對 CLI 說「視覺跟 handoff/main-scene.png 不一樣，應該是 XXX，請調整 CSS」 |
| Firebase deploy 失敗（permission / quota） | 退回 localhost，Phase 4 試吃在 localhost 跑 \+ 用瀏覽器截圖代替 share URL |
| 三種框架都想寫但時間不夠 | 優先打怪框架（必做），解謎跟收集是 stretch goal，留到下週 W13 再寫 |
| 35 min 跑不完 | 保留至少 5 min 給 Phase 4。Step 6 部署是關鍵，不能省。如果框架沒寫完，就只部署現有的 |

**Phase 4 | 試吃儀式 \+ 交付** *10 min* 調度部門：瀏覽器 \+ 手機

## 目標

扮演客戶，走完整個服務流程一遍，確認真的能 deliver。寫 3 個感受 \+ 對照課堂三句話 \+ FB 課程社團貼文交付。

## 步驟 4.1 | 開無痕視窗，貼 share-able URL（30 秒）

三選一：

| 方式 | 為什麼 |
| :---- | :---- |
| Chrome 無痕視窗 | 沒有 cookies / 登入狀態，最接近真實客戶 |
| 換個瀏覽器（Safari、Firefox） | 不同 rendering engine，有時會抓到 bug |
| 用手機開 | 手機體驗很多時候才是真正 deal-breaker |

*學生互助價的客戶大概率手機開，能優先測手機最好。*

## 步驟 4.2 | 走完客戶流程（5 min）

從 landing 開始，模擬一個真的朋友會怎麼用：

| 步 | 你做什麼 |
| :---- | :---- |
| 1 | 看 landing 5 秒，能秒懂服務是什麼嗎？ |
| 2 | 點 CTA，進 /commission |
| 3 | 填表單：想一個新的朋友當對象（不要用 Phase 2 那個 commission，要測試系統能跑新輸入） |
| 4 | 送出表單 |
| 5 | 拿到 /game/\[commission-id\] URL，玩遊戲 3-5 分鐘 |
| 6 | 看結尾畫面 \+ 訊息 |
| 7 | 按「分享給朋友」，看 URL 有沒有複製到 clipboard |

**在 Phase 4 卡關的判斷標準** 不要試圖在 Phase 4 修 bug。 記錄問題，寫進 3 個感受，回去 Phase 3 是下一週的事。 這 2 小時的目標是「跑完一遍，確認服務能 deliver」，不是「完美交付」。

## 步驟 4.3 | 寫 3 個感受（2 min）

用紙筆，不打字，不過度思考。3 個短句、各 1-2 行。

**你會寫的 3 個感受（範例，每次跑會不一樣）**

1. 結尾畫面的「分享給朋友」按鈕位置在右下角，手機點到滿難的，要往中間移  
2. 表單第 3 欄「想傳達的訊息」沒有字數提示，不知道該寫一句還是一段  
3. main scene 的玩家角色比預期可愛，滿喜歡的，但「怪」太抽象，應該更具體一點

## 步驟 4.4 | 對照課堂三句話（1 min）

翻出課堂結尾在 FB 留言寫的三句話，check：

| 課堂三句話 | 對照 |
| :---- | :---- |
| 我選的客戶族群是 \_\_\_ | 剛剛試吃時，感覺真的是這群人嗎？✓ / ✗ |
| 我的服務形態是 \_\_\_ | 產出的東西真的是這種服務嗎？✓ / ✗ |
| 我會給客戶的交付物形式是 \_\_\_ | 客戶手上拿到的真的是這個嗎？✓ / ✗ |

*如果三個都 ✓：公司方向跟交付物對齊，可以給真實客戶試。如果有 ✗：不是現在改，是記錄下來，思考要修課堂還是修系統。*

## 步驟 4.5 | FB 課程社團 Week 12 貼文交付（1 min）

FB 課程社團 Week 12 貼文留言，按下面格式：

【MiniGame Studio v3.0】← 公司名

服務：\[一句話描述\]

Share-able URL: https://\[your-url\]

這次的 3 個感受：

1\. \[第一個感受\]

2\. \[第二個感受\]

3\. \[第三個感受\]

邀請同學試用，請他們給你反饋。

\[可以 tag 想送禮物的對象，讓他們玩看看\]

**貼文後 24 小時內** 至少 3 個同學會試用，留 comment 反饋。 comment 是下週 W13 公司開幕展的關鍵 input。 貼文後不要急著再動程式碼，讓系統穩定 24 小時，看反饋再決定下一步。

## 最後一句話

*你這次不是做了「一份作業」。你建了一間「可以執行的 Agent 公司」。你有客戶 brief 表單，有三大部門 persona，有遊戲框架，有部署的 URL。客戶可以填，系統可以跑，交付物可以分享。下週 W13 公司開幕展，你要展示的就是這間公司運作的證據。*

## 你產出的東西

| Phase | 產出 |
| :---- | :---- |
| 1 | deliverable-spec.md（公司指揮 spec、三部門 prompt） |
| 2A | research-brief-sample.md（研究部門針對示範 commission 的產出） |
| 2B | handoff/ 視覺資產資料夾 \+ README 風格指引 |
| 3 | week12-v3.0 branch \+ 三種遊戲框架 \+ Firebase 部署 \+ share-able URL |
| 4 | FB 課程社團貼文 \+ 3 個感受 |

## 完成：公司就在這裡。

*明天起，真實客戶可以來。*  
