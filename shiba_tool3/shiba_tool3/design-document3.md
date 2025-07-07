# せどり・物販管理ツール設計書

## 1. プロジェクト概要

### 1.1 目的
Googleスプレッドシートベースのせどり・物販管理ツールをWebアプリケーションとして再現し、商品仕入れから販売までの効率的な管理を実現する。

### 1.2 対象ユーザー
- せどり・物販事業者
- Amazon販売者
- リピート商材を扱う販売者

## 2. 機能要件

### 2.1 初期設定機能
- **API設定管理**
  - Keeper APIキー設定
  - 楽天ID設定
  - 設定情報の暗号化保存
- **自動更新設定**
  - 深夜更新ON/OFF設定
  - 更新対象シート指定
  - 更新スケジュール管理

### 2.2 商品管理リスト機能
- **商品情報取得**
  - ASIN入力による商品データ自動取得
  - 商品画像・名前・現在価格表示
  - Keeper API連携
- **価格・利益計算**
  - 売値設定（手動入力対応）
  - 仕入値計算（割引・クーポン対応）
  - 入金額自動算出
  - 利益額自動計算
- **売り時判定**
  - 現在価格とカート価格の比較
  - 売り時の視覚的表示（色付け）
  - 価格推移追跡

### 2.3 リピートリスト機能
- **動的価格更新**
  - カート価格に連動した売値自動更新
  - 利益額の日次自動更新
- **リピート商材管理**
  - 仕入れ候補商品の一元管理
  - 利益率による優先度表示
  - 仕入れタイミング最適化

### 2.4 価格監視・自動更新機能
- **定期価格更新**
  - 深夜バッチによる自動価格更新
  - Amazon価格情報取得
  - 楽天価格情報取得
- **アラート機能**
  - 売り時通知
  - 価格変動アラート

## 3. 技術要件

### 3.1 フロントエンド
- **フレームワーク**: React
- **状態管理**: Context API / Redux
- **UI コンポーネント**: Material-UI / Chakra UI
- **データテーブル**: React Table

### 3.2 バックエンド
- **フレームワーク**: Node.js + Express / Next.js API Routes
- **データベース**: PostgreSQL / MongoDB
- **認証**: JWT / NextAuth.js
- **API管理**: RESTful API / GraphQL

### 3.3 外部API連携
- **Amazon API**: 商品情報・価格取得
- **Keeper API**: 商品データ取得
- **楽天API**: 価格・在庫情報取得

### 3.4 インフラ
- **デプロイ**: Vercel / AWS
- **データベース**: Supabase / PlanetScale
- **スケジュール処理**: Vercel Cron / AWS Lambda

## 4. データ設計

### 4.1 商品管理テーブル
```sql
products (
  id: UUID,
  asin: VARCHAR(10),
  name: TEXT,
  image_url: TEXT,
  current_price: DECIMAL,
  target_price: DECIMAL,
  purchase_price: DECIMAL,
  profit: DECIMAL,
  status: ENUM('active', 'sold', 'discontinued'),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### 4.2 リピート商品テーブル
```sql
repeat_products (
  id: UUID,
  asin: VARCHAR(10),
  name: TEXT,
  purchase_price: DECIMAL,
  current_profit: DECIMAL,
  auto_update: BOOLEAN,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### 4.3 設定テーブル
```sql
user_settings (
  id: UUID,
  user_id: UUID,
  keeper_api_key: TEXT,
  rakuten_id: TEXT,
  auto_update_enabled: BOOLEAN,
  update_schedule: TEXT,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

## 5. システム設計

### 5.1 アーキテクチャ
```
Frontend (React) ←→ API Layer ←→ Business Logic ←→ Database
                                     ↓
                              External APIs
                         (Amazon, Keeper, Rakuten)
```

### 5.2 主要コンポーネント
- **商品管理画面**: 商品一覧・詳細・編集
- **リピートリスト画面**: リピート商品管理
- **設定画面**: API設定・自動更新設定
- **ダッシュボード**: サマリー・売り時商品表示

### 5.3 バッチ処理
- **価格更新バッチ**: 深夜実行、全商品価格更新
- **利益計算バッチ**: 入金額・利益額再計算
- **アラート送信**: 売り時通知・価格変動通知

## 6. セキュリティ要件

### 6.1 認証・認可
- JWT による認証
- ユーザー毎のデータ分離
- API キーの暗号化保存

### 6.2 データ保護
- HTTPS 通信の強制
- 機密情報のマスキング
- ログの適切な管理

## 7. 運用要件

### 7.1 監視
- API レスポンス時間監視
- エラー率監視
- 外部API制限監視

### 7.2 バックアップ
- データベースの定期バックアップ
- 設定情報の冗長化

## 8. 開発フェーズ

### Phase 1: 基本機能
- ユーザー認証
- 商品管理リスト基本機能
- 手動価格更新

### Phase 2: 自動化機能
- 自動価格更新
- リピートリスト機能
- 売り時判定

### Phase 3: 高度な機能
- アラート機能
- 分析・レポート機能
- モバイル対応

## 9. 非機能要件

### 9.1 パフォーマンス
- ページロード時間: 3秒以内
- API レスポンス時間: 1秒以内
- 同時接続ユーザー: 100人

### 9.2 可用性
- アップタイム: 99.9%
- 障害復旧時間: 30分以内

### 9.3 拡張性
- ユーザー数の増加に対応
- 新しいECプラットフォーム対応
- 機能追加の容易性