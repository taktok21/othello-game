# せどり・物販管理Webアプリケーション 設計書

## 1. プロジェクト概要

### 1.1 目的
Googleスプレッドシート版のせどり・物販コンサル用ツールをWebアプリケーションとして再現し、商品仕入れと販売の効率化を図る。

### 1.2 対象ユーザー
- せどり・物販事業者
- リピート商材を扱う事業者
- 商品の仕入れ・販売タイミングを効率化したいユーザー

## 2. 機能要件

### 2.1 設定機能
- **APIキー管理**
  - キーパーAPIキーの設定・保存
  - 楽天IDの設定・保存
- **自動更新設定**
  - 深夜自動更新の有効/無効切替
  - 更新対象シートの指定機能

### 2.2 商品管理リスト機能
- **商品登録**
  - ASIN入力による商品検索
  - 商品情報の自動取得（画像、商品名、現在価格）
- **価格・利益計算**
  - 売り値の手動設定
  - 仕入れ値の入力（割引計算対応）
  - 手数料・入金額の自動計算
  - 利益額の自動算出
- **売り時通知**
  - カート価格が目標売り値を超えた際の視覚的通知
  - 色付けによる売り時の表示

### 2.3 リピートリスト機能
- **商品管理リストの基本機能**
- **動的価格連動**
  - 売り値が現在価格（カート価格）と自動連動
  - 利益額の日次自動更新
- **仕入れタイミング支援**
  - 利益額に基づく仕入れ判断支援

### 2.4 自動更新機能
- **バッチ処理**
  - 深夜の価格情報自動更新
  - 利益額の自動再計算
  - スケジューラーによる定期実行

## 3. 技術仕様

### 3.1 フロントエンド
- **フレームワーク**: React.js
- **UI ライブラリ**: Material-UI または Ant Design
- **状態管理**: Redux Toolkit または Context API
- **HTTP クライアント**: Axios

### 3.2 バックエンド
- **フレームワーク**: Node.js + Express.js
- **データベース**: PostgreSQL または MongoDB
- **API 設計**: RESTful API
- **認証**: JWT ベース認証

### 3.3 外部API連携
- **キーパーAPI**: 商品情報取得
- **楽天API**: 商品価格・情報取得
- **Amazon API**: 価格情報取得（Amazon PA-API）

### 3.4 インフラ
- **ホスティング**: AWS または Vercel
- **データベース**: AWS RDS または MongoDB Atlas
- **バッチ処理**: AWS Lambda または Cron Jobs

## 4. データベース設計

### 4.1 テーブル構成

#### users テーブル
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  keeper_api_key VARCHAR(255),
  rakuten_id VARCHAR(255),
  auto_update_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### product_management テーブル
```sql
CREATE TABLE product_management (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  asin VARCHAR(20) NOT NULL,
  product_name VARCHAR(500),
  product_image_url VARCHAR(500),
  current_price DECIMAL(10,2),
  target_sell_price DECIMAL(10,2),
  purchase_price DECIMAL(10,2),
  fees DECIMAL(10,2),
  net_income DECIMAL(10,2),
  profit DECIMAL(10,2),
  is_sellable BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### repeat_list テーブル
```sql
CREATE TABLE repeat_list (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  asin VARCHAR(20) NOT NULL,
  product_name VARCHAR(500),
  product_image_url VARCHAR(500),
  current_price DECIMAL(10,2),
  purchase_price DECIMAL(10,2),
  fees DECIMAL(10,2),
  net_income DECIMAL(10,2),
  profit DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### price_history テーブル
```sql
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  asin VARCHAR(20) NOT NULL,
  price DECIMAL(10,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(asin, recorded_at)
);
```

## 5. API設計

### 5.1 認証API
- `POST /api/auth/login` - ログイン
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/logout` - ログアウト

### 5.2 設定API
- `GET /api/settings` - 設定情報取得
- `PUT /api/settings` - 設定情報更新

### 5.3 商品管理API
- `GET /api/products` - 商品一覧取得
- `POST /api/products` - 商品追加
- `PUT /api/products/:id` - 商品更新
- `DELETE /api/products/:id` - 商品削除
- `POST /api/products/fetch-data` - 商品データ取得

### 5.4 リピートリストAPI
- `GET /api/repeat-list` - リピートリスト取得
- `POST /api/repeat-list` - リピート商品追加
- `PUT /api/repeat-list/:id` - リピート商品更新
- `DELETE /api/repeat-list/:id` - リピート商品削除

### 5.5 バッチ処理API
- `POST /api/batch/update-prices` - 価格一括更新

## 6. UI/UX設計

### 6.1 画面構成
1. **ログイン画面**
2. **ダッシュボード**
   - 利益サマリー
   - 売り時商品一覧
3. **設定画面**
   - APIキー設定
   - 自動更新設定
4. **商品管理リスト画面**
   - 商品一覧テーブル
   - 商品追加フォーム
5. **リピートリスト画面**
   - リピート商品一覧
   - 利益順ソート機能

### 6.2 レスポンシブ対応
- デスクトップ、タブレット、スマートフォンに対応
- 商品一覧は横スクロール対応

## 7. セキュリティ要件

### 7.1 認証・認可
- JWT トークンベース認証
- APIキーの暗号化保存
- CORS設定

### 7.2 データ保護
- パスワードのハッシュ化（bcrypt）
- HTTPS通信の強制
- 入力値のサニタイゼーション

## 8. パフォーマンス要件

### 8.1 レスポンス時間
- API レスポンス: 500ms以内
- 画面遷移: 1秒以内
- 商品データ取得: 2秒以内

### 8.2 スケーラビリティ
- 同時ユーザー数: 100人
- 商品データ: ユーザーあたり1000件

## 9. 開発フェーズ

### Phase 1: 基盤構築
- 認証システム
- 基本的なCRUD機能
- 設定機能

### Phase 2: コア機能
- キーパーAPI連携
- 商品管理リスト機能
- 基本的な計算機能

### Phase 3: 高度機能
- リピートリスト機能
- 自動更新機能
- バッチ処理

### Phase 4: 最適化・改善
- パフォーマンス最適化
- UI/UX改善
- 追加機能

## 10. 今後の拡張計画

- グラフ・チャート機能
- 仕入れ予算管理
- 売上レポート機能
- 複数のECサイト対応
- モバイルアプリ化