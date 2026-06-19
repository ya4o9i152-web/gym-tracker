# 🏋️ Gym Tracker

ジムのトレーニングメニューを記録し、カレンダーで振り返れるWebアプリです。

**公開URL**: https://gym-tracker-alpha.vercel.app

---

## スクリーンショット

### ログイン画面

![ログイン画面](docs/screenshot-login.png)

### ダッシュボード（カレンダー＋記録）

![ダッシュボード](docs/screenshot-dashboard.png)

---

## 機能（MVP）

- **メール認証** — サインアップ・ログイン・ログアウト
- **トレーニング記録** — 種目・セット数・重量を記録
- **カレンダー表示** — ジムに行った日をカレンダーで可視化
- **記録削除** — 不要な記録を削除
- **データ保護** — RLS（Row Level Security）で自分のデータのみアクセス可能

---

## 技術スタック

| カテゴリ        | 技術                    |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript              |
| Styling         | Tailwind CSS            |
| Backend / DB    | Supabase (PostgreSQL)   |
| 認証            | Supabase Auth           |
| Deploy          | Vercel                  |
| Version Control | GitHub                  |

---

## 使い方

1. [公開URL](https://gym-tracker-alpha.vercel.app) にアクセス
2. 「新規登録」からアカウント作成
3. カレンダーで日付を選択
4. 「メニューを追加」から種目・セット数・重量を入力
5. 記録した日がカレンダーに青くハイライトされる

---

## ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/ya4o9i152-web/gym-tracker.git
cd gym-tracker

# 依存関係インストール
npm install

# 環境変数を設定（.env.local を作成）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 開発サーバー起動
npm run dev
```

---

## 作成者

**Claude Code** を使って約1時間で開発しました。

- GitHub: https://github.com/ya4o9i152-web/gym-tracker
- 公開URL: https://gym-tracker-alpha.vercel.app
