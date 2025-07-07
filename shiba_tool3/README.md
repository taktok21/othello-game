# せどり・物販管理ツール (Shiba Tool 3)

Googleスプレッドシートベースのせどり・物販管理ツールをWebアプリケーションとして再現したツールです。商品仕入れから販売までの効率的な管理を実現します。

## 主な機能

### 1. 商品管理リスト
- ASIN入力による商品情報の自動取得
- 商品画像・名前・価格の表示
- 仕入価格と利益の自動計算
- 売り時の視覚的表示

### 2. リピートリスト
- リピート販売商品の管理
- 価格と利益の自動更新
- 利益率による優先度表示

### 3. 設定管理
- API設定（Keeper API、楽天API）
- 自動更新スケジュール設定
- API接続テスト機能

### 4. 自動価格更新
- 深夜の自動価格更新
- バッチ処理による効率的な更新
- スケジュール管理

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, Chakra UI
- **状態管理**: React Query (TanStack Query)
- **API**: REST API (Next.js API Routes)
- **スケジューラー**: Vercel Cron
- **スタイリング**: Chakra UI, Emotion

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.local` ファイルを作成し、以下の環境変数を設定:

```env
# Cron job secret (本番環境のみ)
CRON_SECRET=your-cron-secret-here

# API Keys (本番環境では暗号化して保存)
KEEPER_API_KEY=your-keeper-api-key
RAKUTEN_API_KEY=your-rakuten-api-key

# Database URL (本番環境)
DATABASE_URL=your-database-url
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で利用できます。

### 4. 本番環境へのデプロイ
```bash
npm run build
npm start
```

## 使用方法

### 初期設定
1. 設定ページでKeeper APIキーと楽天IDを入力
2. 自動更新を有効にする場合は、深夜更新をONに設定
3. 設定を保存

### 商品管理
1. 商品管理リストページでASINを入力
2. 「商品データ取得」をクリックして商品情報を取得
3. 仕入価格を入力して利益を確認
4. 売り時になると色付きで表示

### リピート管理
1. リピートリストページでASINと仕入価格を入力
2. 「リピート商品追加」をクリック
3. 価格と利益が自動で更新される
4. 利益がプラスの商品から仕入れを検討

## API エンドポイント

### 商品管理
- `GET /api/products` - 商品一覧取得
- `POST /api/products` - 商品追加
- `POST /api/products/fetch-data` - ASIN から商品データ取得
- `PUT /api/products/[id]` - 商品更新
- `DELETE /api/products/[id]` - 商品削除

### リピート商品
- `GET /api/repeat-products` - リピート商品一覧取得
- `POST /api/repeat-products` - リピート商品追加
- `POST /api/repeat-products/update-prices` - 全商品価格更新
- `PUT /api/repeat-products/[id]` - リピート商品更新
- `DELETE /api/repeat-products/[id]` - リピート商品削除

### 設定
- `GET /api/settings` - 設定取得
- `PUT /api/settings` - 設定更新
- `POST /api/settings/test-api` - API接続テスト

### 自動更新
- `POST /api/cron/update-prices` - 価格更新cron (内部使用)

## 開発について

### ディレクトリ構造
```
shiba_tool3/
├── components/          # React コンポーネント
├── lib/                # ライブラリとユーティリティ
├── pages/              # Next.js ページ
│   ├── api/           # API エンドポイント
│   ├── products/      # 商品管理ページ
│   ├── repeat/        # リピートリストページ
│   └── settings/      # 設定ページ
├── types/              # 型定義
├── utils/              # ユーティリティ関数
└── vercel.json         # Vercel 設定
```

### 主要ファイル
- `components/Layout.js` - 共通レイアウト
- `lib/api.js` - API クライアント
- `lib/scheduler.js` - スケジューラー関連
- `utils/calculations.js` - 価格・利益計算
- `vercel.json` - Cron job 設定

## 注意事項

1. **API キー管理**: API キーは適切に管理し、本番環境では暗号化して保存してください
2. **自動更新**: 自動更新機能は外部 API を呼び出すため、API 制限に注意してください
3. **データ永続化**: 現在はメモリ内でデータを管理していますが、本番環境では適切なデータベースを使用してください

## ライセンス

MIT License

## サポート

問題や質問がある場合は、Issues で報告してください。