# 作業ログ｜Gym Tracker 開発

**作業日**: 2026-06-19〜20
**所要時間**: 約1時間

---

## 作業の流れ

### 1. 企画・設計

- アイデア壁打ち（ジム / 編み物 / 読書）
- ジムトラッカーに決定
- ユーザーストーリーマップ作成（バックボーン5〜7ステップ）
- MVP / v1.0 / v2.0 の3層で機能を整理
- Plan Mode で設計 → ユーザー確認 → 実装の流れで進行

### 2. 環境構築

- Next.js 16（App Router）プロジェクト作成
- Tailwind CSS・TypeScript・Supabase SSR・react-calendar インストール

### 3. Supabase 設定

- 既存プロジェクト「応用機能課題」に `workout_logs` テーブルを追加
- RLS（Row Level Security）設定：自分のデータのみ閲覧・作成・削除可能
- TypeScript型定義を手動作成（`src/types/database.ts`）

### 4. 実装

| ファイル                         | 内容                           |
| -------------------------------- | ------------------------------ |
| `src/app/page.tsx`               | ログイン・新規登録画面         |
| `src/app/dashboard/page.tsx`     | カレンダー＋記録一覧＋フォーム |
| `src/components/WorkoutForm.tsx` | 種目・セット・重量入力フォーム |
| `src/components/WorkoutList.tsx` | 記録一覧・削除機能             |
| `src/lib/supabase.ts`            | Supabaseクライアント           |

### 5. デプロイ

- GitHub リポジトリ作成・push
- Vercel に本番デプロイ
- Vercel に環境変数（Supabase URL / ANON KEY）を設定

---

## つまずきポイント

### ① `claude mcp add` コマンドのシェル解釈エラー

- **問題**: `@modelcontextprotocol/server-github` の `@` をzshが解釈してエラー
- **解決**: 環境変数を先に `export` してから実行、パッケージ名を `"` で囲む

### ② GitHub MCPのトークン設定

- **問題**: `.claude.json` に直接書き込む必要があった
- **解決**: ファイルを直接編集してトークンを設定（CLIのコマンドは複雑すぎた）

### ③ 確認メールのリンク先がlocalhostで開けない

- **問題**: 開発サーバーがlocalhost:3001で動いていたが、確認メールはlocalhost:3000に向いていた
- **解決**: Supabaseの「Confirm email」をOFFにして開発中はメール確認をスキップ

### ④ devサーバーのポート競合

- **問題**: 別プロセスがlocalhost:3000を使用中でlocalhost:3001になった
- **解決**: `lsof -ti:3000` でPIDを確認し、正しいポートにアクセス

---

## 使ったClaude Code機能

| 機能                           | 用途                                  |
| ------------------------------ | ------------------------------------- |
| **MCP（Supabase）**            | テーブル作成・RLS設定・型定義生成     |
| **MCP（GitHub）**              | リポジトリ操作                        |
| **MCP（Filesystem）**          | ファイル読み書き                      |
| **Plan Mode**                  | 設計→確認→実装の流れ                  |
| **/vercel:deploy スキル**      | Vercelへの本番デプロイ                |
| **並列ツール実行**             | 複数ファイルの同時作成で時間短縮      |
| **スクリーンショット読み取り** | 画面確認・エラー診断                  |
| **Bash ツール**                | npm / git / gh / vercel CLIの代行実行 |

---

## 成果物

- **公開URL**: https://gym-tracker-alpha.vercel.app
- **GitHub**: https://github.com/ya4o9i152-web/gym-tracker
- **DBテーブル**: Supabase `workout_logs`（応用機能課題プロジェクト）
