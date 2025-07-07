# クラウドワークス記事自動生成ツール

SEOに最適化された高品質な記事を自動生成するPythonツールです。

## 🚀 特徴

- **SEO最適化**: キーワードを効果的に配置した記事構成
- **読者に寄り添う**: ターゲット読者に合わせたトーンで執筆
- **構造化された内容**: 導入→問題提起→解決策→まとめの流れ
- **Markdown形式**: 見出し、表、リストを使った視認性の高いフォーマット
- **インタラクティブ**: 対話形式で記事設定を入力可能

## 📦 ファイル構成

```
claude-test/
├── article_generator.py      # 記事生成のメインクラス
├── interactive_generator.py  # 対話形式の記事生成ツール
└── README.md                # このファイル
```

## 🛠️ 使用方法

### 1. 対話形式で記事を生成

```bash
python3 interactive_generator.py
```

### 2. プログラムから直接使用

```python
from article_generator import ArticleGenerator, ArticleConfig

# 記事設定
config = ArticleConfig(
    purpose="初心者に分かりやすく制度のメリットを伝える",
    theme="積立NISAとは？仕組みとメリットをわかりやすく解説", 
    audience="20〜30代の投資初心者、働く主婦",
    keywords=["積立NISA", "節税", "投資初心者", "資産形成"],
    tone="やさしく、親しみやすい。信頼感がありプロフェッショナル"
)

# 記事生成
generator = ArticleGenerator()
article = generator.generate_article(config)
print(article)
```

## 📝 記事構成

生成される記事は以下の構成になります：

1. **導入文** - 読者の共感を引き出す
2. **問題提起** - 読者が抱える悩み・疑問の明確化
3. **解決策** - テーマに沿った具体的な説明
4. **まとめ** - 学びと行動を促すクロージング

## 🎯 SEO最適化要素

- H2・H3見出しの効果的な使用
- キーワードの自然な配置
- 読みやすい文章構造
- 箇条書きと表による視認性向上
- 行動を促すCTA（Call to Action）

## 💡 カスタマイズ

`ArticleGenerator`クラスの各メソッドを編集することで、記事の内容をカスタマイズできます：

- `_generate_introduction()`: 導入文のテンプレート
- `_generate_problem_statement()`: 問題提起の内容
- `_generate_solution()`: 解決策セクションの構成
- `_generate_summary()`: まとめの内容

## 🔧 システム要件

- Python 3.6以上
- 外部ライブラリ不要（標準ライブラリのみ使用）

## 📄 ライセンス

このツールはクラウドワークスでのライティング業務効率化を目的として作成されました。